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
    
    // Additional methods for other equipment types can be added here as needed
}

export default new EquipmentDataService();
