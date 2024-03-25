<template>
  <div class="admin-dashboard">
    <div class="main-content">
      <div class="header">
        <h1>Admin Dashboard</h1>
        <div class="date-picker-container">
          <label for="selectedDate">Selected Date:</label>
          <input type="date" id="selectedDate" v-model="selectedDate" @change="fetchTripsByDate" class="date-picker" />
        </div>
      </div>
      <div class="row trips-container">
        <div class="col-lg-6 col-md-12 mb-4" 
             v-for="(trip, index) in trips" 
             :key="trip.tripid">
          <TripCard
            :tripData="trip"
            :tripNumber="index + 1"
            :allPilots="pilots"
            :allGuides="guides"
            :allHelicopters="helicopters"
            :allBeacons="beacons"
            @tripDeleted="handleTripDeleted"
            @removeReservationFromTrip="handleRemoveReservationFromTrip"
            @clientRemoved="handleClientRemoved"
          />
        </div>
        <div class="col-lg-6 col-md-12 mb-4 new-trip-card" @click="createNewTrip">
          <span class="plus-symbol">+</span>
          <span>Create New Trip</span>
        </div>
      </div>
    </div>
    <div class="admin-actions">
      <unassigned-reservations
        :unassignedReservations="unassignedReservations"
        :trips="trips"
        @reservationAssigned="handleReservationAssignment"
      />
    </div>
  </div>
</template>


<script>
import TripCard from './Trips/TripCard.vue';
import UnassignedReservations from './Reservations/UnassignedReservations.vue';
import TripDataService from '@/services/TripDataService';
import ReservationDataService from '@/services/ReservationDataService'; 
import EquipmentDataService from '@/services/EquipmentDataService';

export default {
  components: {
    TripCard,
    UnassignedReservations
  },
  data() {
    return {
      selectedDate: new Date().toISOString().split('T')[0], // Set today's date as default
      trips: [],
      pilots: [],
      guides: [],
      helicopters: [],
      unassignedReservations: [],
      beacons: [],
    };
  },
  methods: {
    fetchTripsByDate() {
      TripDataService.fetchTripsByDate(this.selectedDate)
        .then(response => {
          this.trips = response.data.sort((a, b) => a.tripid - b.tripid); // Sort by tripid

        })
        .catch(error => {
          console.error("Error fetching trips:", error);
          this.trips = []; // Reset trips on error
        });
        this.fetchUnassignedReservations();
    },
    fetchUnassignedReservations() {
      // console.log("Finding Reservations for "+this.selectedDate);
      ReservationDataService.findByDate(this.selectedDate)
        .then(response => {
          this.unassignedReservations = response.data;
          // console.log(this.unassignedReservations);
        })
        .catch(error => {
          console.error("Error fetching unassigned reservations:", error);
        });
    },

    // In Greeting-Office.vue, inside the methods object
    handleClientRemoved() {
        this.fetchTripsByDate(); // Refresh trip data
        this.fetchUnassignedReservations(); // Refresh unassigned reservations
    },

    handleReservationAssignment(data) {
      TripDataService.assignReservationToTripGroup(data)
        .then(() => {
          // Call a method to update the local data
          this.updateLocalDataAfterAssignment(data);
          this.fetchTripsByDate();
        })
        .catch(error => {
          console.error("Error assigning reservation to trip:", error);
        });
    },
    handleRemoveReservationFromTrip(data) {
      TripDataService.removeReservationFromTrip(data.tripId, data.reservationId)
        .then(() => {
          // Update the UI as necessary, e.g., fetch trips again
          this.fetchTripsByDate();
        })
        .catch(error => {
          console.error("Error removing reservation from trip:", error);
        });
    },
    updateLocalDataAfterAssignment(data) {
      // Remove from unassigned reservations
      this.unassignedReservations = this.unassignedReservations.filter(reservation => reservation.reservationid !== data.reservationId);

      // Find the trip and add the reservation to it
      const trip = this.trips.find(t => t.tripid === data.tripId);
      if (trip) {
        if (!trip.reservationids) {
          trip.reservationids = [];
        }
        trip.reservationids.push(data.reservationId);
      }

      // Since Vue reactivity might not pick up changes to nested properties, 
      // you might need to force an update by replacing the trips array
      this.trips = [...this.trips].sort((a, b) => a.tripid - b.tripid);
    },
    createNewTrip() {
      const newTrip = {
        date: this.selectedDate,
        // Other fields are null or empty as per your requirements
      };
      TripDataService.createTrip(newTrip)
        .then(response => {
          this.trips.push(response.data); // Add the new trip to the list
          this.fetchTripsByDate();
        })
        .catch(error => {
          console.error("Error creating new trip:", error);
        });
    },
    handleTripDeleted(deletedTripId) {
      this.trips = this.trips.filter(trip => trip.tripid !== deletedTripId);
      this.fetchTripsByDate();
    },
    fetchPilots() {
      TripDataService.fetchPilots()
        .then(response => {
          this.pilots = response.data;
        })
        .catch(error => {
          console.error("Error fetching pilots:", error);
        });
    },
    fetchGuides() {
      TripDataService.fetchGuides()
        .then(response => {
          this.guides = response.data;
        })
        .catch(error => {
          console.error("Error fetching guides:", error);
        });
    },
    fetchHelicopters() {
      TripDataService.fetchHelicopters()
        .then(response => {
          this.helicopters = response.data;
        })
        .catch(error => {
          console.error("Error fetching helicopters:", error);
        });
    },
    fetchBeacons() {
      EquipmentDataService.getAllBeacons() 
        .then(response => {
          this.beacons = response.data;
        })
        .catch(error => {
          console.error("Error fetching beacons:", error);
        });
    },
  },
  created() {
    this.fetchTripsByDate();
    this.fetchPilots();
    this.fetchGuides();
    this.fetchHelicopters();
    this.fetchTripsByDate();
    this.fetchBeacons();
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.main-content {
  width: calc(100% - 300px); /* Adjust width of main content */
  overflow-y: auto; /* Scrollable main content */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding: 0 20px;
  width: 100%;
}
.date-picker-container {
  display: flex;
  align-items: center;
}

.date-picker {
  max-width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
}

.trips-container {
  padding: 20px;
}

.trip-card {
  width: 100%; /* Full width of parent column */
}

.new-trip-card {
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 200px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.plus-symbol {
  font-size: 24px;
  margin-right: 8px;
}

.admin-actions {
  width: 300px; /* Fixed width for the admin actions */
  overflow-y: auto; /* Scrollable admin actions */
  height: calc(100vh - 20px);
  position: sticky;
  top: 20px;
}

@media (max-width: 991px) {
  .admin-dashboard {
    flex-direction: column;
  }
  .main-content,
  .admin-actions {
    width: 100%;
  }
  .admin-actions {
    position: static;
    top: unset;
  }
}


/* Additional styles here */
</style>