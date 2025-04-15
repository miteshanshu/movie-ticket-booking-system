import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getMovies } from '../services/booking'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovies()
        setMovies(movieData)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div>Loading movies...</div>

  return (
    <div className="movies-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found matching your search.</p>
        )}
      </div>
    </div>
  )
}

export default Movies