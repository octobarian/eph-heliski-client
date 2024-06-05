<template>
    <div id="zaui_page">
        <div style="margin-bottom: 12px; padding-bottom: 12px">
            <button style="margin-right: 20px;" @click="getZauiPing">Ping Zaui</button>
            <button @click="getBookingByDay">Get All Bookings Object</button>
        </div>
        <div style="margin-bottom: 12px; padding-bottom: 12px">
            <label for="manifestDate">Select Date:</label>
            <input type="date" id="manifestDate" v-model="selectedDate" @change="handleDateChange">
            <button @click="getManifestByDate">Get Manifest By Date</button>
            <button @click="testZauiMapping">Test Zaui Mapping</button>
        </div>
        <div style="margin-bottom: 12px; padding-bottom: 12px">
            <button @click="getGuestProfile">Test Get Guest Profile</button>
        </div>
        <div style="margin-bottom: 12px; padding-bottom: 12px">
            <label for="bookingNumber">Booking Number:</label>
            <input type="text" id="bookingNumber" v-model="bookingNumber">
            <button @click="getBookingByNumber">Get Booking By Number</button>
        </div>
        <div id="zaui_data_box" v-html="zaui_object_data"></div>
    </div>
</template>

<script>
import ZauiDataService from "../services/ZauiDataService";

export default {
    name: "zaui",
    data() {
        return {
            submitted: false,
            zaui_object_data: "gathered data will show up here...",
            selectedDate: this.getStoredDate() || new Date().toISOString().substr(0, 10), // Default to today's date
            bookingNumber: '' // Add bookingNumber to the data properties
        };
    },
    methods: {
        getStoredDate() {
            return sessionStorage.getItem('selectedDate');
        },
        storeDate(date) {
            sessionStorage.setItem('selectedDate', date);
        },
        handleDateChange() {
            this.storeDate(this.selectedDate);
        },
        getZauiPing() {
            ZauiDataService.ping()
                .then(response => {
                    this.zaui_object_data = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        testZauiMapping() {
            ZauiDataService.checkZauiMapping(new Date(this.selectedDate))
                .then(response => {
                    if (response.data.length === 1 && response.data[0].startsWith("No")) {
                        this.zaui_object_data = `<div style="background-color: red; color: white; padding: 10px;">${response.data[0]}</div>`;
                    } else {
                        let formattedData = "<ul style='list-style-type: none; padding: 0;'>";
                        response.data.forEach(item => {
                            const parts = item.split(" ");
                            const bookingNumber = parts[3];
                            const reservationId = parts[parts.length - 1];
                            const isReservationFound = !item.includes("No matching reservation found");
                            const backgroundColor = isReservationFound ? "lightgreen" : "lightcoral";
                            const textColor = "black";
                            const message = isReservationFound 
                                            ? `Booking Number: <strong>${bookingNumber}</strong> - Reservation ID: <strong>${reservationId}</strong>` 
                                            : `Booking Number: <strong>${bookingNumber}</strong> - No matching reservation found`;
                            formattedData += `<li style="background-color: ${backgroundColor}; color: ${textColor}; padding: 5px; margin-bottom: 2px;">${message}</li>`;
                        });
                        formattedData += "</ul>";
                        this.zaui_object_data = formattedData;
                    }
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getBookingByDay() {
            ZauiDataService.getBookingByDay(new Date(this.selectedDate))
                .then(response => {
                    this.zaui_object_data = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getManifestByDate() {
            ZauiDataService.getManifestByDay(new Date(this.selectedDate))
                .then(response => {
                    const numberOfObjects = Array.isArray(response.data) ? response.data.length : 0;
                    this.zaui_object_data = `Finished Mapping, ${numberOfObjects} objects found. Now run Test Zaui Mapping.`;
                })
                .catch(e => {
                    console.log(e);
                    this.zaui_object_data = "Error: Failed to get the manifest data.";
                });
        },
        getGuestProfile() {
            const booking = {
                bookingNumber: "16322",
                guestFirstName: "Colin",
                guestLastName: "Wiseman",
                mobile: "4165602257",
                email: "wisecolin21@gmail.com"
            };
            ZauiDataService.getGuestProfile(booking)
                .then(response => {
                    this.zaui_object_data = response;
                })
                .catch(error => {
                    console.error("Error getting guest profile:", error);
                });
        },
        getBookingByNumber() {
            ZauiDataService.getBookingByNumber(this.bookingNumber)
                .then(response => {
                    this.zaui_object_data = JSON.stringify(response.data, null, 2); // Pretty print JSON
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.storeDate(this.selectedDate);
    }
}
</script>

<style type="css">
#zaui_data_box {
    width: 60%;
    margin: auto;
    margin-top: 30px;
    border: 1px;
    border-color: black;
    border-style: dashed;
}
</style>
