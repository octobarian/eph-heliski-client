import http from "../http-common";

class ClientsDataService {
  getAll(params = {}) {
    return http.get("/clients", { params });
  }
  
  get(id) {
    return http.get(`/clients/id/${id}`);
  }

  create(data) {
    return http.post("/clients", data);
  }

  update(id, data) {
    return http.put(`/clients/id/${id}`, data);
  }

  updateWeight(personid, data) {
    return http.put(`/clients/weight/${personid}`, data);
  }

  delete(id) {
    return http.delete(`/clients/id/${id}`);
  }

  findByName(name) {
    return http.get(`/clients/name?name=${name}`);
  }

  fetchClientId(personId) {
    return http.get(`/clients/byperson/${personId}`);
  }
}

export default new ClientsDataService();
