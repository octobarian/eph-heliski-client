<template>
    <div id="zaui_page">
        <div style="margin-bottom: 12px; padding-bottom: 12px">
            <button style="margin-right: 20px;" @click="getZauiPing">Ping Zaui</button>
            <button @click="getBookingByDay">Get All Bookings Object</button>
        </div>
        <div style="margin-bottom: 12px; padding-bottom: 12px">
            <label for="manifestDate">Select Date:</label>
            <input type="date" id="manifestDate" v-model="selectedDate">
            <button @click="getManifestByDate">Get Manifest By Date</button>
            <button @click="testZauiMapping">Test Zaui Mapping</button>
        </div>
        <div style="margin-bottom: 12px; padding-bottom: 12px">
            <button @click="getGuestProfile">Test Get Guest Profile</button>
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
            selectedDate: new Date().toISOString().substr(0, 10) // Default to today's date
        };
    },
    methods: {
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
            ZauiDataService.checkZauiMapping(new Date(this.selectedDate))
                .then(response => {
                    // Check if the response contains the 'no manifest found' message
                    if (response.data.length === 1 && response.data[0].startsWith("No")) {
                        // Display a red background box with the message
                        this.zaui_object_data = `<div style="background-color: red; color: white; padding: 10px;">${response.data[0]}</div>`;
                    } else {
                        // Proceed with the existing logic for formatting the data
                        let formattedData = "<ul style='list-style-type: none; padding: 0;'>";
                        response.data.forEach(item => {
                            const parts = item.split(" ");
                            const bookingNumber = parts[3]; // Assuming 'bookingNumber' is the fourth word in the string
                            const reservationId = parts[parts.length - 1]; // Assuming 'id' is the last word in the string
                            
                            // Determine if the reservation was found or not
                            const isReservationFound = !item.includes("No matching reservation found");

                            // Set the background color based on whether the reservation was found
                            const backgroundColor = isReservationFound ? "lightgreen" : "lightcoral"; // lightcoral for better readability with black text
                            const textColor = "black"; // Ensuring text color is set for readability
                            
                            // Format the message
                            const message = isReservationFound 
                                            ? `Booking Number: <strong>${bookingNumber}</strong> - Reservation ID: <strong>${reservationId}</strong>` 
                                            : `Booking Number: <strong>${bookingNumber}</strong> - No matching reservation found`;

                            // Add to the HTML string with styled backgrounds
                            formattedData += `<li style="background-color: ${backgroundColor}; color: ${textColor}; padding: 5px; margin-bottom: 2px;">${message}</li>`;
                        });
                        formattedData += "</ul>";

                        // Set the formatted HTML as zaui_object_data to render it in the template
                        this.zaui_object_data = formattedData;
                    }
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
                })
                .catch(e => {
                    console.log(e);
                });
        },

        getManifestByDate() {
            ZauiDataService.getManifestByDay(new Date(this.selectedDate))
                .then(response => {
                    // Check if the response is an array and count the number of objects
                    const numberOfObjects = Array.isArray(response.data) ? response.data.length : 0;
                    // Process and map the data for display
                    this.zaui_object_data = response.data;
                    this.zaui_object_data = `Finished Mapping, ${numberOfObjects} objects found. Now run Test Zaui Mapping.`;
                })
                .catch(e => {
                    console.log(e);
                    this.zaui_object_data = "Error: Failed to get the manifest data.";
                });
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