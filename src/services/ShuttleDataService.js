import http from '../http-common';

class ShuttleDataService {
  getAllShuttles() {
    return http.get('/shuttles');
  }

  updateGroupShuttle(tripId, groupId, clientId, data) {
    return http.put(`/trips/${tripId}/groups/${groupId}/clients/${clientId}/shuttle`, data);
  }
}

export default new ShuttleDataService();
