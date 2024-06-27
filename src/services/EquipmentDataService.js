import http from "../http-common";

class EquipmentDataService {
    // Beacons
    getAllBeacons() {
        return http.get("/equipment/beacon");
    }

    getBeacon(id) {
        return http.get(`/equipment/beacon/${id}`);
    }

    createBeacon(data) {
        return http.post("/equipment/beacon", data);
    }

    updateBeacon(id, data) {
        return http.put(`/equipment/beacon/${id}`, data);
    }

    deleteBeacon(id) {
        return http.delete(`/equipment/beacon/${id}`);
    }

    deactivateBeacon(id) {
        return http.put(`/equipment/beacon/deactivate/${id}`);
    }

    reactivateBeacon(beaconId) {
        return http.put(`/equipment/beacon/activate/${beaconId}`);
    }
  
    unlinkBeaconFromTrip(id) {
        return http.put(`/equipment/beacon/unlink/${id}`);
    }

    assignBeaconToTripClient(beaconId, tripClientId) {
        return http.put(`/equipment/beacon/assign/${beaconId}`, { tripClientId });
    }
    
    // Helicopters
    createHelicopter(data) {
        return http.post("/equipment/helicopter", data);
    }

    getHelicopters() {
        return http.get("/equipment/helicopter");
    }

    deleteHelicopter(id) {
        return http.delete(`/equipment/helicopter/${id}`);
    }

    editHelicopter(id, data) {
        return http.put(`/equipment/helicopter/${id}`, data);
    }

}

export default new EquipmentDataService();
