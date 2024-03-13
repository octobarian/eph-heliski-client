<template>

  <div class="trip-card card">

    <div class="card-header">
      <div class="row">
        <h2 class="tripnumberheader">Heli #{{ tripNumber }}</h2>
        <p>Trip ID: {{ tripData.tripid }}</p>
      </div>
      <div class=" row pilots-helicopters-section">
        <!-- Pilots Section -->
        <div class="pilots-section">
          <label>Pilot:</label>
          <select v-model="editableTripData.pilotId" class="form-select">
            <option disabled value="">Select a Pilot</option>
            <option v-for="pilot in allPilots" :key="pilot.staffid" :value="pilot.staffid">
              {{ pilot.person.firstname }} {{ pilot.person.lastname }}
            </option>
          </select>
        </div>
        <!-- Helicopters Section -->
        <div class="helicopter-section">
          <label>Helicopter:</label>
          <select v-model="editableTripData.helicopterId" class="form-select">
            <option disabled value="">Select a Helicopter</option>
            <option v-for="helicopter in allHelicopters" :key="helicopter.helicopterid" :value="helicopter.helicopterid">
              {{ helicopter.model }} ({{ helicopter.callsign }})
            </option>
          </select>
        </div>
      </div>
      <button class="btn btn-danger" @click="confirmDeletion">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </button>
    </div>

    <div class="card-body">
      <!-- Trip Groups Section -->
      <div class="trip-groups-header">
        <h5 class="card-title">Trip Groups</h5>
        <button class="btn btn-primary" @click="createNewGroup">New Group</button>
      </div>
      <div class="trip-groups-container">
        <trip-group
          v-for="(group, index) in tripData.groups"
          :key="group.groupId"
          :group-id="group.groupId"
          :guide="group.guide"
          :clients="group.clients"
          :all-guides="allGuides"
          @removeGuide="removeGuide"
          @removeClient="removeClient"
          @deleteGroup="deleteGroup(index)"
        ></trip-group>
      </div>
      <TripWeight :tripData="tripData" @gearWeightUpdated="handleGearWeightUpdate" />
      <label>Notes:</label>
      <div class="notes-container">
        <textarea v-model="noteContent"></textarea>
        <button class="save-note" @click="saveNote">Save Note</button>
      </div>
    </div>
  </div>
</template>

<script>
//components
import TripWeight from './TripWeight.vue';
import TripGroup from './TripGroup.vue';

//services
import TripDataService from '@/services/TripDataService';
import NotesDataService from '@/services/NotesDataService';
import StaffDataService from '@/services/StaffDataService';

export default {
  props: {
    tripData: {
      type: Object,
      required: true,
    },
    tripNumber: {
      type: Number,
      required: true,
    },
    allPilots: {
      type: Array,
      required: true,
    },
    allGuides: {
      type: Array,
      required: true,
    },
    allHelicopters: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.fetchNote();
    this.fetchLoggedInPersonId();
  },
  components: {
    // Register the new component
    TripWeight,
    TripGroup
  },
  data() {
    return {
      selectedGuideId: '',
      editableTripData: {
        pilotId: this.tripData.pilot.staffid,
        helicopterId: this.tripData.helicopter.helicopterid,
        notes: this.tripData.notes,
        guides: this.tripData.guides || [],
      },
      totalGearWeight: 0,
      noteContent: '',
      noteId: null,
      loggedInPersonId: null,
      tripGroups: this.tripData.groups || [],
    };
  },
  watch: {
    //If there is changes to the editable values, save the trip automatically
    'editableTripData.pilotId': function(newVal, oldVal) {
      if (newVal !== oldVal) this.updateTrip();
    },
    'editableTripData.helicopterId': function(newVal, oldVal) {
      if (newVal !== oldVal) this.updateTrip();
    },
    selectedGuideId(newValue) {
      if (newValue) {
        const guide = this.allGuides.find(g => g.staffid == newValue);
        if (guide && !this.tripData.guides.some(g => g.personid === guide.person.personid)) {
          this.tripData.guides.push({ ...guide.person });
          this.updateTrip(); // Update the trip after adding a guide
        }
        this.selectedGuideId = ''; // Reset the selected guide ID
      }
    },
  },
  computed:{
    availableGuides() {
      return this.allGuides.map(guide => {
        // Check if the guide is already selected
        const isGuideSelected = this.tripData.guides.some(g => g.personid === guide.person.personid);
        return {
          ...guide,
          isDisabled: isGuideSelected // Add an isDisabled property
        };
      });
    }
  },
  methods: {
    //TODO: make this create a new group
    createNewGroup(){},

    fetchLoggedInPersonId() {
      const email = sessionStorage.getItem('email');
      if (email) {
        StaffDataService.findByEmail(email)
          .then(response => {
            this.loggedInPersonId = response.data.personid;
          })
          .catch(error => {
            console.error('Error fetching staff info:', error);
          });
      }
    },
    fetchNote() {
      NotesDataService.getTripNote(this.tripData.tripid)
        .then(response => {
          this.noteContent = response.data.text;
          this.noteId = response.data.noteid;
        })
        .catch(error => {
          console.error('Error fetching note:', error);
        });
    },
    saveNote() {
      if (!this.loggedInPersonId) {
        console.error('No logged in person ID found');
        return;
      }

      // Define noteData within the scope of saveNote method
      const noteData = {
        text: this.noteContent,
        personid: this.loggedInPersonId,
        type: 'tripnote',
        itemid: this.tripData.tripid
      };

      if (this.noteId) {
        // Update the existing note
        NotesDataService.update(this.noteId, noteData)
          .then(() => {
            console.log("Note updated successfully");
            this.updateTrip();
          })
          .catch(error => {
            console.error("Error updating note:", error);
          });
      } else {
        // Create a new note
        NotesDataService.create(noteData)
          .then(response => {
            this.noteId = response.data.noteid;
            console.log("Note created successfully");
            this.updateTrip();
          })
          .catch(error => {
            console.error("Error creating note:", error);
          });
      }
    },
    handleGearWeightUpdate(newGearWeight) {
      console.log(newGearWeight);
      // Handle gear weight updates
      // You can use this method to update the trip data or perform other actions
    },
    updateTrip() {
      // Generate guideIds, which can be an empty array if no guides are selected
      const guideIds = this.tripData.guides.map(guide => {
        const staffEntry = this.allGuides.find(g => g.person.personid === guide.personid);
        return staffEntry ? staffEntry.staffid : null;
      }).filter(id => id !== null); // Filter out any nulls

      const updatedTripData = {
        pilotid: this.editableTripData.pilotId,
        helicopterid: this.editableTripData.helicopterId,
        guideIds: guideIds, // This can be an empty array if no guides are selected
      };

      TripDataService.update(this.tripData.tripid, updatedTripData)
        .then(response => {
          this.tripData.helicopterId = this.editableTripData.helicopterId;
          console.log(response);
        })
        .catch(error => {
          console.error("Error updating trip:", error);
        });
    },
    removeGuide(guideToRemove) {
      this.tripData.guides = this.tripData.guides.filter(guide => guide.personid !== guideToRemove.personid);
      this.updateTrip(); // Update the trip after removing a guide
    },
    removeClient(index) {
      this.tripData.clientids.splice(index, 1);
      this.updateTrip(); // Update the trip after removing a client
    },
    removeReservation(reservationId) {
      // Emit event to parent component with trip ID and reservation ID
      this.$emit('removeReservationFromTrip', {
        tripId: this.tripData.tripid,
        reservationId: reservationId
      });
      this.updateTrip();
    },
    confirmDeletion() {
      if (window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
        this.deleteTrip();
      }
    },
    deleteTrip() {
      TripDataService.delete(this.tripData.tripid)
        .then(() => {
          this.$emit('tripDeleted', this.tripData.tripid);
        })
        .catch(error => {
          console.error("Error deleting trip:", error);
        });
    },
  }
};
</script>

