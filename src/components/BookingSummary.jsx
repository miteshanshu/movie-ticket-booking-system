import { format } from 'date-fns'

const BookingSummary = ({ movie, theater, showtime, seats }) => {
  return (
    <div className="booking-summary">
      <h3>Booking Summary</h3>
      <div className="summary-item">
        <strong>Movie:</strong> {movie?.title}
      </div>
      <div className="summary-item">
        <strong>Theater:</strong> {theater?.name} ({theater?.location})
      </div>
      <div className="summary-item">
        <strong>Showtime:</strong> {showtime && format(new Date(showtime.time), 'PPPp')}
      </div>
      <div className="summary-item">
        <strong>Seats:</strong> {seats.join(', ')}
      </div>
      <div className="summary-item">
        <strong>Total:</strong> ${showtime ? (showtime.price * seats.length).toFixed(2) : '0.00'}
      </div>
    </div>
  )
}

export default BookingSummary