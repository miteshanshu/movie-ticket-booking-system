import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getMovies } from '../services/booking'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div>Loading movies...</div>

  return (
    <div className="home">
      <h1>Now Showing</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Home