<style scoped>
@media (min-width: 768px) {
  .trip-card .card-header > .pilot-helicopter-container {
    display: flex; /* Enables flex container */
    flex-wrap: wrap; /* Allows items to wrap as needed */
  }

  .trip-card .card-header > .pilot-helicopter-container > .pilots-section,
  .trip-card .card-header > .pilot-helicopter-container > .helicopter-section {
    flex: 1; /* Allows each section to take up equal space */
    padding-right: 5px; /* Add some spacing between the two sections */
  }

  .trip-card .card-header > .pilot-helicopter-container > .helicopter-section {
    padding-right: 0; /* No padding on the right for the last element */
  }
}

.trip-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
}

.trip-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.trip-card .card-header .btn-danger {
  position: absolute;
  right: 10px;
  top: 10px;
}

.trip-groups-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.trip-groups-container {
  margin-bottom: 15px;
}

.btn-primary {
  /* Add this to give the button a red background */
  background-color: var(--primary-text-eph-color);
  /* Additional styling for the button */
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pilot-helicopter-container {
  display: flex;
  justify-content: space-between; /* This will ensure the child divs take up equal space */
}

.pilots-section, .helicopter-section {
  flex: 1; /* Each section will take up half the space */
  padding-right: 5px; /* Add some spacing between the two sections */
}

.helicopter-section {
  padding-right: 0; /* No padding on the right for the last element */
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e3e6ea;
  position: relative;
}

.card-body {
  padding: 15px;
}

/* Add styles for buttons if needed */
.btn-primary {
  margin-right: 10px; /* Spacing between buttons */
}

.notes-container {
    position: relative;
  }

.notes-container textarea {
  width: 100%;
  padding-bottom: 30px; /* Make space for the 'Save Note' button */
}

.notes-container .save-note {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px 10px;
}

.selected-guides {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

.guide-tag {
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color: #e9ecef;
  border-radius: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.remove-guide {
  background-color: transparent;
  border: none;
  margin-left: 8px;
  cursor: pointer;
}

.selected-clients {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

.client-tag {
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color: #e9ecef;
  border-radius: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.remove-client {
  background-color: transparent;
  border: none;
  margin-left: 8px;
  cursor: pointer;
}

.reservations-section {
  background-color: #f8f9fa; /* Light background for the section */
  border-top: 2px solid #e9ecef; /* Separating line from the rest of the card */
  padding-top: 20px; /* Spacing at the top */
}

.reservations-section .card-title {
  color: var(--primary-text-eph-color); /* Title is EPH Color */
  margin-bottom: 15px; /* Space below the title */
}

.selected-reservations {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.reservation-tag {
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color: #e9ecef;
  border-radius: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.tripnumberheader{
  color: var(--primary-text-eph-color);
}

.remove-reservation {
  background-color: transparent;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  color: #dc3545; /* Bootstrap danger color for the remove button */
}

.remove-reservation:hover {
  text-decoration: underline;
}

/* Adjustments for form fields */
select, textarea {
  width: 100%;
  margin-bottom: 10px;
}
</style>
