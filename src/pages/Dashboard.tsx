import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Brain,
  ShieldCheck,
  Activity,
  DollarSign,
  BarChart3,
} from 'lucide-react'
import { AllocationChart } from '../components/charts/AllocationChart'
import { PerformanceChart } from '../components/charts/PerformanceChart'
import { portfolioAssets, performanceData, agents, transactions } from '../lib/data'

const stats = [
  { label: 'Portfolio Value', value: '$200,000', change: '+2.4%', up: true, icon: DollarSign },
  { label: "Today's P&L", value: '+$4,800', change: '+2.4%', up: true, icon: TrendingUp },
  { label: 'Risk Score', value: '6.2/10', change: '-0.3', up: true, icon: Activity },
  { label: 'Active Agents', value: '4', change: '+1', up: true, icon: Brain },
  { label: 'Validator Confidence', value: '94.2%', change: '+1.8%', up: true, icon: ShieldCheck },
  { label: '30D Performance', value: '+8.3%', change: '+2.1%', up: true, icon: BarChart3 },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  const allocationData = portfolioAssets.map((a) => ({
    name: a.symbol,
    value: a.allocation,
  }))

  const recentTxs = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-50">Portfolio Dashboard</h1>
        <p className="mt-1 text-sm text-surface-400">Track your portfolio, agents, and validator consensus</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            {...fadeUp}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-surface-800 bg-surface-900/60 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-4 w-4 text-surface-500" />
              <span
                className={`text-xs font-medium ${stat.up ? 'text-accent-400' : 'text-error-500'}`}
              >
                {stat.change}
              </span>
            </div>
            <p className="mt-2 text-xl font-semibold text-surface-50">{stat.value}</p>
            <p className="text-xs text-surface-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-surface-200">30-Day Performance</h2>
            <div className="flex items-center gap-4 text-xs text-surface-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary-500" /> Portfolio
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-surface-500" /> Benchmark
              </span>
            </div>
          </div>
          <PerformanceChart data={performanceData} />
        </motion.div>

        {/* Allocation */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-medium text-surface-200">Asset Allocation</h2>
          <AllocationChart data={allocationData} />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {portfolioAssets.map((a) => (
              <div key={a.symbol} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#6366f1'][portfolioAssets.indexOf(a) % 6] }}
                />
                <span className="text-surface-300">{a.symbol}</span>
                <span className="ml-auto text-surface-500">{a.allocation}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Agents */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-medium text-surface-200">Active Agents</h2>
          <div className="space-y-3">
            {agents
              .filter((a) => a.status === 'active')
              .map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded-lg bg-surface-800/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                        agent.type === 'momentum'
                          ? 'bg-primary-600/20 text-primary-400'
                          : agent.type === 'yield'
                          ? 'bg-accent-600/20 text-accent-400'
                          : agent.type === 'treasury'
                          ? 'bg-warning-500/20 text-warning-500'
                          : agent.type === 'arbitrage'
                          ? 'bg-error-500/20 text-error-500'
                          : 'bg-surface-600/20 text-surface-400'
                      }`}
                    >
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-200">{agent.name}</p>
                      <p className="text-xs text-surface-500">
                        ${agent.capital_allocated.toLocaleString()} allocated
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${agent.pnl >= 0 ? 'text-accent-400' : 'text-error-500'}`}
                    >
                      {agent.pnl >= 0 ? '+' : ''}${agent.pnl.toLocaleString()}
                    </p>
                    <p className="text-xs text-surface-500">{agent.success_rate}% success</p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.35 }}
          className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-medium text-surface-200">Recent Transactions</h2>
          <div className="space-y-3">
            {recentTxs.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg bg-surface-800/50 p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                      tx.type === 'buy' || tx.type === 'reward'
                        ? 'bg-accent-600/20 text-accent-400'
                        : tx.type === 'sell'
                        ? 'bg-error-500/20 text-error-500'
                        : 'bg-primary-600/20 text-primary-400'
                    }`}
                  >
                    {tx.type === 'buy' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : tx.type === 'sell' ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <Activity className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.asset}
                    </p>
                    <p className="text-xs text-surface-500">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-surface-200">
                    ${tx.value.toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      tx.status === 'confirmed'
                        ? 'bg-accent-600/20 text-accent-400'
                        : tx.status === 'validating'
                        ? 'bg-warning-500/20 text-warning-500'
                        : tx.status === 'rejected'
                        ? 'bg-error-500/20 text-error-500'
                        : 'bg-surface-600/20 text-surface-400'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Validator Activity */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-medium text-surface-200">Validator Activity</h2>
          <div className="space-y-3">
            {transactions
              .filter((t) => t.validator_votes)
              .slice(0, 4)
              .map((tx) => (
                <div key={tx.id} className="rounded-lg bg-surface-800/50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-surface-200">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.asset}
                    </p>
                    <span
                      className={`text-xs font-medium ${
                        tx.status === 'confirmed' ? 'text-accent-400' : 'text-warning-500'
                      }`}
                    >
                      {tx.validator_votes!.approve}/{tx.validator_votes!.total} Approved
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-700">
                    <div
                      className="h-full rounded-full bg-accent-500 transition-all"
                      style={{
                        width: `${(tx.validator_votes!.approve / tx.validator_votes!.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
