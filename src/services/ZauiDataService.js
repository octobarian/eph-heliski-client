import axios from "axios";

const http = axios.create({
  //TODO: Adjust this to work on .env
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});

class ZauiDataService {
    ping() {
      //pings the status of Zaui api, will return "pong" when its okay
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

    getStatuses(interval) {
      return http.get(`/zaui/zaui-statuses-${interval}`);
    }

    getGuestProfile = (booking) => {
      return http.post(`/zaui/get-guest-profile-by-booking`, booking);
    };
}

export default new ZauiDataService();