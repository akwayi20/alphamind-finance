import type { PortfolioAsset, Agent, StakingPosition, Transaction, Validator, PerformancePoint, MandateClause } from './types'

export const portfolioAssets: PortfolioAsset[] = [
  { id: '1', portfolio_id: '1', symbol: 'ETH', name: 'Ethereum', allocation: 32, value: 64000, change_24h: 2.4, category: 'Layer 1' },
  { id: '2', portfolio_id: '1', symbol: 'BTC', name: 'Bitcoin', allocation: 24, value: 48000, change_24h: 1.1, category: 'Layer 1' },
  { id: '3', portfolio_id: '1', symbol: 'SOL', name: 'Solana', allocation: 14, value: 28000, change_24h: -0.8, category: 'Layer 1' },
  { id: '4', portfolio_id: '1', symbol: 'TAO', name: 'Bittensor', allocation: 10, value: 20000, change_24h: 5.2, category: 'AI Infrastructure' },
  { id: '5', portfolio_id: '1', symbol: 'FET', name: 'Fetch.ai', allocation: 8, value: 16000, change_24h: 3.7, category: 'AI Infrastructure' },
  { id: '6', portfolio_id: '1', symbol: 'USDC', name: 'USD Coin', allocation: 12, value: 24000, change_24h: 0, category: 'Stablecoin' },
]

export const agents: Agent[] = [
  {
    id: '1', name: 'Momentum Trader', type: 'momentum', status: 'active',
    description: 'Trend-following strategy optimized for growth. Captures momentum across major assets using technical indicators and AI-driven signal confirmation.',
    apy: 18.5, risk_level: 'high', capital_allocated: 45000, pnl: 3820, trades_count: 156, success_rate: 72,
    price: 0, rating: 4.8, subscribers: 1240,
  },
  {
    id: '2', name: 'Yield Hunter', type: 'yield', status: 'active',
    description: 'Maximizes staking and yield opportunities across chains. Auto-compounds rewards and shifts capital to highest APY positions.',
    apy: 12.3, risk_level: 'low', capital_allocated: 32000, pnl: 1640, trades_count: 42, success_rate: 89,
    price: 0, rating: 4.6, subscribers: 890,
  },
  {
    id: '3', name: 'Treasury Manager', type: 'treasury', status: 'active',
    description: 'Designed for DAOs and institutional treasuries. Diversifies holdings, manages stablecoin allocation, and optimizes revenue streams.',
    apy: 9.1, risk_level: 'low', capital_allocated: 28000, pnl: 890, trades_count: 28, success_rate: 93,
    price: 0, rating: 4.9, subscribers: 340,
  },
  {
    id: '4', name: 'Arbitrage Hunter', type: 'arbitrage', status: 'paused',
    description: 'Captures cross-market inefficiencies with near-zero risk. Monitors DEX/CEX spreads and executes atomically.',
    apy: 7.8, risk_level: 'medium', capital_allocated: 0, pnl: 520, trades_count: 89, success_rate: 95,
    price: 0, rating: 4.3, subscribers: 560,
  },
  {
    id: '5', name: 'Risk Guardian', type: 'risk', status: 'active',
    description: 'Protects portfolios from excessive downside risk. Monitors volatility, correlation, and drawdowns to trigger defensive rebalancing.',
    apy: 5.4, risk_level: 'low', capital_allocated: 15000, pnl: 340, trades_count: 18, success_rate: 97,
    price: 0, rating: 4.7, subscribers: 720,
  },
]

export const marketplaceAgents: Agent[] = [
  {
    id: '6', name: 'DeFi Yield Maximizer', type: 'yield', status: 'deploying',
    description: 'Scans 200+ DeFi protocols to find the highest risk-adjusted yields. Auto-harvests and re-deposits for compound growth.',
    apy: 15.2, risk_level: 'medium', capital_allocated: 0, pnl: 0, trades_count: 0, success_rate: 0,
    price: 50, rating: 4.5, subscribers: 320,
  },
  {
    id: '7', name: 'Cross-Chain Bridge Arb', type: 'arbitrage', status: 'deploying',
    description: 'Identifies price discrepancies across bridge endpoints and executes MEV-resistant arbitrage transactions.',
    apy: 8.4, risk_level: 'medium', capital_allocated: 0, pnl: 0, trades_count: 0, success_rate: 0,
    price: 75, rating: 4.2, subscribers: 180,
  },
  {
    id: '8', name: 'AI Sector Rotator', type: 'momentum', status: 'deploying',
    description: 'Rotates capital between AI sub-sectors (compute, data, inference) based on on-chain activity and sentiment signals.',
    apy: 22.1, risk_level: 'high', capital_allocated: 0, pnl: 0, trades_count: 0, success_rate: 0,
    price: 100, rating: 4.4, subscribers: 450,
  },
  {
    id: '9', name: 'Stablecoin Vault', type: 'treasury', status: 'deploying',
    description: 'Capital-preserving stablecoin strategies with yield from lending, real-world assets, and delta-neutral positions.',
    apy: 6.2, risk_level: 'low', capital_allocated: 0, pnl: 0, trades_count: 0, success_rate: 0,
    price: 25, rating: 4.8, subscribers: 890,
  },
]

