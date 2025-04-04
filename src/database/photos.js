// Local database for storing photo information
const photos = {
  spottings: [],
  addSpotting(spotting) {
    this.spottings.push({
      id: Date.now(), // Unique ID based on timestamp
      ...spotting,
      date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    });
    this.saveToLocalStorage();
  },
  getSpottings() {
    return this.spottings;
  },
  getSpottingById(id) {
    return this.spottings.find(spotting => spotting.id === id);
  },
  filterSpottings(filters) {
    return this.spottings.filter(spotting => {
      const matchesAircraft = !filters.aircraftType || 
        spotting.aircraft.includes(filters.aircraftType);
      const matchesAirline = !filters.airline || 
        spotting.airline === filters.airline;
      const matchesLocation = !filters.location || 
        spotting.location.includes(filters.location);
      
      return matchesAircraft && matchesAirline && matchesLocation;
    });
  },
  loadFromLocalStorage() {
    const savedSpottings = localStorage.getItem('versaSpottings');
    if (savedSpottings) {
      this.spottings = JSON.parse(savedSpottings);
    }
  },
  saveToLocalStorage() {
    localStorage.setItem('versaSpottings', JSON.stringify(this.spottings));
  }
};

// Initialize by loading from localStorage
photos.loadFromLocalStorage();

export default photos; 