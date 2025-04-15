import { createContext, useState, useEffect, useContext } from 'react'
import { login as apiLogin, register as apiRegister } from '../services/auth'

// 1. Create the context
export const AuthContext = createContext()

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const userData = await apiLogin(email, password)
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return userData
  }

  const register = async (userData) => {
    const registeredUser = await apiRegister(userData)
    setUser(registeredUser)
    localStorage.setItem('user', JSON.stringify(registeredUser))
    return registeredUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Create and export the custom hook
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}