import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSidebar } from '../../hooks/useSidebar'
import { motion } from 'framer-motion'

export default function AppShell() {
  const { collapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-surface-950">
      <Sidebar />
      <motion.div
        animate={{ marginLeft: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex flex-1 flex-col"
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </motion.div>
    </div>
  )
}
