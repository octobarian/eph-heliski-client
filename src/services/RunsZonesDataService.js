import http from "../http-common";

class RunsZonesDataService {
    // Runs
    getAllRuns() {
        return http.get("/runs-zones/run");
    }

    getRunsByZone(zoneId) {
        return http.get(`/runs-zones/run/by-zone/${zoneId}`);
    }

    createRun(data) {
        return http.post("/runs-zones/run", data);
    }

    updateRun(id, data) {
        return http.put(`/runs-zones/run/${id}`, data);
    }

    deleteRun(id) {
        return http.delete(`/runs-zones/run/${id}`);
    }

    // Zones
    getAllZones() {
        return http.get("/runs-zones/zone");
    }

    createZone(data) {
        return http.post("/runs-zones/zone", data);
    }

    updateZone(id, data) {
        return http.put(`/runs-zones/zone/${id}`, data);
    }

    deleteZone(id) {
        return http.delete(`/runs-zones/zone/${id}`);
    }

    // Trip Runs
    getTripRuns(tripIds) {
        return http.post("/runs-zones/triprun/by-trips", { tripIds });
    }

    createTripRun(data) {
        return http.post("/runs-zones/triprun", data);
    }

    deleteTripRun(id) {
        return http.delete(`/runs-zones/triprun/${id}`);
    }
}

export default new RunsZonesDataService();
