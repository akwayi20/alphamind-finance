import { Bell, Search, Wallet } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-800 bg-surface-950/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-9 items-center gap-2 rounded-lg border border-surface-700 bg-surface-900 px-3">
          <Search className="h-4 w-4 text-surface-500" />
          <input
            type="text"
            placeholder="Search assets, agents..."
            className="w-64 bg-transparent text-sm text-surface-200 placeholder-surface-500 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 text-sm font-medium text-surface-200 transition-colors hover:border-primary-600 hover:text-primary-400">
          <Wallet className="h-4 w-4" />
          <span className="font-mono">$200,000</span>
        </button>

        <button className="relative rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-800 hover:text-surface-200">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500" />
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
          AM
        </div>
      </div>
    </header>
  )
}
