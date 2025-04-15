import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.genre}</p>
      <p>{movie.duration} mins</p>
      <Link to={`/booking/${movie.id}`} className="btn btn-primary">
        Book Now
      </Link>
    </div>
  )
}

export default MovieCard