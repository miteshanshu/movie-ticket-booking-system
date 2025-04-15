import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getBookings } from '../services/booking'
import { format } from 'date-fns'

const Profile = () => {
  const { user, logout } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingData = await getBookings()
        setBookings(bookingData)
      } catch (error) {
        console.error('Failed to fetch bookings:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (user) {
      fetchBookings()
    }
  }, [user])

  if (!user) {
    return <div>Please login to view your profile</div>
  }

  if (loading) {
    return <div>Loading your bookings...</div>
  }

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={logout} className="btn btn-danger">
          Logout
        </button>
      </div>

      <div className="bookings-section">
        <h2>Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>You haven't made any bookings yet.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.movie.title}</h3>
                  <span className="booking-id">#{booking.id}</span>
                </div>
                <div className="booking-details">
                  <p>
                    <strong>Theater:</strong> {booking.theater.name}
                  </p>
                  <p>
                    <strong>Showtime:</strong>{' '}
                    {format(new Date(booking.showtime.time), 'PPPp')}
                  </p>
                  <p>
                    <strong>Seats:</strong> {booking.seats.join(', ')}
                  </p>
                  <p>
                    <strong>Total:</strong> ${booking.total.toFixed(2)}
                  </p>
                  <p>
                    <strong>Booked on:</strong>{' '}
                    {format(new Date(booking.createdAt), 'PPPp')}
                  </p>
                </div>
                <div className={`booking-status ${booking.status}`}>
                  {booking.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile