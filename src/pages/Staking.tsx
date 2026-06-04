import { motion } from 'framer-motion'
import { Coins, RefreshCw, ArrowDownToLine, ArrowUpFromLine, ToggleLeft, ToggleRight } from 'lucide-react'
import { useState } from 'react'
import { stakingPositions } from '../lib/data'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const totalStaked = stakingPositions
  .filter((s) => s.status === 'active')
  .reduce((acc, s) => acc + s.amount, 0)

const totalRewards = stakingPositions.reduce((acc, s) => acc + s.rewards_earned, 0)

const avgApy =
  stakingPositions
    .filter((s) => s.status === 'active')
    .reduce((acc, s) => acc + s.apy, 0) / stakingPositions.filter((s) => s.status === 'active').length

const discoverOpportunities = [
  { chain: 'Ethereum', asset: 'ETH', apy: 4.5, minStake: '0.1 ETH', type: 'Liquid Staking' },
  { chain: 'Solana', asset: 'SOL', apy: 7.2, minStake: '1 SOL', type: 'Native Staking' },
  { chain: 'Cosmos', asset: 'ATOM', apy: 18.5, minStake: '1 ATOM', type: 'Governance' },
  { chain: 'Bittensor', asset: 'TAO', apy: 15.8, minStake: '1 TAO', type: 'Subnet Validator' },
  { chain: 'GenLayer', asset: 'ALPHA', apy: 12.4, minStake: '100 ALPHA', type: 'AI Consensus' },
]

export default function Staking() {
  const [autoCompoundAll, setAutoCompoundAll] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-50">Staking Hub</h1>
        <p className="mt-1 text-sm text-surface-400">
          Maximize yields with dynamic APY discovery and auto-compounding
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Staked', value: `$${totalStaked.toLocaleString()}`, icon: Coins },
          { label: 'Rewards Earned', value: `$${totalRewards.toLocaleString()}`, icon: ArrowDownToLine },
          { label: 'Average APY', value: `${avgApy.toFixed(1)}%`, icon: RefreshCw },
          { label: 'Active Positions', value: String(stakingPositions.filter((s) => s.status === 'active').length), icon: ArrowUpFromLine },
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

      {/* Auto-compound toggle */}
      <div className="flex items-center justify-between rounded-xl border border-surface-800 bg-surface-900/60 p-4 backdrop-blur-sm">
        <div>
          <p className="text-sm font-medium text-surface-200">Auto-Compound All Rewards</p>
          <p className="text-xs text-surface-500">Automatically re-stake earned rewards for compound growth</p>
        </div>
        <button onClick={() => setAutoCompoundAll(!autoCompoundAll)} className="text-surface-400">
          {autoCompoundAll ? (
            <ToggleRight className="h-8 w-8 text-accent-400" />
          ) : (
            <ToggleLeft className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Active Positions */}
      <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
        <h2 className="mb-4 text-sm font-medium text-surface-200">Active Positions</h2>
        <div className="space-y-3">
          {stakingPositions.map((pos) => (
            <div
              key={pos.id}
              className="flex items-center justify-between rounded-xl border border-surface-800 bg-surface-900/60 p-4 backdrop-blur-sm transition-all hover:border-surface-700"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600/20 text-sm font-bold text-primary-400">
                  {pos.asset.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-surface-200">{pos.asset}</p>
                    <span className="rounded-full bg-surface-800 px-2 py-0.5 text-xs text-surface-400">
                      {pos.chain}
                    </span>
                  </div>
                  <p className="text-xs text-surface-500">
                    {pos.amount} {pos.asset} staked for {pos.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs text-surface-500">APY</p>
                  <p className="text-sm font-semibold text-accent-400">{pos.apy}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-surface-500">Rewards</p>
                  <p className="text-sm font-semibold text-surface-200">
                    {pos.rewards_earned} {pos.asset}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {pos.auto_compound && (
                    <span className="rounded-full bg-accent-600/20 px-2 py-0.5 text-xs font-medium text-accent-400">
                      Auto-compound
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      pos.status === 'active'
                        ? 'bg-accent-600/20 text-accent-400'
                        : pos.status === 'unstaking'
                        ? 'bg-warning-500/20 text-warning-500'
                        : 'bg-surface-600/20 text-surface-400'
                    }`}
                  >
                    {pos.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Discover Opportunities */}
      <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
        <h2 className="mb-4 text-sm font-medium text-surface-200">Discover Yield Opportunities</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {discoverOpportunities.map((opp) => (
            <div
              key={opp.asset + opp.chain}
              className="group rounded-xl border border-surface-800 bg-surface-900/60 p-5 backdrop-blur-sm transition-all hover:border-primary-600/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600/20 text-sm font-bold text-primary-400">
                    {opp.asset.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-200">{opp.asset}</p>
                    <p className="text-xs text-surface-500">{opp.chain}</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-accent-400">{opp.apy}%</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-surface-500">
                  Min: {opp.minStake}
                </span>
                <span className="rounded-full bg-surface-800 px-2 py-0.5 text-xs text-surface-400">
                  {opp.type}
                </span>
              </div>
              <button className="mt-3 w-full rounded-lg bg-primary-600/20 py-2 text-xs font-medium text-primary-400 transition-colors hover:bg-primary-600/30 group-hover:bg-primary-600/30">
                Stake Now
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
