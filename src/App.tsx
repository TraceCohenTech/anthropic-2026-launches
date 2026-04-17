import { useEffect, useMemo, useState } from 'react'
import { LAUNCHES, type Category, type Launch } from './data/launches'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Rocket,
  Calendar,
  Mail,
  Twitter,
  Search,
  Moon,
  Sun,
  Brain,
  Package,
  Code2,
  Building2,
  Plug,
  FlaskConical,
  Shield,
  Cog,
  Target,
  Users,
  TrendingUp,
  DollarSign,
  Globe,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react'

type YearFilter = 'All' | '2025' | '2026'

const CATEGORY_ORDER: Category[] = [
  'Model',
  'Product',
  'Developer',
  'Enterprise',
  'Integration',
  'Research',
  'Safety',
]

const CATEGORY_COLOR: Record<Category, string> = {
  Model: '#D56C4E',
  Product: '#2563EB',
  Developer: '#0D9488',
  Enterprise: '#B45309',
  Integration: '#0369A1',
  Research: '#475569',
  Safety: '#059669',
}

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  Model: Brain,
  Product: Package,
  Developer: Code2,
  Enterprise: Building2,
  Integration: Plug,
  Research: FlaskConical,
  Safety: Shield,
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
function yearOf(iso: string) {
  return iso.split('-')[0]
}
function monthIndex(iso: string) {
  return Number(iso.split('-')[1]) - 1
}

function useCountUp(target: number, duration = 900) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return v
}

