import { useState, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getTheaters,
  addTheater,
  updateTheater,
  deleteTheater,
  getShowtimes,
  addShowtime,
  updateShowtime,
  deleteShowtime
} from '../services/booking'


const Admin = () => {
  const { user, isAdmin } = useAuthContext()
  const [activeTab, setActiveTab] = useState('movies')
  const [error, setError] = useState(null)
  
  // Movies state
  const [movies, setMovies] = useState([])
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    duration: '',
    description: '',
    posterUrl: ''
  })
  const [editingMovie, setEditingMovie] = useState(null)
  
  // Theaters state
  const [theaters, setTheaters] = useState([])
  const [newTheater, setNewTheater] = useState({
    name: '',
    location: '',
    seatingCapacity: '',
    amenities: ''
  })
  const [editingTheater, setEditingTheater] = useState(null)
  
  // Showtimes state
  const [showtimes, setShowtimes] = useState([])
  const [newShowtime, setNewShowtime] = useState({
    movieId: '',
    theaterId: '',
    time: '',
    price: ''
  })
  const [editingShowtime, setEditingShowtime] = useState(null)

  useEffect(() => {
    if (!isAdmin) return
    
    const loadData = async () => {
      try {
        const [movieData, theaterData, showtimeData] = await Promise.all([
          getMovies(),
          getTheaters(),
          getShowtimes()
        ])
        setMovies(movieData)
        setTheaters(theaterData)
        setShowtimes(showtimeData)
      } catch (err) {
        setError('Failed to load data')
        console.error(err)
      }
    }
    
    loadData()
  }, [isAdmin])

  if (!user) return <div>Please login to access admin panel</div>
  if (!isAdmin) return <div>You don't have admin privileges</div>

  // Movie CRUD operations
  const handleAddMovie = async (e) => {
    e.preventDefault()
    try {
      const addedMovie = await addMovie(newMovie)
      setMovies([...movies, addedMovie])
      setNewMovie({
        title: '',
        genre: '',
        duration: '',
        description: '',
        posterUrl: ''
      })
    } catch (error) {
      console.error('Failed to add movie:', error)
    }
  }

  const handleUpdateMovie = async (e) => {
    e.preventDefault()
    try {
      const updatedMovie = await updateMovie(editingMovie.id, editingMovie)
      setMovies(movies.map(m => m.id === updatedMovie.id ? updatedMovie : m))
      setEditingMovie(null)
    } catch (error) {
      console.error('Failed to update movie:', error)
    }
  }

  const handleDeleteMovie = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return
    try {
      await deleteMovie(id)
      setMovies(movies.filter(m => m.id !== id))
    } catch (error) {
      console.error('Failed to delete movie:', error)
    }
  }

  // Theater CRUD operations
  const handleAddTheater = async (e) => {
    e.preventDefault()
    try {
      const addedTheater = await addTheater(newTheater)
      setTheaters([...theaters, addedTheater])
      setNewTheater({
        name: '',
        location: '',
        seatingCapacity: '',
        amenities: ''
      })
    } catch (error) {
      console.error('Failed to add theater:', error)
    }
  }

  const handleUpdateTheater = async (e) => {
    e.preventDefault()
    try {
      const updatedTheater = await updateTheater(editingTheater.id, editingTheater)
      setTheaters(theaters.map(t => t.id === updatedTheater.id ? updatedTheater : t))
      setEditingTheater(null)
    } catch (error) {
      console.error('Failed to update theater:', error)
    }
  }

  const handleDeleteTheater = async (id) => {
    if (!window.confirm('Are you sure you want to delete this theater?')) return
    try {
      await deleteTheater(id)
      setTheaters(theaters.filter(t => t.id !== id))
    } catch (error) {
      console.error('Failed to delete theater:', error)
    }
  }

  // Showtime CRUD operations
  const handleAddShowtime = async (e) => {
    e.preventDefault()
    try {
      const addedShowtime = await addShowtime({
        ...newShowtime,
        movieId: parseInt(newShowtime.movieId),
        theaterId: parseInt(newShowtime.theaterId),
        price: parseFloat(newShowtime.price)
      })
      setShowtimes([...showtimes, addedShowtime])
      setNewShowtime({
        movieId: '',
        theaterId: '',
        time: '',
        price: ''
      })
    } catch (error) {
      console.error('Failed to add showtime:', error)
    }
  }

  const handleUpdateShowtime = async (e) => {
    e.preventDefault()
    try {
      const updatedShowtime = await updateShowtime(editingShowtime.id, {
        ...editingShowtime,
        movieId: parseInt(editingShowtime.movieId),
        theaterId: parseInt(editingShowtime.theaterId),
        price: parseFloat(editingShowtime.price)
      })
      setShowtimes(showtimes.map(s => s.id === updatedShowtime.id ? updatedShowtime : s))
      setEditingShowtime(null)
    } catch (error) {
      console.error('Failed to update showtime:', error)
    }
  }

  const handleDeleteShowtime = async (id) => {
    if (!window.confirm('Are you sure you want to delete this showtime?')) return
    try {
      await deleteShowtime(id)
      setShowtimes(showtimes.filter(s => s.id !== id))
    } catch (error) {
      console.error('Failed to delete showtime:', error)
    }
  }

  if (!user) return <div className="admin-message">Please login to access admin panel</div>
  if (!isAdmin) return <div className="admin-message">You don't have admin privileges</div>

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'movies' ? 'active' : ''}
          onClick={() => setActiveTab('movies')}
        >
          Movies
        </button>
        <button 
          className={activeTab === 'theaters' ? 'active' : ''}
          onClick={() => setActiveTab('theaters')}
        >
          Theaters
        </button>
        <button 
          className={activeTab === 'showtimes' ? 'active' : ''}
          onClick={() => setActiveTab('showtimes')}
        >
          Showtimes
        </button>
      </div>
      
      <div className="admin-content">
        {/* Movies Tab */}
        {activeTab === 'movies' && (
          <div className="movies-tab">
            <h2>Movies Management</h2>
            
            {!editingMovie ? (
              <form onSubmit={handleAddMovie} className="admin-form">
                <h3>Add New Movie</h3>
                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <input 
                    type="text" 
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({...newMovie, genre: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input 
                    type="number" 
                    value={newMovie.duration}
                    onChange={(e) => setNewMovie({...newMovie, duration: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Poster URL</label>
                  <input 
                    type="url" 
                    value={newMovie.posterUrl}
                    onChange={(e) => setNewMovie({...newMovie, posterUrl: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Movie</button>
              </form>
            ) : (
              <form onSubmit={handleUpdateMovie} className="admin-form">
                <h3>Edit Movie</h3>
                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    value={editingMovie.title}
                    onChange={(e) => setEditingMovie({...editingMovie, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <input 
                    type="text" 
                    value={editingMovie.genre}
                    onChange={(e) => setEditingMovie({...editingMovie, genre: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input 
                    type="number" 
                    value={editingMovie.duration}
                    onChange={(e) => setEditingMovie({...editingMovie, duration: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    value={editingMovie.description}
                    onChange={(e) => setEditingMovie({...editingMovie, description: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Poster URL</label>
                  <input 
                    type="url" 
                    value={editingMovie.posterUrl}
                    onChange={(e) => setEditingMovie({...editingMovie, posterUrl: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn">Update Movie</button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => setEditingMovie(null)}
                >
                  Cancel
                </button>
              </form>
            )}
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie.id}>
                    <td>
                      {movie.posterUrl && (
                        <img src={movie.posterUrl} alt={movie.title} className="movie-poster-thumb" />
                      )}
                    </td>
                    <td>{movie.title}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.duration} mins</td>
                    <td>
                      <button 
                        className="btn"
                        onClick={() => setEditingMovie(movie)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDeleteMovie(movie.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Theaters Tab */}
        {activeTab === 'theaters' && (
          <div className="theaters-tab">
            <h2>Theaters Management</h2>
            
            {!editingTheater ? (
              <form onSubmit={handleAddTheater} className="admin-form">
                <h3>Add New Theater</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={newTheater.name}
                    onChange={(e) => setNewTheater({...newTheater, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    value={newTheater.location}
                    onChange={(e) => setNewTheater({...newTheater, location: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Seating Capacity</label>
                  <input 
                    type="number" 
                    value={newTheater.seatingCapacity}
                    onChange={(e) => setNewTheater({...newTheater, seatingCapacity: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amenities</label>
                  <input 
                    type="text" 
                    value={newTheater.amenities}
                    onChange={(e) => setNewTheater({...newTheater, amenities: e.target.value})}
                    placeholder="e.g., Dolby Atmos, IMAX, Food Court"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Theater</button>
              </form>
            ) : (
              <form onSubmit={handleUpdateTheater} className="admin-form">
                <h3>Edit Theater</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={editingTheater.name}
                    onChange={(e) => setEditingTheater({...editingTheater, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    value={editingTheater.location}
                    onChange={(e) => setEditingTheater({...editingTheater, location: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Seating Capacity</label>
                  <input 
                    type="number" 
                    value={editingTheater.seatingCapacity}
                    onChange={(e) => setEditingTheater({...editingTheater, seatingCapacity: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amenities</label>
                  <input 
                    type="text" 
                    value={editingTheater.amenities}
                    onChange={(e) => setEditingTheater({...editingTheater, amenities: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn">Update Theater</button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => setEditingTheater(null)}
                >
                  Cancel
                </button>
              </form>
            )}
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Amenities</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {theaters.map(theater => (
                  <tr key={theater.id}>
                    <td>{theater.name}</td>
                    <td>{theater.location}</td>
                    <td>{theater.seatingCapacity}</td>
                    <td>{theater.amenities}</td>
                    <td>
                      <button 
                        className="btn"
                        onClick={() => setEditingTheater(theater)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDeleteTheater(theater.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Showtimes Tab */}
        {activeTab === 'showtimes' && (
          <div className="showtimes-tab">
            <h2>Showtimes Management</h2>
            
            {!editingShowtime ? (
              <form onSubmit={handleAddShowtime} className="admin-form">
                <h3>Add New Showtime</h3>
                <div className="form-group">
                  <label>Movie</label>
                  <select
                    value={newShowtime.movieId}
                    onChange={(e) => setNewShowtime({...newShowtime, movieId: e.target.value})}
                    required
                  >
                    <option value="">Select Movie</option>
                    {movies.map(movie => (
                      <option key={movie.id} value={movie.id}>{movie.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Theater</label>
                  <select
                    value={newShowtime.theaterId}
                    onChange={(e) => setNewShowtime({...newShowtime, theaterId: e.target.value})}
                    required
                  >
                    <option value="">Select Theater</option>
                    {theaters.map(theater => (
                      <option key={theater.id} value={theater.id}>{theater.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Show Time</label>
                  <input 
                    type="datetime-local" 
                    value={newShowtime.time}
                    onChange={(e) => setNewShowtime({...newShowtime, time: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    value={newShowtime.price}
                    onChange={(e) => setNewShowtime({...newShowtime, price: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Showtime</button>
              </form>
            ) : (
              <form onSubmit={handleUpdateShowtime} className="admin-form">
                <h3>Edit Showtime</h3>
                <div className="form-group">
                  <label>Movie</label>
                  <select
                    value={editingShowtime.movieId}
                    onChange={(e) => setEditingShowtime({...editingShowtime, movieId: e.target.value})}
                    required
                  >
                    <option value="">Select Movie</option>
                    {movies.map(movie => (
                      <option key={movie.id} value={movie.id}>{movie.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Theater</label>
                  <select
                    value={editingShowtime.theaterId}
                    onChange={(e) => setEditingShowtime({...editingShowtime, theaterId: e.target.value})}
                    required
                  >
                    <option value="">Select Theater</option>
                    {theaters.map(theater => (
                      <option key={theater.id} value={theater.id}>{theater.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Show Time</label>
                  <input 
                    type="datetime-local" 
                    value={editingShowtime.time}
                    onChange={(e) => setEditingShowtime({...editingShowtime, time: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    value={editingShowtime.price}
                    onChange={(e) => setEditingShowtime({...editingShowtime, price: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn">Update Showtime</button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => setEditingShowtime(null)}
                >
                  Cancel
                </button>
              </form>
            )}
            
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Theater</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {showtimes.map(showtime => {
                  const movie = movies.find(m => m.id === showtime.movieId)
                  const theater = theaters.find(t => t.id === showtime.theaterId)
                  return (
                    <tr key={showtime.id}>
                      <td>{movie?.title || 'Unknown'}</td>
                      <td>{theater?.name || 'Unknown'}</td>
                      <td>{new Date(showtime.time).toLocaleString()}</td>
                      <td>${showtime.price.toFixed(2)}</td>
                      <td>
                        <button 
                          className="btn"
                          onClick={() => setEditingShowtime(showtime)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleDeleteShowtime(showtime.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin