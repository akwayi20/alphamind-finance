/*
# AlphaMind Finance MVP Schema (single-tenant, no auth)

1. New Tables
- `portfolios` — portfolio summary with value, P&L, risk score, agent count, validator confidence
- `portfolio_assets` — individual assets within a portfolio with allocation, value, and 24h change
- `agents` — AI trading agents with type, status, performance metrics, and marketplace info
- `staking_positions` — staking positions with APY, rewards, chain, and auto-compound flag
- `transactions` — financial transactions with type, validation status, and validator votes
- `validators` — network validators with uptime, accuracy, stake, and reward data

2. Security
- All tables use RLS with `anon, authenticated` policies since this is a single-tenant MVP.
- `USING (true)` is intentional — data is shared/public with no user isolation.
*/

CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Main Portfolio',
  total_value numeric NOT NULL DEFAULT 0,
  daily_pnl numeric NOT NULL DEFAULT 0,
  daily_pnl_pct numeric NOT NULL DEFAULT 0,
  risk_score numeric NOT NULL DEFAULT 0,
  active_agents integer NOT NULL DEFAULT 0,
  validator_confidence numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  symbol text NOT NULL,
  name text NOT NULL,
  allocation numeric NOT NULL DEFAULT 0,
  value numeric NOT NULL DEFAULT 0,
  change_24h numeric NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'Other',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('momentum', 'yield', 'treasury', 'arbitrage', 'risk')),
  status text NOT NULL DEFAULT 'deploying' CHECK (status IN ('active', 'paused', 'deploying', 'error')),
  description text NOT NULL DEFAULT '',
  apy numeric DEFAULT 0,
  risk_level text NOT NULL DEFAULT 'medium' CHECK (risk_level IN ('low', 'medium', 'high')),
  capital_allocated numeric NOT NULL DEFAULT 0,
  pnl numeric NOT NULL DEFAULT 0,
  trades_count integer NOT NULL DEFAULT 0,
  success_rate numeric NOT NULL DEFAULT 0,
  price numeric NOT NULL DEFAULT 0,
  rating numeric NOT NULL DEFAULT 0,
  subscribers integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS staking_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  apy numeric NOT NULL DEFAULT 0,
  rewards_earned numeric NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unstaking', 'withdrawn')),
  auto_compound boolean NOT NULL DEFAULT false,
  chain text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('buy', 'sell', 'stake', 'unstake', 'transfer', 'reward')),
  asset text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  value numeric NOT NULL DEFAULT 0,
  timestamp timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'validating', 'rejected')),
  agent_id uuid,
  validator_votes jsonb DEFAULT null,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS validators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  uptime numeric NOT NULL DEFAULT 0,
  total_consensus integer NOT NULL DEFAULT 0,
  accuracy numeric NOT NULL DEFAULT 0,
  stake numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'slashed')),
  rewards_earned numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE staking_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE validators ENABLE ROW LEVEL SECURITY;

-- Portfolios policies
DROP POLICY IF EXISTS "anon_crud_portfolios" ON portfolios;
CREATE POLICY "anon_crud_portfolios" ON portfolios FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_portfolios" ON portfolios;
CREATE POLICY "anon_insert_portfolios" ON portfolios FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_portfolios" ON portfolios;
CREATE POLICY "anon_update_portfolios" ON portfolios FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_portfolios" ON portfolios;
CREATE POLICY "anon_delete_portfolios" ON portfolios FOR DELETE TO anon, authenticated USING (true);

-- Portfolio assets policies
DROP POLICY IF EXISTS "anon_crud_portfolio_assets" ON portfolio_assets;
CREATE POLICY "anon_crud_portfolio_assets" ON portfolio_assets FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_portfolio_assets" ON portfolio_assets;
CREATE POLICY "anon_insert_portfolio_assets" ON portfolio_assets FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_portfolio_assets" ON portfolio_assets;
CREATE POLICY "anon_update_portfolio_assets" ON portfolio_assets FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_portfolio_assets" ON portfolio_assets;
CREATE POLICY "anon_delete_portfolio_assets" ON portfolio_assets FOR DELETE TO anon, authenticated USING (true);

-- Agents policies
DROP POLICY IF EXISTS "anon_crud_agents" ON agents;
CREATE POLICY "anon_crud_agents" ON agents FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_agents" ON agents;
CREATE POLICY "anon_insert_agents" ON agents FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_agents" ON agents;
CREATE POLICY "anon_update_agents" ON agents FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_agents" ON agents;
CREATE POLICY "anon_delete_agents" ON agents FOR DELETE TO anon, authenticated USING (true);

-- Staking positions policies
DROP POLICY IF EXISTS "anon_crud_staking_positions" ON staking_positions;
CREATE POLICY "anon_crud_staking_positions" ON staking_positions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_staking_positions" ON staking_positions;
CREATE POLICY "anon_insert_staking_positions" ON staking_positions FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_staking_positions" ON staking_positions;
CREATE POLICY "anon_update_staking_positions" ON staking_positions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_staking_positions" ON staking_positions;
CREATE POLICY "anon_delete_staking_positions" ON staking_positions FOR DELETE TO anon, authenticated USING (true);

-- Transactions policies
DROP POLICY IF EXISTS "anon_crud_transactions" ON transactions;
CREATE POLICY "anon_crud_transactions" ON transactions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_transactions" ON transactions;
CREATE POLICY "anon_insert_transactions" ON transactions FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_transactions" ON transactions;
CREATE POLICY "anon_update_transactions" ON transactions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_transactions" ON transactions;
CREATE POLICY "anon_delete_transactions" ON transactions FOR DELETE TO anon, authenticated USING (true);

-- Validators policies
DROP POLICY IF EXISTS "anon_crud_validators" ON validators;
CREATE POLICY "anon_crud_validators" ON validators FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_validators" ON validators;
CREATE POLICY "anon_insert_validators" ON validators FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_validators" ON validators;
CREATE POLICY "anon_update_validators" ON validators FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_validators" ON validators;
CREATE POLICY "anon_delete_validators" ON validators FOR DELETE TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_assets_portfolio ON portfolio_assets(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_agents_type ON agents(type);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
