import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Play,
  Pause,
  Plus,
  X,
  AlertTriangle,
  Target,
  Shield,
  Zap,
} from 'lucide-react'
import { agents, defaultMandate } from '../lib/data'
import type { MandateClause } from '../lib/types'

const agentTypes = [
  {
    type: 'momentum' as const,
    name: 'Momentum Trader',
    icon: Zap,
    color: 'bg-primary-600/20 text-primary-400',
    desc: 'Trend-following strategy optimized for growth',
  },
  {
    type: 'yield' as const,
    name: 'Yield Hunter',
    icon: Target,
    color: 'bg-accent-600/20 text-accent-400',
    desc: 'Maximizes staking and yield opportunities',
  },
  {
    type: 'treasury' as const,
    name: 'Treasury Manager',
    icon: Shield,
    color: 'bg-warning-500/20 text-warning-500',
    desc: 'Designed for DAOs and institutional treasuries',
  },
  {
    type: 'arbitrage' as const,
    name: 'Arbitrage Hunter',
    icon: Brain,
    color: 'bg-error-500/20 text-error-500',
    desc: 'Captures cross-market inefficiencies',
  },
  {
    type: 'risk' as const,
    name: 'Risk Guardian',
    icon: AlertTriangle,
    color: 'bg-surface-600/20 text-surface-400',
    desc: 'Protects from excessive downside risk',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function TradingStudio() {
  const [mandate, setMandate] = useState<MandateClause[]>(defaultMandate)
  const [newClause, setNewClause] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [capital, setCapital] = useState('50000')
  const [riskTolerance, setRiskTolerance] = useState('medium')

  const addClause = () => {
    if (!newClause.trim()) return
    setMandate([
      ...mandate,
      {
        id: String(Date.now()),
        text: newClause,
        type: 'goal',
        priority: 'preferred',
      },
    ])
    setNewClause('')
  }

  const removeClause = (id: string) => {
    setMandate(mandate.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-50">AI Trading Studio</h1>
        <p className="mt-1 text-sm text-surface-400">
          Define investment mandates in natural language and deploy AI agents
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Mandate Builder */}
        <motion.div
          {...fadeUp}
          className="lg:col-span-3 rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-medium text-surface-200">Investment Mandate</h2>

          <div className="space-y-3">
            <AnimatePresence>
              {mandate.map((clause) => (
                <motion.div
                  key={clause.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="group flex items-start gap-3 rounded-lg bg-surface-800/50 p-3"
                >
                  <span
                    className={`mt-0.5 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      clause.priority === 'required'
                        ? 'bg-primary-600/20 text-primary-400'
                        : clause.priority === 'preferred'
                        ? 'bg-accent-600/20 text-accent-400'
                        : 'bg-surface-600/20 text-surface-400'
                    }`}
                  >
                    {clause.priority}
                  </span>
                  <p className="flex-1 text-sm text-surface-200">{clause.text}</p>
                  <button
                    onClick={() => removeClause(clause.id)}
                    className="text-surface-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-error-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newClause}
              onChange={(e) => setNewClause(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addClause()}
              placeholder="Add mandate clause (e.g., Keep 30% in stablecoins)"
              className="flex-1 rounded-lg border border-surface-700 bg-surface-800 px-3 py-2 text-sm text-surface-200 placeholder-surface-500 outline-none transition-colors focus:border-primary-600"
            />
            <button
              onClick={addClause}
              className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </motion.div>

        {/* Agent Selection */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm">
            <h2 className="mb-4 text-sm font-medium text-surface-200">Select Agent</h2>
            <div className="space-y-2">
              {agentTypes.map((at) => (
                <button
                  key={at.type}
                  onClick={() => setSelectedAgent(at.type)}
                  className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
                    selectedAgent === at.type
                      ? 'border border-primary-600 bg-primary-600/10'
                      : 'border border-transparent bg-surface-800/50 hover:bg-surface-800'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${at.color}`}
                  >
                    <at.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200">{at.name}</p>
                    <p className="text-xs text-surface-500">{at.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration */}
          <div className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm">
            <h2 className="mb-4 text-sm font-medium text-surface-200">Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-surface-400">Capital Allocation</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-surface-500">$</span>
                  <input
                    type="text"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="w-full rounded-lg border border-surface-700 bg-surface-800 py-2 pl-7 pr-3 text-sm text-surface-200 outline-none focus:border-primary-600"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-surface-400">Risk Tolerance</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRiskTolerance(r)}
                      className={`flex-1 rounded-lg py-2 text-xs font-medium capitalize transition-colors ${
                        riskTolerance === r
                          ? r === 'low'
                            ? 'bg-accent-600/20 text-accent-400 border border-accent-600'
                            : r === 'medium'
                            ? 'bg-warning-500/20 text-warning-500 border border-warning-500'
                            : 'bg-error-500/20 text-error-500 border border-error-500'
                          : 'bg-surface-800 text-surface-400 border border-surface-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Deploy Button */}
          <button
            disabled={!selectedAgent}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            Deploy Agent
          </button>
        </motion.div>
      </div>

      {/* Active Agents */}
      <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
        <h2 className="mb-4 text-sm font-medium text-surface-200">Deployed Agents</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm transition-all hover:border-surface-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
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
                    <p className="text-xs text-surface-500">{agent.trades_count} trades</p>
                  </div>
                </div>
                <button
                  className={`rounded-lg p-2 transition-colors ${
                    agent.status === 'active'
                      ? 'bg-accent-600/20 text-accent-400 hover:bg-accent-600/30'
                      : 'bg-surface-700 text-surface-400 hover:bg-surface-600'
                  }`}
                >
                  {agent.status === 'active' ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-surface-500">P&L</p>
                  <p
                    className={`text-sm font-semibold ${
                      agent.pnl >= 0 ? 'text-accent-400' : 'text-error-500'
                    }`}
                  >
                    {agent.pnl >= 0 ? '+' : ''}${agent.pnl.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Success Rate</p>
                  <p className="text-sm font-semibold text-surface-200">{agent.success_rate}%</p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Capital</p>
                  <p className="text-sm font-semibold text-surface-200">
                    ${agent.capital_allocated.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-surface-500">Status</p>
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
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
