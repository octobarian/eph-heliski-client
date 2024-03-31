import axios from "axios";
// import CryptoJS from "crypto-js";

// // Encrypt the server secret
// const encryptedSecret = CryptoJS.AES.encrypt(process.env.VUE_APP_SERVER_SECRET, process.env.VUE_APP_SERVER_ENCRYPTION_KEY).toString();

const http = axios.create({
  baseURL: `${process.env.VUE_APP_SERVERIP}:${process.env.VUE_APP_SERVERPORT}`,
  headers: {
    "Content-type": "application/json",
    // "cust-server-secret": `${encryptedSecret}`
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
