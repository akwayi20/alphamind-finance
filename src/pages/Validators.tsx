import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2, XCircle, Clock, Activity, TrendingUp } from 'lucide-react'
import { validators, transactions } from '../lib/data'
import { ConsensusChart } from '../components/charts/ConsensusChart'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const consensusData = transactions
  .filter((t) => t.validator_votes)
  .map((t) => ({
    name: `${t.type.charAt(0).toUpperCase() + t.type.slice(1)} ${t.asset}`,
    approve: t.validator_votes!.approve,
    reject: t.validator_votes!.reject,
  }))

export default function Validators() {
  const activeValidators = validators.filter((v) => v.status === 'active')
  const avgAccuracy = activeValidators.reduce((acc, v) => acc + v.accuracy, 0) / activeValidators.length
  const avgUptime = activeValidators.reduce((acc, v) => acc + v.uptime, 0) / activeValidators.length
  const totalStake = activeValidators.reduce((acc, v) => acc + v.stake, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-50">Validator Dashboard</h1>
        <p className="mt-1 text-sm text-surface-400">
          Network-wide validator analytics and consensus monitoring
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Active Validators', value: activeValidators.length, icon: ShieldCheck },
          { label: 'Avg Accuracy', value: `${avgAccuracy.toFixed(1)}%`, icon: Activity },
          { label: 'Avg Uptime', value: `${avgUptime.toFixed(1)}%`, icon: Clock },
          { label: 'Total Staked', value: `$${totalStake.toLocaleString()}`, icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            {...fadeUp}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-surface-800 bg-surface-900/60 p-4 backdrop-blur-sm"
          >
            <stat.icon className="h-4 w-4 text-surface-500" />
            <p className="mt-2 text-xl font-semibold text-surface-50">{stat.value}</p>
            <p className="text-xs text-surface-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Validator List */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-medium text-surface-200">Validator Network</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-800">
                  <th className="pb-3 text-left text-xs font-medium text-surface-500">Validator</th>
                  <th className="pb-3 text-right text-xs font-medium text-surface-500">Uptime</th>
                  <th className="pb-3 text-right text-xs font-medium text-surface-500">Accuracy</th>
                  <th className="pb-3 text-right text-xs font-medium text-surface-500">Consensus</th>
                  <th className="pb-3 text-right text-xs font-medium text-surface-500">Stake</th>
                  <th className="pb-3 text-right text-xs font-medium text-surface-500">Rewards</th>
                  <th className="pb-3 text-right text-xs font-medium text-surface-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {validators.map((v) => (
                  <tr key={v.id} className="border-b border-surface-800/50 hover:bg-surface-800/30">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600/20 text-xs font-bold text-primary-400">
                          {v.name.charAt(0)}
                        </div>
                        <span className="font-medium text-surface-200">{v.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-surface-300">{v.uptime}%</td>
                    <td className="py-3 text-right">
                      <span
                        className={
                          v.accuracy >= 95
                            ? 'text-accent-400'
                            : v.accuracy >= 90
                            ? 'text-warning-500'
                            : 'text-error-500'
                        }
                      >
                        {v.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 text-right text-surface-300">{v.total_consensus}</td>
                    <td className="py-3 text-right font-mono text-surface-300">
                      ${v.stake.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-mono text-accent-400">
                      ${v.rewards_earned.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          v.status === 'active'
                            ? 'bg-accent-600/20 text-accent-400'
                            : v.status === 'inactive'
                            ? 'bg-surface-600/20 text-surface-400'
                            : 'bg-error-500/20 text-error-500'
                        }`}
                      >
                        {v.status === 'active' ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : v.status === 'inactive' ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Consensus Activity */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm"
        >
          <h2 className="mb-4 text-sm font-medium text-surface-200">Recent Consensus</h2>
          <ConsensusChart data={consensusData} />

          <div className="mt-4 space-y-3">
            {transactions
              .filter((t) => t.validator_votes)
              .slice(0, 3)
              .map((tx) => (
                <div key={tx.id} className="rounded-lg bg-surface-800/50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-surface-200">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.asset}
                    </p>
                    <span
                      className={`text-xs font-medium ${
                        tx.status === 'confirmed' ? 'text-accent-400' : 'text-warning-500'
                      }`}
                    >
                      {tx.validator_votes!.approve}/{tx.validator_votes!.total}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-700">
                    <div
                      className={`h-full rounded-full ${
                        tx.status === 'confirmed' ? 'bg-accent-500' : 'bg-warning-500'
                      }`}
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
