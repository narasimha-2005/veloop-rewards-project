import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, LayoutDashboard, Megaphone, Menu, Search, Settings, Users, Link2, Gift, BarChart3, UserCircle, LogOut, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout({ role = 'admin' }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleGlobalSearch = (event) => {
    if (event.key !== 'Enter') return
    const query = search.trim().toLowerCase()
    if (!query) return
    if (query.includes('campaign')) navigate(role === 'admin' ? '/admin/campaigns' : '/ambassador/campaigns')
    else if (query.includes('ambassador')) navigate('/admin/ambassadors')
    else if (query.includes('referral')) navigate(role === 'admin' ? '/admin/referrals' : '/ambassador/referrals')
    else if (query.includes('reward')) navigate(role === 'admin' ? '/admin/rewards' : '/ambassador/rewards')
    else if (query.includes('report')) navigate('/admin/reports')
    else navigate(role === 'admin' ? '/admin' : '/ambassador')
  }
  const { session, logout } = useAuth()
  const adminLinks = [
    ['Dashboard','/admin','LayoutDashboard'], ['Ambassadors','/admin/ambassadors','Users'], ['Campaigns','/admin/campaigns','Megaphone'], ['Referrals','/admin/referrals','Link2'], ['Rewards','/admin/rewards','Gift'], ['Reports','/admin/reports','BarChart3'], ['Notifications','/admin/notifications','Bell'], ['Settings','/admin/settings','Settings']
  ]
  const ambassadorLinks = [
    ['Overview','/ambassador','LayoutDashboard'], ['My Profile','/ambassador/profile','UserCircle'], ['Available Campaigns','/ambassador/campaigns','Megaphone'], ['My Campaigns','/ambassador/my-campaigns','Link2'], ['Referral Tracking','/ambassador/referrals','BarChart3'], ['My Rewards','/ambassador/rewards','Gift'], ['Notifications','/ambassador/notifications','Bell'], ['Settings','/ambassador/settings','Settings']
  ]
  const links = role === 'admin' ? adminLinks : ambassadorLinks
  const icons = { LayoutDashboard, Users, Megaphone, Link2, Gift, BarChart3, Bell, Settings, UserCircle }

  const handleLogout = () => { logout(); navigate('/login') }

  return <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
    {open && <button aria-label="Close menu" className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col bg-[#111827] text-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-20 items-center justify-between px-6">
        <button onClick={() => navigate(role === 'admin' ? '/admin' : '/ambassador')} className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-600 font-black">V</div>
          <div className="text-left"><div className="text-[15px] font-bold tracking-tight">VELOOP</div><div className="text-[10px] font-semibold tracking-[.2em] text-slate-400">REWARDS</div></div>
        </button>
        <button className="lg:hidden" onClick={() => setOpen(false)}><X size={20}/></button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map(([label, path, iconName]) => { const Icon = icons[iconName]; return <NavLink key={path} to={path} end={path === '/admin' || path === '/ambassador'} onClick={() => setOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded-lg px-3 py-[11px] text-sm font-medium transition ${isActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-950/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}><Icon size={18}/>{label}</NavLink>})}
      </nav>
      <button onClick={handleLogout} className="mx-3 mb-5 flex items-center gap-3 rounded-lg px-3 py-[11px] text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white"><LogOut size={18}/>Logout</button>
    </aside>

    <div className="lg:pl-[248px]">
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
        <div className="flex items-center gap-3"><button className="rounded-lg border border-slate-200 p-2 lg:hidden" onClick={() => setOpen(true)}><Menu size={20}/></button><div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-slate-400 md:flex"><Search size={16}/><input value={search} onChange={event => setSearch(event.target.value)} onKeyDown={handleGlobalSearch} className="w-44 bg-transparent text-sm outline-none" placeholder="Search anything..."/></div></div>
        <div className="flex items-center gap-2 md:gap-4"><button onClick={() => navigate(role === 'admin' ? '/admin/notifications' : '/ambassador/notifications')} className="relative rounded-lg border border-slate-200 p-2.5 text-slate-500"><Bell size={18}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-600 ring-2 ring-white"/></button><div className="h-8 w-px bg-slate-200"/><button onClick={() => navigate(role === 'admin' ? '/admin/settings' : '/ambassador/profile')} className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">{(session?.name || (role === 'admin' ? 'AM' : 'JL')).charAt(0)}</div><div className="hidden text-left sm:block"><div className="text-sm font-semibold">{session?.name || (role === 'admin' ? 'Alex Morgan' : 'Jordan Lee')}</div><div className="text-xs capitalize text-slate-400">{role}</div></div><ChevronDown className="hidden text-slate-400 sm:block" size={16}/></button></div>
      </header>
      <main className="p-4 md:p-8"><Outlet/></main>
    </div>
  </div>
}
