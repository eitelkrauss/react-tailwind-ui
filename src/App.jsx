import { useState, Suspense, lazy, useEffect, createContext } from 'react'
import { classNames } from './utils'
import DangerousHtml from './components/DangerousHtml'
import AuthModal from './components/AuthModal'
import Home from './components/Home'
import ID4Face from './components/ID4Face'

export const AuthContext = createContext();

export default function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    validateCookie()
    return () => setIsAuth(false)
  }, [])

  const validateCookie = async () => {
    const hasProxyCookie = document.cookie.split('; ').some(c => c.startsWith('auth_cookie_proxy=') ? true : false)
    if(!hasProxyCookie) return
    fetch('/api/verify').then(res => {
      if(res.ok) return res.text()
    }).then(data => {
      console.log(data)
      setIsAuth(data === 'ok')
    })
  }

  return isAuth ? <Home onLogout={validateCookie} /> : <AuthContext.Provider value={validateCookie}><AuthModal onAuthSuccess={validateCookie} /></AuthContext.Provider>
}
