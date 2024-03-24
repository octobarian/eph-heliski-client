<template>
    <div id="zaui_page">
        <button style="margin-right: 20px;" @click="getZauiPing">Ping Zaui</button>
        <button @click="getBookingByDay">Get All Bookings Object</button>
        <button @click="getTodaysManifest">Get Today's Manifest</button>
        <button @click="getGuestProfile">Test Get Guest Profile</button>
        <button @click="testZauiMapping">Test Zaui Mapping</button>
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
        };
    },
    methods: {
        //method for Pinging the Zaui server
        getZauiPing(){
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
            var today = new Date();
            ZauiDataService.checkZauiMapping(today)
                .then(response => {
                    // Format the array of strings into an HTML string
                    let formattedData = "<ul style='list-style-type: none; padding: 0;'>";
                    response.data.forEach(item => {
                        // Correctly extract booking number and reservation ID from the response string
                        const parts = item.split(" ");
                        const bookingNumber = parts[3]; // Assuming 'bookingNumber' is the fourth word in the string
                        const reservationId = parts[parts.length - 1]; // Assuming 'id' is the last word in the string
                        
                        // Determine if the reservation was found or not
                        const isReservationFound = !item.includes("No matching reservation found");

                        // Set the background color based on whether the reservation was found
                        const backgroundColor = isReservationFound ? "lightgreen" : "lightcoral"; // lightcoral for better readability with black text
                        const textColor = isReservationFound ? "black" : "black"; // Ensuring text color is set for readability
                        
                        // Format the message based on whether a reservation ID is present
                        const message = isReservationFound 
                                        ? `Booking Number: <strong>${bookingNumber}</strong> - Reservation ID: <strong>${reservationId}</strong>` 
                                        : `Booking Number: <strong>${bookingNumber}</strong> - No matching reservation found`;

                        // Add to the HTML string with styled backgrounds
                        formattedData += `<li style="background-color: ${backgroundColor}; color: ${textColor}; padding: 5px; margin-bottom: 2px;">${message}</li>`;
                    });
                    formattedData += "</ul>";

                    // Set the formatted HTML as zaui_object_data to render it in the template
                    this.zaui_object_data = formattedData;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        getBookingByDay(){
            var today = new Date();
            ZauiDataService.getBookingByDay(today)
                .then(response => {
                    this.zaui_object_data = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        getTodaysManifest(){
            ZauiDataService.getManifestByDay(new Date())
                .then(response => {
                    // Process and map the data for display (to be implemented in the next steps)
                    this.zaui_object_data = this.mapManifestData(response.data);
                    console.log(this.zaui_object_data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

         // Placeholder for the method to map manifest data (to be implemented)
         mapManifestData(manifestData) {
            // Mapping logic will be implemented here in the next steps
            return manifestData;
        },
        
        getGuestProfile() {
        // Create a placeholder booking object
            const booking = {
            bookingNumber: "16322",
            guestFirstName: "Colin",
            guestLastName: "Wiseman",
            mobile: "4165602257",
            email: "wisecolin21@gmail.com"
        };

        // Call the service and pass the booking object
        ZauiDataService.getGuestProfile(booking)
            .then(response => {
                this.zaui_object_data = response;
            // Handle the response data
            })
            .catch(error => {
            console.error("Error getting guest profile:", error);
            // Handle the error
            });
        },
    }
}
</script>

<style type="css">
#zaui_data_box{
    width: 60%;
    margin: auto;
    margin-top: 30px;
    border: 1px;
    border-color: black;
    border-style: dashed;
}
</style>