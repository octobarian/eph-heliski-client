import http from "../http-common";

class WildlifeDataService {
    create(data) {
        return http.post("/wildlife", data);
    }

    getByDateAndTripGroup(date, tripGroupId) {
        return http.get(`/wildlife/${date}/${tripGroupId}`);
    }

    delete(id) {
        return http.delete(`/wildlife/${id}`);
    }
}

export default new WildlifeDataService();
