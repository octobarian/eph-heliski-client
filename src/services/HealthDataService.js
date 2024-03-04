// eslint-disable-next-line no-unused-vars
import http from "../http-common";

class HealthDataService {
    //TODO Create method to fetch the severities table to be used when editing a health record
    fetchSeverities(){
        return http.get("/clients/severities");
    }
}

export default new HealthDataService();