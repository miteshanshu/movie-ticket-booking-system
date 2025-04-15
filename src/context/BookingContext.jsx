import { createContext, useState, useContext } from 'react'

export const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedTheater, setSelectedTheater] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookingStep, setBookingStep] = useState(1)

  const resetBooking = () => {
    setSelectedMovie(null)
    setSelectedTheater(null)
    setSelectedShowtime(null)
    setSelectedSeats([])
    setBookingStep(1)
  }

  return (
    <BookingContext.Provider
      value={{
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
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

// Custom hook for easier consumption
export function useBookingContext() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBookingContext must be used within a BookingProvider')
  }
  return context
}