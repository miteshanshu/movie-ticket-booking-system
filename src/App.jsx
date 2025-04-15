import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Booking from './pages/Booking'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/booking/:movieId" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </Router>
  )
}

export default App