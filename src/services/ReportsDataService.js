import http from "../http-common"; // Adjust based on your Axios setup

class ReportsDataService {
    getDailyTripsReportData(date) {
        // Use the date parameter in the API request
        return http.get(`/reports/dailyTripsReport?date=${date}`);
      }
    getMedicalReportData(date) {
        // Fetch data for the medical report
        return http.get(`/reports/medicalReport?date=${date}`);
    }
    getLunchReportData(date) {
        // Fetch data for the medical report
        return http.get(`/reports/lunchReport?date=${date}`);
    }
}

export default new ReportsDataService();
