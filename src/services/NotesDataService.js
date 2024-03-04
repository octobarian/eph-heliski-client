import http from "../http-common";

class NotesDataService {
    create(data) {
        return http.post("/notes", data);
    }

    getAll() {
        return http.get("/notes");
    }

    get(id) {
        return http.get(`/notes/${id}`);
    }

    getTripNote(tripId) {
        return http.get(`/notes/trip/${tripId}`);
    }

    update(id, data) {
        return http.put(`/notes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/notes/${id}`);
    }
}

export default new NotesDataService();
