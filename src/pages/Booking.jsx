import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBookingContext } from '../context/BookingContext'
import { getTheaters, getShowtimes, getSeatAvailability, bookSeats } from '../services/booking'
import TheaterSelector from '../components/TheaterSelector'
import ShowtimeSelector from '../components/ShowtimeSelector'
import SeatSelector from '../components/SeatSelector'
import BookingSummary from '../components/BookingSummary'
import PaymentForm from '../components/PaymentForm'

const Booking = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const {
    selectedMovie,
    setSelectedMovie,
    selectedTheater,
    setSelectedTheater,
    selectedShowtime,
    setSelectedShowtime,
    selectedSeats,
    setSelectedSeats,
    bookingStep,
    setBookingStep,
    resetBooking
  } = useBookingContext()

  const [theaters, setTheaters] = useState([])
  const [showtimes, setShowtimes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    resetBooking()
    // Set sample movie or fetch from mock data
    setSelectedMovie({ 
      id: movieId, 
      title: 'Sample Movie',
      genre: 'Action',
      duration: 120,
      posterUrl: 'https://d1wj8oqehjepyy.cloudfront.net/i/boxart/w340/86/37/786936863703.jpg?v=3'
    })
    fetchTheaters()
  }, [movieId])

  const fetchTheaters = async () => {
    try {
      const theaterData = await getTheaters()
      setTheaters(theaterData)
      setLoading(false)
    } catch (err) {
      setError('Failed to load theaters')
      setLoading(false)
    }
  }

  const handleTheaterSelect = async (theater) => {
    setSelectedTheater(theater)
    try {
      const showtimeData = await getShowtimes(movieId, theater.id)
      setShowtimes(showtimeData)
      setBookingStep(3) // Move to showtime selection
    } catch (err) {
      setError('Failed to load showtimes')
    }
  }

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime)
    setBookingStep(4) // Move to seat selection
  }

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats)
    if (seats.length > 0) {
      setBookingStep(5) // Move to payment
    }
  }

  const handlePayment = async (paymentData) => {
    try {
      setLoading(true)
      const bookingResult = await bookSeats(
        selectedShowtime.id,
        selectedSeats
      )
      
      if (bookingResult.success) {
        navigate('/booking-confirmation', {
          state: {
            bookingId: bookingResult.bookingId,
            movie: selectedMovie,
            theater: selectedTheater,
            showtime: selectedShowtime,
            seats: selectedSeats
          }
        })
      }
    } catch (err) {
      setError('Failed to complete booking')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="booking-container">
      <h2>Booking: {selectedMovie?.title}</h2>
      
      {bookingStep >= 2 && (
        <div className="step">
          <h3>Select Theater</h3>
          <TheaterSelector 
            theaters={theaters} 
            onSelect={handleTheaterSelect} 
            selectedTheater={selectedTheater}
          />
        </div>
      )}

      {bookingStep >= 3 && (
        <div className="step">
          <h3>Select Showtime</h3>
          <ShowtimeSelector 
            showtimes={showtimes} 
            onSelect={handleShowtimeSelect} 
            selectedShowtime={selectedShowtime}
          />
        </div>
      )}

      {bookingStep >= 4 && (
        <div className="step">
          <h3>Select Seats</h3>
          <SeatSelector 
            showtimeId={selectedShowtime?.id} 
            onSeatSelect={handleSeatSelect}
          />
        </div>
      )}

      {bookingStep >= 5 && (
        <div className="step">
          <h3>Complete Booking</h3>
          <div className="booking-details">
            <BookingSummary
              movie={selectedMovie}
              theater={selectedTheater}
              showtime={selectedShowtime}
              seats={selectedSeats}
            />
            <PaymentForm 
              onPayment={handlePayment}
              amount={selectedSeats.length * (selectedShowtime?.price || 0)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Booking