import http from "../http-common";

class StaffDataService {
  getAll() {
    return http.get("/staff");
  }

  get(id) {
    return http.get(`/staff/id/${id}`);
  }

  create(data) {
    return http.post("/staff", data);
  }

  update(id, data) {
    return http.put(`/staff/id/${id}`, data);
  }

  delete(id) {
    return http.delete(`/staff/id/${id}`);
  }

  findByName(name) {
    return http.get(`/staff?name=${name}`);
  }

  //returns a staffid by searching for an email in the staffdb
  findByEmail(email) {
    return http.get(`/staff/email/${email}`);
  }
  
  //fetch the list of staff jobs from the job table
  fetchJobs() {
    return http.get("/staff/jobs");
  }
}

export default new StaffDataService();
