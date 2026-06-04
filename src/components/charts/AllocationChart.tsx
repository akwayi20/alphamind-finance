import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#6366f1']

interface AllocationItem {
  name: string
  value: number
  color?: string
}

export function AllocationChart({ data }: { data: AllocationItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={entry.color ?? COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 8,
            fontSize: 12,
            color: '#f1f5f9',
          }}
          formatter={(value) => [`${value}%`, '']}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
