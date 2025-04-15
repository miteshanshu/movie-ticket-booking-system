import API from './api'

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password })
  return response.data
}

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData)
  return response.data
}

export const getCurrentUser = async () => {
  const response = await API.get('/auth/me')
  return response.data
}