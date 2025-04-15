// Mock data
const movies = [
  { 
    id: 1, 
    title: 'Avengers: Endgame', 
    genre: 'Action', 
    duration: 181, 
    posterUrl: 'https://d3ddkgxe55ca6c.cloudfront.net/assets/t1496805007/a/c1/10/145396-ml-914024.jpg',
    description: 'The epic conclusion to the Infinity Saga' 
  },
  { 
    id: 2, 
    title: 'The Shawshank Redemption', 
    genre: 'Drama', 
    duration: 142, 
    posterUrl: 'https://m.media-amazon.com/images/I/71715eBi1sL._SY879_.jpghttps://example.com/poster2.jpg',
    description: 'Two imprisoned men bond over a number of years' 
  }
]

const theaters = [
  { 
    id: 1, 
    name: 'Cineplex Downtown', 
    location: '123 Main St', 
    seatingCapacity: 150,
    amenities: 'Dolby Atmos, Recliner Seats' 
  },
  { 
    id: 2, 
    name: 'AMC City Center', 
    location: '456 Center Ave', 
    seatingCapacity: 200,
    amenities: 'IMAX, Food Court' 
  }
]

const showtimes = [
  { 
    id: 1, 
    movieId: 1, 
    theaterId: 1, 
    time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    price: 12.99 
  },
  { 
    id: 2, 
    movieId: 1, 
    theaterId: 2, 
    time: new Date(Date.now() + 90000000).toISOString(), // Tomorrow + 1 hour
    price: 14.99 
  }
]

// CRUD operations for Movies
export const getMovies = () => Promise.resolve(movies)
export const addMovie = (movie) => {
  const newMovie = { ...movie, id: movies.length + 1 }
  movies.push(newMovie)
  return Promise.resolve(newMovie)
}
export const updateMovie = (id, updates) => {
  const index = movies.findIndex(m => m.id === id)
  if (index >= 0) {
    movies[index] = { ...movies[index], ...updates }
    return Promise.resolve(movies[index])
  }
  return Promise.reject(new Error('Movie not found'))
}
export const deleteMovie = (id) => {
  const index = movies.findIndex(m => m.id === id)
  if (index >= 0) {
    movies.splice(index, 1)
    return Promise.resolve(true)
  }
  return Promise.reject(new Error('Movie not found'))
}

// CRUD operations for Theaters
export const getTheaters = () => Promise.resolve(theaters)
export const addTheater = (theater) => {
  const newTheater = { ...theater, id: theaters.length + 1 }
  theaters.push(newTheater)
  return Promise.resolve(newTheater)
}
export const updateTheater = (id, updates) => {
  const index = theaters.findIndex(t => t.id === id)
  if (index >= 0) {
    theaters[index] = { ...theaters[index], ...updates }
    return Promise.resolve(theaters[index])
  }
  return Promise.reject(new Error('Theater not found'))
}
export const deleteTheater = (id) => {
  const index = theaters.findIndex(t => t.id === id)
  if (index >= 0) {
    theaters.splice(index, 1)
    return Promise.resolve(true)
  }
  return Promise.reject(new Error('Theater not found'))
}

// CRUD operations for Showtimes
export const getShowtimes = (movieId, theaterId) => 
  Promise.resolve(
    showtimes.filter(st => 
      st.movieId == movieId && 
      (!theaterId || st.theaterId == theaterId)
    )
  )
export const addShowtime = (showtime) => {
  const newShowtime = { ...showtime, id: showtimes.length + 1 }
  showtimes.push(newShowtime)
  return Promise.resolve(newShowtime)
}
export const updateShowtime = (id, updates) => {
  const index = showtimes.findIndex(s => s.id === id)
  if (index >= 0) {
    showtimes[index] = { ...showtimes[index], ...updates }
    return Promise.resolve(showtimes[index])
  }
  return Promise.reject(new Error('Showtime not found'))
}
export const deleteShowtime = (id) => {
  const index = showtimes.findIndex(s => s.id === id)
  if (index >= 0) {
    showtimes.splice(index, 1)
    return Promise.resolve(true)
  }
  return Promise.reject(new Error('Showtime not found'))
}

// Seat and Booking operations
export const getSeatAvailability = (showtimeId) => {
  const seats = []
  for (let i = 1; i <= 50; i++) {
    seats.push({
      id: i,
      number: `A${i}`,
      status: Math.random() > 0.3 ? 'available' : 'booked'
    })
  }
  return Promise.resolve(seats)
}

export const bookSeats = (showtimeId, seats) => {
  console.log(`Mock booking: seats ${seats.join(', ')} for showtime ${showtimeId}`)
  return Promise.resolve({ 
    success: true, 
    bookingId: Math.floor(Math.random() * 10000),
    seats,
    showtimeId
  })
}

export const getBookings = () => {
  // Mock some booking history
  return Promise.resolve([
    {
      id: 1,
      movie: movies[0],
      theater: theaters[0],
      showtime: showtimes[0],
      seats: ['A1', 'A2'],
      total: 25.98,
      status: 'confirmed'
    }
  ])
}