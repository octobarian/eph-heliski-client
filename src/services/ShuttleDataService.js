import http from '../http-common';

class ShuttleDataService {
  getAllShuttles() {
    return http.get('/equipment/shuttle');
  }

  createShuttle(data) {
    return http.post('/equipment/shuttle', data);
  }

  deleteShuttle(id) {
    return http.delete(`/equipment/shuttle/${id}`);
  }

  editShuttle(id, data) {
    return http.put(`/equipment/shuttle/${id}`, data);
  }

  updateGroupShuttle(tripId, groupId, clientId, data) {
    return http.put(`/trips/${tripId}/groups/${groupId}/clients/${clientId}/shuttle`, data);
  }

  getTripShuttles(tripIds, clientIds) {
    return http.post('/trips/shuttles', { tripIds, clientIds });
  }
}

export default new ShuttleDataService();