export default function App() {
  const [activeCat, setActiveCat] = useState<Category | 'All'>('All')
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(false)
  const [sortDesc, setSortDesc] = useState(true)
  const [year, setYear] = useState<YearFilter>('All')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const inYear = (iso: string) => year === 'All' || yearOf(iso) === year

  const sorted = useMemo(
    () =>
      [...LAUNCHES].sort((a, b) =>
        sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
      ),
    [sortDesc],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter((l) => {
      if (!inYear(l.date)) return false
      if (activeCat !== 'All' && l.category !== activeCat) return false
      if (!q) return true
      return (
        l.name.toLowerCase().includes(q) ||
        l.summary.toLowerCase().includes(q) ||
        (l.howItWorks ?? '').toLowerCase().includes(q) ||
        (l.details ?? '').toLowerCase().includes(q) ||
        (l.competitors ?? []).join(' ').toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        (l.tag ?? '').toLowerCase().includes(q)
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted, activeCat, query, year])

  const scope = useMemo(
    () => LAUNCHES.filter((l) => inYear(l.date)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [year],
  )

  const cadenceData = useMemo(() => {
    if (year === 'All') {
      // bucket by YYYY-MM across both years
      const buckets: Record<string, number> = {}
      for (const l of scope) {
        const [y, m] = l.date.split('-')
        const key = `${MONTHS[Number(m) - 1]} '${y.slice(2)}`
        buckets[key] = (buckets[key] ?? 0) + 1
      }
      // order: 2025 Jan..Dec then 2026 Jan..Dec, drop empty
      const order: string[] = []
      for (const y of ['2025', '2026']) {
        for (const m of MONTHS) order.push(`${m} '${y.slice(2)}`)
      }
      return order.filter((k) => buckets[k]).map((k) => ({ month: k, count: buckets[k] }))
    }
    const counts: Record<string, number> = {}
    for (const m of MONTHS) counts[m] = 0
    for (const l of scope) counts[MONTHS[monthIndex(l.date)]]++
    // only show months up through latest shipped month in year
    const last = scope.reduce((mx, l) => Math.max(mx, monthIndex(l.date)), 0)
    return MONTHS.slice(0, last + 1).map((m) => ({ month: m, count: counts[m] }))
  }, [scope, year])

  const byCategory = useMemo(() => {
    const counts: Record<Category, number> = {
      Model: 0, Product: 0, Developer: 0, Enterprise: 0,
      Integration: 0, Research: 0, Safety: 0,
    }
    for (const l of scope) counts[l.category]++
    return CATEGORY_ORDER.filter((c) => counts[c] > 0).map((c) => ({
      category: c,
      count: counts[c],
      color: CATEGORY_COLOR[c],
    }))
  }, [scope])

  const stats = {
    total: scope.length,
    models: scope.filter((l) => l.category === 'Model').length,
    months: new Set(scope.map((l) => `${yearOf(l.date)}-${monthIndex(l.date)}`)).size,
    latest: [...scope].sort((a, b) => b.date.localeCompare(a.date))[0],
  }

  const totalCount = useCountUp(stats.total)
  const modelsCount = useCountUp(stats.models)

  // group filtered by year+month
  const grouped = useMemo(() => {
    const g: Record<string, Launch[]> = {}
    for (const l of filtered) {
      const key = `${yearOf(l.date)}-${MONTHS[monthIndex(l.date)]}`
      if (!g[key]) g[key] = []
      g[key].push(l)
    }
    const keys = Object.keys(g).sort((a, b) =>
      sortDesc ? b.localeCompare(a) : a.localeCompare(b),
    )
    return keys.map((k) => {
      const [yr, mo] = k.split('-')
      return { key: k, label: `${mo} ${yr}`, items: g[k] }
    })
  }, [filtered, sortDesc])

  const year2025Count = LAUNCHES.filter((l) => yearOf(l.date) === '2025').length
  const year2026Count = LAUNCHES.filter((l) => yearOf(l.date) === '2026').length

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-[#0a0a0b] text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Sticky nav */}
      <nav
        className={`sticky top-0 z-30 border-b transition-all ${
          scrolled
            ? 'bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-xl border-neutral-200 dark:border-neutral-800'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#D56C4E] to-[#B85A3F] flex items-center justify-center">
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight text-sm">Anthropic Launches</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1 hidden sm:inline">
              · {LAUNCHES.length} total
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((d) => !d)}
              className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero-bg dark:hero-bg-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-[12px] font-medium text-neutral-700 dark:text-neutral-300 mb-7 backdrop-blur"
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-[#D56C4E] opacity-60" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#D56C4E]" />
            </span>
            Live · Updated April 17, 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-tight leading-[1.02]"
          >
            Every Claude launch.
            <br />
            <span className="bg-gradient-to-r from-neutral-500 to-neutral-400 dark:from-neutral-400 dark:to-neutral-600 bg-clip-text text-transparent">
              2025 → 2026.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            Every product, model, feature, and integration Anthropic has shipped — from Claude 3.7 Sonnet to Mars.
            Tap any card to see how it works, who it competes with, and why it matters.
          </motion.p>

          {/* Year toggle */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 inline-flex items-center p-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
          >
            <YearPill active={year === 'All'} onClick={() => setYear('All')} label="All" count={LAUNCHES.length} />
            <YearPill active={year === '2025'} onClick={() => setYear('2025')} label="2025" count={year2025Count} />
            <YearPill active={year === '2026'} onClick={() => setYear('2026')} label="2026" count={year2026Count} />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <StatCard icon={<Rocket size={14} />} label={year === 'All' ? 'Total launches' : `${year} launches`} value={totalCount.toString()} />
            <StatCard icon={<Layers size={14} />} label="Claude models" value={modelsCount.toString()} />
            <StatCard icon={<Calendar size={14} />} label="Months shipped" value={stats.months.toString()} />
            <StatCard icon={<Sparkles size={14} />} label="Latest drop" value={stats.latest?.name ?? '—'} small />
          </motion.div>
        </div>
      </header>

      {/* Charts */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-5">
        <ChartCard title="Launch cadence" subtitle={year === 'All' ? 'Across 2025 and 2026' : `By month, ${year}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cadenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={dark ? '#1f1f22' : '#f0f0ef'} vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: dark ? '#a1a1aa' : '#525252' }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis tick={{ fontSize: 12, fill: dark ? '#a1a1aa' : '#525252' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip cursor={{ fill: 'rgba(213,108,78,0.08)' }} contentStyle={tooltipStyle(dark)} />
              <Bar dataKey="count" fill="#D56C4E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Where we shipped" subtitle="By category">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={byCategory}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke={dark ? '#1f1f22' : '#f0f0ef'} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: dark ? '#a1a1aa' : '#525252' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 12, fill: dark ? '#a1a1aa' : '#525252' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip cursor={{ fill: 'rgba(37,99,235,0.06)' }} contentStyle={tooltipStyle(dark)} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {byCategory.map((d) => (
                  <Cell key={d.category} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Controls */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search launches, competitors, categories…"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#D56C4E]/30 focus:border-[#D56C4E]/60 placeholder:text-neutral-400 transition"
              />
            </div>
            <button
              onClick={() => setSortDesc((s) => !s)}
              className="px-4 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition whitespace-nowrap"
            >
              {sortDesc ? 'Newest first' : 'Oldest first'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={activeCat === 'All'}
              onClick={() => setActiveCat('All')}
              label="All"
              count={scope.length}
            />
            {CATEGORY_ORDER.filter((c) => scope.some((l) => l.category === c)).map((c) => {
              const Icon = CATEGORY_ICON[c]
              return (
                <FilterChip
                  key={c}
                  active={activeCat === c}
                  onClick={() => setActiveCat(c)}
                  label={c}
                  color={CATEGORY_COLOR[c]}
                  count={scope.filter((l) => l.category === c).length}
                  icon={<Icon size={13} />}
                />
              )
            })}
          </div>

          {filtered.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[13px]">
              <button
                onClick={() => setExpanded(new Set(filtered.map((l) => l.id)))}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
              >
                Expand all
              </button>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <button
                onClick={() => setExpanded(new Set())}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
              >
                Collapse all
              </button>
              <span className="text-neutral-400 dark:text-neutral-500 ml-auto">
                {filtered.length} {filtered.length === 1 ? 'launch' : 'launches'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="popLayout">
          {grouped.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center"
            >
              <p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">No matches</p>
              <p className="mt-1 text-sm text-neutral-500">Try a different filter, year, or search term.</p>
            </motion.div>
          ) : (
            grouped.map(({ key, label, items }) => (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-12"
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <h2 className="text-2xl font-semibold tracking-tight">{label}</h2>
                  <span className="text-sm text-neutral-500 dark:text-neutral-500">
                    {items.length} {items.length === 1 ? 'launch' : 'launches'}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {items.map((l, i) => (
                    <LaunchCard
                      key={l.id}
                      launch={l}
                      index={i}
                      isOpen={expanded.has(l.id)}
                      onToggle={() => toggleExpand(l.id)}
                      dark={dark}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0b]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Built by Trace Cohen · Data compiled from Anthropic announcements
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/Trace_Cohen"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Twitter size={14} /> @Trace_Cohen
            </a>
            <a
              href="mailto:t@nyvp.com"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Mail size={14} /> t@nyvp.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LaunchCard({
  launch,
  index,
  isOpen,
  onToggle,
  dark,
}: {
  launch: Launch
  index: number
  isOpen: boolean
  onToggle: () => void
  dark: boolean
}) {
  const Icon = CATEGORY_ICON[launch.category]
  const color = CATEGORY_COLOR[launch.category]
  const hasMore =
    !!launch.howItWorks ||
    !!launch.details ||
    (launch.useCases?.length ?? 0) > 0 ||
    (launch.competitors?.length ?? 0) > 0 ||
    !!launch.impact ||
    !!launch.pricing ||
    !!launch.availability

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.2) }}
      className="card-hover rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 overflow-hidden backdrop-blur"
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium"
            style={{
              backgroundColor: color + (dark ? '22' : '14'),
              color,
            }}
          >
            <Icon size={11} />
            {launch.category}
          </div>
          <time className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">
            {formatDate(launch.date)}, {yearOf(launch.date)}
          </time>
        </div>
        <h3 className="text-[17px] font-semibold tracking-tight flex items-start gap-2">
          <span>{launch.name}</span>
          {launch.tag && (
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded whitespace-nowrap">
              {launch.tag}
            </span>
          )}
        </h3>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {launch.summary}
        </p>
        {launch.competitors && launch.competitors.length > 0 && !isOpen && (
          <div className="mt-3 flex flex-wrap gap-1">
            {launch.competitors.slice(0, 3).map((c) => (
              <span
                key={c}
                className="text-[10.5px] font-medium px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                vs {c}
              </span>
            ))}
            {launch.competitors.length > 3 && (
              <span className="text-[10.5px] font-medium px-1.5 py-0.5 text-neutral-500 dark:text-neutral-500">
                +{launch.competitors.length - 3} more
              </span>
            )}
          </div>
        )}
        {hasMore && (
          <div
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium transition"
            style={{ color: isOpen ? color : undefined }}
          >
            <span className={isOpen ? '' : 'text-neutral-500 dark:text-neutral-500'}>
              {isOpen ? 'Hide details' : 'Show details'}
            </span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              <ChevronDown size={13} />
            </motion.span>
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && hasMore && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
              {launch.details && (
                <p className="mt-4 text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {launch.details}
                </p>
              )}

              {launch.howItWorks && (
                <Section icon={<Cog size={12} />} label="How it works" color={color}>
                  <p className="text-[13.5px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {launch.howItWorks}
                  </p>
                </Section>
              )}

              {launch.useCases && launch.useCases.length > 0 && (
                <Section icon={<Target size={12} />} label="Use cases" color={color}>
                  <ul className="space-y-1.5">
                    {launch.useCases.map((u) => (
                      <li
                        key={u}
                        className="flex items-start gap-2 text-[13.5px] text-neutral-700 dark:text-neutral-300 leading-relaxed"
                      >
                        <span
                          className="mt-1.5 inline-block w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {launch.competitors && launch.competitors.length > 0 && (
                <Section icon={<Users size={12} />} label="Competes with" color={color}>
                  <div className="flex flex-wrap gap-1.5">
                    {launch.competitors.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-full text-[12px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {launch.impact && (
                <Section icon={<TrendingUp size={12} />} label="Impact" color={color}>
                  <p className="text-[13.5px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {launch.impact}
                  </p>
                </Section>
              )}

              {(launch.pricing || launch.availability) && (
                <div className="mt-4 grid grid-cols-1 gap-1.5">
                  {launch.pricing && (
                    <div className="flex items-start gap-2 text-[12.5px] text-neutral-600 dark:text-neutral-400">
                      <DollarSign size={12} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span>{launch.pricing}</span>
                    </div>
                  )}
                  {launch.availability && (
                    <div className="flex items-start gap-2 text-[12.5px] text-neutral-600 dark:text-neutral-400">
                      <Globe size={12} className="mt-0.5 flex-shrink-0" style={{ color }} />
                      <span>{launch.availability}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Section({
  icon,
  label,
  color,
  children,
}: {
  icon: React.ReactNode
  label: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-4">
      <div
        className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider mb-1.5"
        style={{ color }}
      >
        {icon}
        {label}
      </div>
      {children}
    </div>
  )
}

function YearPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
        active
          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
      }`}
    >
      {label}
      <span className={`ml-1.5 text-[11px] font-semibold tabular-nums ${active ? 'opacity-70' : 'opacity-60'}`}>
        {count}
      </span>
    </button>
  )
}

function StatCard({
  icon,
  label,
  value,
  small,
}: {
  icon: React.ReactNode
  label: string
  value: string
  small?: boolean
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 p-4 backdrop-blur">
      <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-[12px] font-medium">
        {icon}
        {label}
      </div>
      <div
        className={`mt-1 font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 ${
          small ? 'text-base leading-tight' : 'text-3xl'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-xs text-neutral-500 dark:text-neutral-500">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  label,
  color,
  count,
  icon,
}: {
  active: boolean
  onClick: () => void
  label: string
  color?: string
  count?: number
  icon?: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
        active
          ? 'text-white border-transparent shadow-sm'
          : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
      }`}
      style={active ? { backgroundColor: color ?? '#0a0a0b' } : undefined}
    >
      {icon}
      {label}
      {count !== undefined && (
        <span
          className={`text-[11px] font-semibold tabular-nums ${
            active ? 'text-white/80' : 'text-neutral-400 dark:text-neutral-500'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  )
}

const tooltipStyle = (dark: boolean): React.CSSProperties => ({
  background: dark ? '#0a0a0b' : 'white',
  border: `1px solid ${dark ? '#262628' : '#e5e5e5'}`,
  borderRadius: 10,
  fontSize: 12,
  color: dark ? '#e5e5e5' : '#0a0a0b',
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
})
