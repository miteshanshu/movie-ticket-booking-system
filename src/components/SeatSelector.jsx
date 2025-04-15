import { useState, useEffect } from 'react'
import { getSeatAvailability } from '../services/booking'

const SeatSelector = ({ showtimeId, onSeatSelect }) => {
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatData = await getSeatAvailability(showtimeId)
        setSeats(seatData)
        setLoading(false)
      } catch (err) {
        setError('Failed to load seat availability')
        setLoading(false)
      }
    }
    fetchSeats()
  }, [showtimeId])

  const handleSeatClick = (seat) => {
    if (seat.status !== 'available') return

    const newSelectedSeats = selectedSeats.includes(seat.id)
      ? selectedSeats.filter((id) => id !== seat.id)
      : [...selectedSeats, seat.id]

    setSelectedSeats(newSelectedSeats)
    onSeatSelect(newSelectedSeats)
  }

  if (loading) return <div>Loading seats...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="seat-selector">
      <div className="screen">Screen</div>
      <div className="seats-grid">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status} ${
              selectedSeats.includes(seat.id) ? 'selected' : ''
            }`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.number}
          </div>
        ))}
      </div>
      <div className="seat-legend">
        <div>
          <span className="seat available"></span> Available
        </div>
        <div>
          <span className="seat booked"></span> Booked
        </div>
        <div>
          <span className="seat selected"></span> Selected
        </div>
      </div>
    </div>
  )
}

export default SeatSelector