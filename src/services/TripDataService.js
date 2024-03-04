import http from "../http-common";

class TripDataService {
  getAll() {
    return http.get("/trips");
  }

  get(id) {
    return http.get(`/trips/id/${id}`);
  }

  update(id, data) {
    return http.put(`/trips/id/${id}`, data);
  }

  createTrip(data) {
    return http.post("/trips", data);
  }

  delete(id) {
    return http.delete(`/trips/id/${id}`);
  }

  // Add other methods as needed, like fetching specific trip details

  // Method to fetch guides
  fetchGuides() {
    return http.get("/staff/job/2");
  }

  // Method to fetch pilots (jobid 1 for pilots)
  fetchPilots() {
    return http.get("/staff/job/1");
  }

  // Method to fetch helicopters
  fetchHelicopters() {
    return http.get("/trips/helicopters");
  }

  //Get All Trips by a certain day (used in admin dashboard)
  fetchTripsByDate(date) {
    return http.get(`/trips/date/${date}`);
  }

  //fetch the trip that belongs to a staff via the date selected
  findByGuideAndDate(staffId, date) {
    return http.get(`/trips/findByGuideAndDate/${staffId}/${date}`);
  }

  //assign a reservationid to a trip in the tripclient db
  assignReservationToTrip(data) {
    return http.post('/trips/assign', data); // Adjust the URL as needed
  }

  removeReservationFromTrip(tripId, reservationId) {
    const data = {
      tripId: tripId,
      reservationId: reservationId
    };
    return http.post('/trips/removereservation', data);
  }
  
}

export default new TripDataService();
