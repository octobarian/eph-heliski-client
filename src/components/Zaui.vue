<template>
    <div id="zaui_page">
        <button style="margin-right: 20px;" @click="getZauiPing">Ping Zaui</button>
        <button @click="getBookingByDay">Get All Bookings Object</button>
        <button @click="getTodaysManifest">Get Today's Manifest</button>
        <div id="zaui_data_box">
            {{zaui_object_data}}
        </div>
        
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
        }
        //method for updating and displaying the data on the zaui_data_box
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