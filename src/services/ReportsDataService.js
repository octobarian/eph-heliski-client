import http from "../http-common"; // Adjust based on your Axios setup

class ReportsDataService {
    getDailyTripsReportData(date) {
        return http.get(`/reports/dailyTripsReport?date=${date}`);
    }
    getMedicalReportData(date) {
        return http.get(`/reports/medicalReport?date=${date}`);
    }
    getLunchReportData(date) {
        return http.get(`/reports/lunchReport?date=${date}`);
    }
    getDailyShuttleReportData(date) {
        return http.get(`/reports/dailyShuttleReport?date=${date}`);
    }
    getGroupListReportData(date) {
        // Fetch data for the group list report
        return http.get(`/reports/groupListReport?date=${date}`);
    }
    getDailyRentalReportData(date) {
        return http.get(`/reports/dailyRentalReport?date=${date}`);
    }
}

export default new ReportsDataService();
