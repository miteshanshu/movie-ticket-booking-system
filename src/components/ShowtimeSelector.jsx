import { format } from 'date-fns'

const ShowtimeSelector = ({ showtimes, onSelect, selectedShowtime }) => {
  return (
    <div className="showtime-selector">
      <h3>Available Showtimes</h3>
      <div className="showtime-grid">
        {showtimes.map((showtime) => (
          <div
            key={showtime.id}
            className={`showtime-card ${
              selectedShowtime?.id === showtime.id ? 'selected' : ''
            }`}
            onClick={() => onSelect(showtime)}
          >
            <div className="showtime-time">
              {format(new Date(showtime.time), 'h:mm a')}
            </div>
            <div className="showtime-price">${showtime.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowtimeSelector