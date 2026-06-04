import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SidebarProvider } from './hooks/useSidebar'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import TradingStudio from './pages/TradingStudio'
import Staking from './pages/Staking'
import Marketplace from './pages/Marketplace'
import Validators from './pages/Validators'

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="trading" element={<TradingStudio />} />
            <Route path="staking" element={<Staking />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="validators" element={<Validators />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  )
}
