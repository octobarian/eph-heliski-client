import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_SERVERIP}:${process.env.VUE_APP_SERVERPORT}`,
  headers: {
    "Content-type": "application/json",
  }
});

class ZauiDataService {
    ping() {
        return http.post("/zaui/zaui-ping");
    }

    getBookingByDay(date) {
        var testDate = date.toISOString().slice(0, 10);
        return http.get(`/zaui/get-booking-by-day?date=${testDate}`);
    }

    getManifestByDay(date) {
        var testDate = date.toISOString().slice(0, 10);
        return http.get(`/zaui/get-date-manifest?date=${testDate}`);
    }

    checkZauiMapping(date) {
        var testDate = date.toISOString().slice(0, 10);
        return http.post(`/zaui/check-zaui-mapping?date=${testDate}`);
    }

    getStatuses(interval) {
        return http.get(`/zaui/zaui-statuses-${interval}`);
    }

    getGuestProfile(booking) {
        return http.post(`/zaui/get-guest-profile-by-booking`, booking);
    }

    getBookingByNumber(bookingNumber) {
        return http.post(`/zaui/get-booking-by-number`, { bookingNumber });
    }
}

export default new ZauiDataService();
