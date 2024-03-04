import http from "../http-common";

class ReservationDataService {
  getAll() {
    return http.get("/reservations"); // Adjust the endpoint as needed
  }

  //Search based on user query in the searchbox
  search(query) {
    return http.get(`/reservations/search?q=${query}`);
  }

  get(id) {
    return http.get(`/reservations/id/${id}`); // Adjust the endpoint as needed
  }

  findByGroupCode(groupCode) {
    return http.get(`/reservations?groupCode=${groupCode}`); // Adjust the endpoint as needed
  }

  findByPersonId(personId) {
    return http.get(`/reservations?personId=${personId}`); // Adjust the endpoint as needed
  }

  findByDate(date) {
    return http.get(`/reservations/unassigned/${date}`);
}
}

export default new ReservationDataService();
