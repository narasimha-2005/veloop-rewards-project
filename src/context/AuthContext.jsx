import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem('velop_session')
      return saved ? JSON.parse(saved) : null
    } catch {
      localStorage.removeItem('velop_session')
      return null
    }
  })

  useEffect(() => {
    if (session) localStorage.setItem('velop_session', JSON.stringify(session))
    else localStorage.removeItem('velop_session')
  }, [session])

  const loginDemo = (role = 'admin', name = role === 'admin' ? 'Alex Morgan' : 'Jordan Lee') => {
    const next = { role, name, email: role === 'admin' ? 'alex@velopo.com' : 'jordan@velopo.com' }
    setSession(next)
    return next
  }
  const logout = () => setSession(null)
  const value = useMemo(() => ({ session, loginDemo, logout }), [session])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
