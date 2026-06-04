import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface VoteData {
  name: string
  approve: number
  reject: number
}

export function ConsensusChart({ data }: { data: VoteData[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 60, bottom: 0 }}>
        <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis
          dataKey="name"
          type="category"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          contentStyle={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 8,
            fontSize: 12,
            color: '#f1f5f9',
          }}
        />
        <Bar dataKey="approve" stackId="votes" radius={[0, 0, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill="#10b981" />
          ))}
        </Bar>
        <Bar dataKey="reject" stackId="votes" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill="#ef4444" />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
