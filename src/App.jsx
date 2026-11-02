import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import DashboardLayout from './layouts/DashboardLayout'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Ambassadors from './pages/admin/Ambassadors'
import Campaigns from './pages/admin/Campaigns'
import Referrals from './pages/admin/Referrals'
import Rewards from './pages/admin/Rewards'
import Reports from './pages/admin/Reports'
import Notifications from './pages/admin/Notifications'
import Settings from './pages/Settings'
import AdminDashboard from './pages/admin/AdminDashboard'
import AmbassadorDashboard from './pages/ambassador/AmbassadorDashboard'
import AmbassadorCampaigns from './pages/ambassador/AmbassadorCampaigns'
import AmbassadorReferrals from './pages/ambassador/AmbassadorReferrals'
import AmbassadorRewards from './pages/ambassador/AmbassadorRewards'

function ProtectedAdmin({children}) { const {session}=useAuth(); return session?.role==='admin'?children:<Navigate to="/login" replace /> }
function ProtectedAmbassador({children}) { const {session}=useAuth(); return session?.role==='ambassador'?children:<Navigate to="/login" replace /> }

export default function App(){return <BrowserRouter><AuthProvider><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
<Route path="/admin" element={<ProtectedAdmin><DashboardLayout role="admin"/></ProtectedAdmin>}><Route index element={<AdminDashboard/>}/><Route path="ambassadors" element={<Ambassadors/>}/><Route path="campaigns" element={<Campaigns/>}/><Route path="referrals" element={<Referrals/>}/><Route path="rewards" element={<Rewards/>}/><Route path="reports" element={<Reports/>}/><Route path="notifications" element={<Notifications/>}/><Route path="settings" element={<Settings role="admin"/>}/></Route>
<Route path="/ambassador" element={<ProtectedAmbassador><DashboardLayout role="ambassador"/></ProtectedAmbassador>}><Route index element={<AmbassadorDashboard/>}/><Route path="profile" element={<Settings role="ambassador"/>}/><Route path="campaigns" element={<AmbassadorCampaigns/>}/><Route path="my-campaigns" element={<AmbassadorCampaigns joined/>}/><Route path="referrals" element={<AmbassadorReferrals/>}/><Route path="rewards" element={<AmbassadorRewards/>}/><Route path="notifications" element={<Notifications role="ambassador"/>}/><Route path="settings" element={<Settings role="ambassador"/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes></AuthProvider></BrowserRouter>}
