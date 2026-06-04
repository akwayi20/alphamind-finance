import { motion } from 'framer-motion'
import { Star, Users, Zap, Target, Shield, Brain, AlertTriangle, ShoppingCart } from 'lucide-react'
import { agents, marketplaceAgents } from '../lib/data'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const typeIcons = {
  momentum: Zap,
  yield: Target,
  treasury: Shield,
  arbitrage: Brain,
  risk: AlertTriangle,
}

const typeColors = {
  momentum: 'bg-primary-600/20 text-primary-400',
  yield: 'bg-accent-600/20 text-accent-400',
  treasury: 'bg-warning-500/20 text-warning-500',
  arbitrage: 'bg-error-500/20 text-error-500',
  risk: 'bg-surface-600/20 text-surface-400',
}

export default function Marketplace() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-50">Agent Marketplace</h1>
        <p className="mt-1 text-sm text-surface-400">
          Discover and deploy specialized AI trading agents
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Momentum', 'Yield', 'Treasury', 'Arbitrage', 'Risk'].map((cat) => (
          <button
            key={cat}
            className={`shrink-0 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
              cat === 'All'
                ? 'bg-primary-600 text-white'
                : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-surface-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* My Agents */}
      <motion.div {...fadeUp}>
        <h2 className="mb-4 text-sm font-medium text-surface-200">My Agents</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => {
            const Icon = typeIcons[agent.type]
            return (
              <div
                key={agent.id}
                className="group rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm transition-all hover:border-surface-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${typeColors[agent.type]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-200">{agent.name}</p>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          agent.status === 'active'
                            ? 'bg-accent-600/20 text-accent-400'
                            : agent.status === 'paused'
                            ? 'bg-warning-500/20 text-warning-500'
                            : 'bg-surface-600/20 text-surface-400'
                        }`}
                      >
                        {agent.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-warning-500">
                    <Star className="h-3 w-3 fill-current" />
                    {agent.rating}
                  </div>
                </div>

                <p className="mt-3 text-xs text-surface-500 line-clamp-2">{agent.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-surface-800/50 p-2 text-center">
                    <p className="text-xs text-surface-500">APY</p>
                    <p className="text-sm font-semibold text-accent-400">{agent.apy}%</p>
                  </div>
                  <div className="rounded-lg bg-surface-800/50 p-2 text-center">
                    <p className="text-xs text-surface-500">Trades</p>
                    <p className="text-sm font-semibold text-surface-200">{agent.trades_count}</p>
                  </div>
                  <div className="rounded-lg bg-surface-800/50 p-2 text-center">
                    <p className="text-xs text-surface-500">Success</p>
                    <p className="text-sm font-semibold text-surface-200">{agent.success_rate}%</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Marketplace */}
      <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
        <h2 className="mb-4 text-sm font-medium text-surface-200">Available Agents</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {marketplaceAgents.map((agent) => {
            const Icon = typeIcons[agent.type]
            return (
              <div
                key={agent.id}
                className="group rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm transition-all hover:border-primary-600/50"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${typeColors[agent.type]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-warning-500">
                    <Star className="h-3 w-3 fill-current" />
                    {agent.rating}
                  </div>
                </div>

                <p className="mt-3 text-sm font-medium text-surface-200">{agent.name}</p>
                <p className="mt-1 text-xs text-surface-500 line-clamp-2">{agent.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-surface-500">APY</p>
                    <p className="text-sm font-semibold text-accent-400">{agent.apy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Subscribers</p>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-surface-500" />
                      <span className="text-sm text-surface-200">{agent.subscribers}</span>
                    </div>
                  </div>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-700">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Deploy — {agent.price} ALPHA
                </button>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
