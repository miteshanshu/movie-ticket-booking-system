const movies = [
    { id: 1, title: 'Avengers: Endgame', genre: 'Action', duration: 181, posterUrl: 'https://example.com/poster1.jpg' },
    { id: 2, title: 'The Shawshank Redemption', genre: 'Drama', duration: 142, posterUrl: 'https://example.com/poster2.jpg' },
    // Add more movies
  ]
  
  const theaters = [
    { id: 1, name: 'Cineplex Downtown', location: '123 Main St', seatingCapacity: 150 },
    { id: 2, name: 'AMC City Center', location: '456 Center Ave', seatingCapacity: 200 },
    // Add more theaters
  ]
  
  const showtimes = [
    { id: 1, movieId: 1, theaterId: 1, time: '2023-06-15T18:00:00', price: 12.99 },
    { id: 2, movieId: 1, theaterId: 2, time: '2023-06-15T20:30:00', price: 14.99 },
    // Add more showtimes
  ]
  
  // Mock API functions
  export const getMovies = () => Promise.resolve(movies)
  export const getTheaters = () => Promise.resolve(theaters)
  export const getShowtimes = (movieId, theaterId) => 
    Promise.resolve(showtimes.filter(st => 
      st.movieId == movieId && (!theaterId || st.theaterId == theaterId)
    ))
  
  export const getSeatAvailability = (showtimeId) => {
    // Generate random seat availability
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
    console.log(`Booking seats ${seats.join(', ')} for showtime ${showtimeId}`)
    return Promise.resolve({ success: true, bookingId: Math.floor(Math.random() * 10000) })
  }