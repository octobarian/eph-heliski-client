import axios from "axios";

// Use environment variable for the base URL
const http = axios.create({
  baseURL: process.env.VUE_APP_ZAUI_API_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

class ZauiDataService {
    // Service methods remain the same
    ping() {
        return http.post("/zaui/zaui-ping");
    }
    getBookingByDay(date){
        console.log(date);
        var testDate = new Date();
        testDate = testDate.toISOString().slice(0, 10);
        return http.get(`/zaui/get-booking-by-day?date=${testDate}`);
    }
    getManifestByDay(date){
      var testDate = date.toISOString().slice(0, 10);
      return http.get(`/zaui/get-date-manifest?date=${testDate}`);
    }

    checkZauiMapping(date){
      var testDate = date.toISOString().slice(0, 10);
      return http.post(`/zaui/check-zaui-mapping?date=${testDate}`);
    }

    getStatuses(interval) {
      return http.get(`/zaui/zaui-statuses-${interval}`);
    }

    getGuestProfile = (booking) => {
      return http.post(`/zaui/get-guest-profile-by-booking`, booking);
    };
}

export default new ZauiDataService();
