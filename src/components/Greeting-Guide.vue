<template>
  <div class="guide-dashboard">
    <div class="header d-flex justify-content-between align-items-center p-3 mb-3">
      <h1>Guide Dashboard</h1>
      <div class="date-selector">
        <label for="selectedDate" class="form-label me-2">Selected Date:</label>
        <input type="date" id="selectedDate" v-model="selectedDate" @change="fetchTripsForGuide" class="form-control form-control-lg"/>
      </div>
    </div>
    <div v-if="trips" class="content">
      <!-- Loop through each trip and display it as a Bootstrap row -->
      <div v-for="(trip, index) in trips" :key="trip.tripid" class="row trip-row mb-4">
        <div class="col-md-6">
          <TripCardView 
            :tripData="trip" 
            :tripNumber="index + 1" 
            class="trip-card-view" />
        </div>
        <div class="col-md-6">
          <div class="passenger-info-box p-3">
            <h2>Your Riders</h2>
            <div v-if="beacons && beacons.length" class="passengers d-flex justify-content-start flex-wrap">
              <PassengerCard
                v-for="passenger in trip.reservationPersons"
                :key="passenger.reservationid"
                :passenger="formatPassengerData(passenger.person, passenger.tripclientid)"
                :activityname="passenger.activityName"
                :beacons="beacons"
                @beacon-change="handleBeaconAssignment"
                class="me-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="content">
      <div class="row trip-row mb-4">
        <h2>You have no assigned trips on this day</h2>
      </div>
    </div>
  </div>
</template>

<script>
import TripCardView from './Trips/TripCardView.vue';
import PassengerCard from './Passengers/PassengerCard.vue';
import StaffDataService from '@/services/StaffDataService';
import TripDataService from '@/services/TripDataService';
import EquipmentDataService from '@/services/EquipmentDataService';

export default {
  components: {
    TripCardView,
    PassengerCard
  },
  data() {
    return {
      guideEmail: '',
      selectedDate: new Date().toISOString().split('T')[0],
      trips: [],
      beacons: [],
    };
  },
  created() {
    this.fetchStaffId();
    this.fetchTripsForGuide();
    this.fetchAllBeacons();
  },
  methods: {
    fetchStaffId() {
      this.guideEmail = sessionStorage.getItem("email");
      if (this.guideEmail) {
        StaffDataService.findByEmail(this.guideEmail).then(response => {
          const staffId = response.data.staffid;
          sessionStorage.setItem("staffId", staffId);
        })
        .catch(error => {
          console.error("Error fetching staff ID:", error);
        });
      }
    },
    fetchTripsForGuide() {
      const staffId = sessionStorage.getItem("staffId");
      TripDataService.findByGuideAndDate(staffId, this.selectedDate)
        .then(response => {
          this.trips = response.data;
          console.log(this.trips);
        })
        .catch(error => {
          console.error('Error fetching trips for guide:', error);
        });
    },
    formatPassengerData(person, tripclientid) {
      return {
        name: person.firstname + ' ' + person.lastname,
        activity: person.activityName, // Make sure this property exists
        weight: person.weight,
        additionalData: person.additionalData, // Make sure this property exists
        tripclientid: tripclientid // Include the tripclientid
        // Include any other properties that PassengerCard needs
      };
    },
    fetchAllBeacons() {
      EquipmentDataService.getAllBeacons()
        .then(response => {
          this.beacons = response.data;
        })
        .catch(error => {
          console.error('Error fetching beacons:', error);
        });
    },
    handleBeaconAssignment({ beaconId, tripClientId }) {
      // Check if the beacon is already assigned
      const beacon = this.beacons.find(b => b.beaconid === beaconId);
      if (beacon && beacon.tripclientid && beacon.tripclientid !== tripClientId) {
        // Ask the user if they want to reassign the beacon
        if (confirm("This beacon is already assigned to another passenger. Do you want to reassign it?")) {
          // Unlink the beacon from the current trip client
          EquipmentDataService.unlinkBeaconFromTrip(beaconId)
            .then(() => {
              // Assign the beacon to the new trip client
              EquipmentDataService.assignBeaconToTripClient(beaconId, tripClientId);
            });
        }
      } else {
        // Assign the beacon to the trip client
        EquipmentDataService.assignBeaconToTripClient(beaconId, tripClientId);
      }
    }
  }
};
</script>

<style scoped>
.guide-dashboard {
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
}

.header {
  background-image: repeating-linear-gradient(
    45deg,
    #333333,
    #333333 10px,
    #4d4d4d 10px,
    #4d4d4d 20px
  );
  color: #fff;
}

.trip-row {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.passenger-info-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.passenger-card {
  flex: 0 0 auto;
  width: calc(33.333% - 1rem);
  margin-bottom: 1rem;
}

.passenger-card h3 {
  font-size: 1.5rem;
}

@media (min-width: 768px) {
  .trip-row {
    align-items: center;
  }

  .passenger-card {
    max-width: 200px;
  }

  .passenger-info-box h2 {
    font-size: 2rem;
  }
}
</style>
