export interface Portfolio {
  id: string
  user_id: string
  name: string
  total_value: number
  daily_pnl: number
  daily_pnl_pct: number
  risk_score: number
  active_agents: number
  validator_confidence: number
  created_at: string
  updated_at: string
}

export interface PortfolioAsset {
  id: string
  portfolio_id: string
  symbol: string
  name: string
  allocation: number
  value: number
  change_24h: number
  category: string
}

export interface Agent {
  id: string
  name: string
  type: 'momentum' | 'yield' | 'treasury' | 'arbitrage' | 'risk'
  status: 'active' | 'paused' | 'deploying' | 'error'
  description: string
  apy?: number
  risk_level: 'low' | 'medium' | 'high'
  capital_allocated: number
  pnl: number
  trades_count: number
  success_rate: number
  price: number
  rating: number
  subscribers: number
}

export interface StakingPosition {
  id: string
  asset: string
  amount: number
  apy: number
  rewards_earned: number
  duration: string
  status: 'active' | 'unstaking' | 'withdrawn'
  auto_compound: boolean
  chain: string
}

export interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'stake' | 'unstake' | 'transfer' | 'reward'
  asset: string
  amount: number
  value: number
  timestamp: string
  status: 'pending' | 'confirmed' | 'validating' | 'rejected'
  agent_id?: string
  validator_votes?: { approve: number; reject: number; total: number }
}

export interface Validator {
  id: string
  name: string
  uptime: number
  total_consensus: number
  accuracy: number
  stake: number
  status: 'active' | 'inactive' | 'slashed'
  rewards_earned: number
}

export interface PerformancePoint {
  date: string
  value: number
  benchmark: number
}

export interface MandateClause {
  id: string
  text: string
  type: 'allocation' | 'risk' | 'constraint' | 'goal'
  priority: 'required' | 'preferred' | 'optional'
}