export const stakingPositions: StakingPosition[] = [
  { id: '1', asset: 'ETH', amount: 12.5, apy: 4.2, rewards_earned: 0.52, duration: '90 days', status: 'active', auto_compound: true, chain: 'Ethereum' },
  { id: '2', asset: 'SOL', amount: 85, apy: 6.8, rewards_earned: 5.78, duration: '30 days', status: 'active', auto_compound: true, chain: 'Solana' },
  { id: '3', asset: 'TAO', amount: 200, apy: 14.5, rewards_earned: 29, duration: '60 days', status: 'active', auto_compound: false, chain: 'Bittensor' },
  { id: '4', asset: 'ALPHA', amount: 5000, apy: 11.2, rewards_earned: 560, duration: '180 days', status: 'active', auto_compound: true, chain: 'GenLayer' },
  { id: '5', asset: 'FET', amount: 3000, apy: 8.9, rewards_earned: 267, duration: '45 days', status: 'active', auto_compound: false, chain: 'Cosmos' },
  { id: '6', asset: 'ETH', amount: 4, apy: 3.8, rewards_earned: 0.15, duration: '7 days', status: 'unstaking', auto_compound: false, chain: 'Ethereum' },
]

export const transactions: Transaction[] = [
  { id: '1', type: 'buy', asset: 'TAO', amount: 50, value: 10000, timestamp: '2026-06-04T14:30:00Z', status: 'confirmed', agent_id: '1', validator_votes: { approve: 4, reject: 1, total: 5 } },
  { id: '2', type: 'stake', asset: 'ETH', amount: 2.5, value: 5000, timestamp: '2026-06-04T12:15:00Z', status: 'confirmed', agent_id: '2', validator_votes: { approve: 5, reject: 0, total: 5 } },
  { id: '3', type: 'sell', asset: 'BTC', amount: 0.15, value: 9600, timestamp: '2026-06-04T10:45:00Z', status: 'validating', agent_id: '1', validator_votes: { approve: 2, reject: 1, total: 5 } },
  { id: '4', type: 'buy', asset: 'FET', amount: 1000, value: 1600, timestamp: '2026-06-04T09:20:00Z', status: 'pending' },
  { id: '5', type: 'reward', asset: 'SOL', amount: 2.3, value: 460, timestamp: '2026-06-03T23:00:00Z', status: 'confirmed' },
  { id: '6', type: 'unstake', asset: 'ETH', amount: 4, value: 8000, timestamp: '2026-06-03T18:30:00Z', status: 'confirmed', agent_id: '5', validator_votes: { approve: 5, reject: 0, total: 5 } },
  { id: '7', type: 'transfer', asset: 'USDC', amount: 5000, value: 5000, timestamp: '2026-06-03T15:00:00Z', status: 'confirmed' },
  { id: '8', type: 'buy', asset: 'SOL', amount: 30, value: 6000, timestamp: '2026-06-03T11:30:00Z', status: 'rejected', agent_id: '1', validator_votes: { approve: 1, reject: 4, total: 5 } },
]

export const validators: Validator[] = [
  { id: '1', name: 'Atlas Node', uptime: 99.7, total_consensus: 4521, accuracy: 96.2, stake: 50000, status: 'active', rewards_earned: 8420 },
  { id: '2', name: 'Nova Validator', uptime: 99.2, total_consensus: 4180, accuracy: 94.8, stake: 35000, status: 'active', rewards_earned: 6230 },
  { id: '3', name: 'Zenith Consensus', uptime: 98.5, total_consensus: 3890, accuracy: 93.1, stake: 28000, status: 'active', rewards_earned: 4870 },
  { id: '4', name: 'Polaris Node', uptime: 97.8, total_consensus: 3450, accuracy: 91.5, stake: 22000, status: 'active', rewards_earned: 3520 },
  { id: '5', name: 'Horizon Validator', uptime: 99.4, total_consensus: 4210, accuracy: 95.7, stake: 42000, status: 'active', rewards_earned: 7180 },
  { id: '6', name: 'Eclipse Node', uptime: 96.2, total_consensus: 2890, accuracy: 88.4, stake: 15000, status: 'inactive', rewards_earned: 2140 },
]

export const performanceData: PerformancePoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 5, i + 1)
  const base = 180000 + i * 800
  const noise = Math.sin(i * 0.5) * 5000 + Math.cos(i * 0.3) * 3000
  return {
    date: date.toISOString().split('T')[0],
    value: Math.round(base + noise),
    benchmark: Math.round(base * 0.92 + noise * 0.6),
  }
})

export const defaultMandate: MandateClause[] = [
  { id: '1', text: 'Invest 40% in AI infrastructure assets', type: 'allocation', priority: 'required' },
  { id: '2', text: 'Maintain at least 25% in staking positions', type: 'allocation', priority: 'required' },
  { id: '3', text: 'Keep portfolio volatility below 12%', type: 'risk', priority: 'required' },
  { id: '4', text: 'Max drawdown limit of 15%', type: 'risk', priority: 'required' },
  { id: '5', text: 'Target annual yield of 10%+', type: 'goal', priority: 'preferred' },
  { id: '6', text: 'Prefer blue-chip assets over emerging tokens', type: 'constraint', priority: 'optional' },
]
