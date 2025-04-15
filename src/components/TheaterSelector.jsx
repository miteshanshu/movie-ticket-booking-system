const TheaterSelector = ({ theaters, onSelect, selectedTheater }) => {
    return (
      <div className="theater-selector">
        <h3>Select Theater</h3>
        <div className="theater-grid">
          {theaters.map((theater) => (
            <div
              key={theater.id}
              className={`theater-card ${
                selectedTheater?.id === theater.id ? 'selected' : ''
              }`}
              onClick={() => onSelect(theater)}
            >
              <h4>{theater.name}</h4>
              <p>{theater.location}</p>
              <p>Capacity: {theater.seatingCapacity}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default TheaterSelector