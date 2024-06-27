<template>
  <div class="trip-card card">
    <div class="card-header" :style="tripTypeStyle">
      <div class="row align-items-center">
        <div class="trip-header-section">
          <h2 class="tripnumberheader">Heli #{{ tripNumber }}</h2>
          <div class="sorting-section">
            <label>Sort:</label>
            <div class="sorting-controls">
              <button @click="decrementSortingIndex">-</button>
              <span>{{ editableTripData.sortingindex }}</span>
              <button @click="incrementSortingIndex">+</button>
            </div>
          </div>
          <span style="width: 1px;"></span>
          <button class="btn btn-danger" @click="confirmDeletion">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
        </div>
        <select v-model="editableTripData.triptype" @change="updateTrip" :style="tripTypeStyle">
            <option value="Private">Private</option>
            <option value="Lodge">Lodge</option>
            <option value="Day Heli">Day Heli</option>
            <option value="Media">Media</option>
          </select>
      </div>
      <div class="row pilots-helicopters-section">
        <div class="pilots-section">
          <label>Pilot:</label>
          <select v-model="editableTripData.pilotId" class="form-select">
            <option disabled value="">Select a Pilot</option>
            <option v-for="pilot in allPilots" :key="pilot.staffid" :value="pilot.staffid">
              {{ pilot.person.firstname }} {{ pilot.person.lastname }}
            </option>
          </select>
        </div>
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
      
    </div>

    <div class="card-body">
      <div class="trip-groups-header">
        <h5 class="card-title">Heli Groups</h5>
        <button class="btn btn-primary" @click="createNewGroup">New Group</button>
      </div>
      <div class="trip-groups-container">
        <trip-group
          v-for="(group, index) in tripData.groups"
          :key="group.groupid"
          :group-id="group.groupid"
          :groupIndex="index"
          :heliNumber="tripNumber"
          :groupEndDate="group.end_date"
          :guide="group.guide"
          :guide-additional="group.guideAdditional"
          :clients="group.clients"
          :all-guides="allGuides"
          :all-beacons="allBeacons"
          @update-guides="(groupId, guideId, guideAdditionalId) => handleUpdateGuides(groupId, guideId, guideAdditionalId)"
          @updateEndDate="(data) => updateGroupDate(data)"
          @deleteGroup="() => handleDeleteGroup(group.groupid)"
          @removeGuide="guide => handleRemoveGuide(guide)"
          @removeClient="(client) => handleRemoveClient(client)"
        ></trip-group>
      </div>
      <label>Notes:</label>
      <div class="notes-container">
        <textarea v-model="noteContent"></textarea>
        <button class="save-note" @click="saveNote">Save Note</button>
        <SavedMessage :visible="noteSaved" />
      </div>
    </div>
  </div>
</template>

<script>
import TripGroup from './TripGroup.vue';
import TripDataService from '@/services/TripDataService';
import NotesDataService from '@/services/NotesDataService';
import StaffDataService from '@/services/StaffDataService';
import SavedMessage from '../Notes/SavedMessage.vue';

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
    allBeacons: Array,
  },
  mounted() {
    this.fetchNote();
    this.fetchLoggedInPersonId();
  },
  components: {
    TripGroup,
    SavedMessage
  },
  data() {
    return {
      selectedGuideId: '',
      editableTripData: {
        pilotId: this.tripData.pilot ? this.tripData.pilot.staffid : '',
        helicopterId: this.tripData.helicopter ? this.tripData.helicopter.helicopterid : '',
        triptype: this.tripData.triptype || '',
        notes: this.tripData.notes ? this.tripData.notes : [],
        guides: this.tripData.guides || [],
        sortingindex: this.tripData.sortingindex || 1
      },
      totalGearWeight: 0,
      noteContent: '',
      noteId: null,
      loggedInPersonId: null,
      tripGroups: this.tripData.groups || [],
      noteSaved: false,
    };
  },
  watch: {
    'editableTripData.pilotId': function (newVal, oldVal) {
      if (newVal !== oldVal) this.updateTrip();
    },
    'editableTripData.helicopterId': function (newVal, oldVal) {
      if (newVal !== oldVal) this.updateTrip();
    },
    'editableTripData.triptype': function (newVal, oldVal) {
      if (newVal !== oldVal) this.updateTrip();
    },
    selectedGuideId(newValue) {
      if (newValue) {
        const guide = this.allGuides.find(g => g.staffid == newValue);
        if (guide && !this.tripData.guides.some(g => g.personid === guide.person.personid)) {
          this.tripData.guides.push({ ...guide.person });
          this.updateTrip();
        }
        this.selectedGuideId = '';
      }
    },
  },
  computed: {
    availableGuides() {
      return this.allGuides.map(guide => {
        const isGuideSelected = this.tripData.guides.some(g => g.personid === guide.person.personid);
        return {
          ...guide,
          isDisabled: isGuideSelected
        };
      });
    },
    tripTypeStyle() {
      let borderColor = '';
      let backgroundColor = '';

      switch (this.editableTripData.triptype) {
        case 'Private':
          borderColor = 'var(--private-event-color)';
          backgroundColor = 'rgba(247, 191, 47, 0.3)';
          break;
        case 'Lodge':
          borderColor = 'var(--lodge-event-color)';
          backgroundColor = 'rgba(237, 98, 64, 0.3)';
          break;
        case 'Day Heli':
          borderColor = 'var(--day-event-color)';
          backgroundColor = 'rgba(109, 123, 156, 0.3)';
          break;
        case 'Media':
          borderColor = 'var(--minor-media-event-color)';
          backgroundColor = 'rgba(95, 184, 100, 0.3)';
          break;
        default:
          borderColor = '#ccc';
          backgroundColor = 'rgba(204, 204, 204, 0.3)';
      }

      return {
        border: `2px solid ${borderColor}`,
        backgroundColor: `${backgroundColor}`,
      };
    }
  },
  methods: {
    createNewGroup() {
      TripDataService.createGroup(this.tripData.tripId)
        .then(response => {
          this.tripData.groups = [...this.tripData.groups, response.data];
          this.$emit('clientRemoved');
        })
        .catch(error => {
          console.error('Error creating new group:', error);
        });
    },
    handleDeleteGroup(groupId) {
      const confirmation = window.confirm("Deleting the group will unassign all clients in the group, are you sure you want to delete this group?");

      if (confirmation) {
        TripDataService.deleteGroup(groupId)
          .then(() => {
            this.tripData.groups = this.tripData.groups.filter(group => group.groupid !== groupId);
            this.$emit('clientRemoved');
          })
          .catch(error => {
            console.error('Error deleting group:', error);
          });
      }
    },
    handleRemoveGuide(guide) {
      console.log(guide);
    },
    handleRemoveClient(clientInfo) {
      TripDataService.removeClientFromGroup(clientInfo.groupId, clientInfo.tripClientId)
        .then(() => {
          this.$emit('clientRemoved', clientInfo);
        })
        .catch(error => {
          console.error('Error removing client from group:', error);
        });
    },
    handleUpdateGuides(groupId, guideId, guideAdditionalId) {
      console.log(`Trying To Update Group ${groupId} with Guide: ${guideId} and addguide: ${guideAdditionalId}`);
      TripDataService.updateGroupGuides(groupId, guideId, guideAdditionalId)
        .then(() => {
          this.$emit('guidesUpdated', groupId);
        })
        .catch(error => {
          console.error("Error updating guides:", error);
        });
    },
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
      NotesDataService.getTripNote(this.tripData.tripId)
        .then(response => {
          if (response.data && response.data.text !== null) {
            this.noteContent = response.data.text;
            this.noteId = response.data.noteid;
          } else {
            this.noteContent = '';
            this.noteId = null;
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            this.noteContent = '';
            this.noteId = null;
          } else {
            console.error('Error fetching note:', error);
          }
        });
    },
    saveNote() {
      this.loggedInPersonId = 1;

      const noteData = {
        text: this.noteContent,
        personid: this.loggedInPersonId,
        type: 'tripnote',
        itemid: this.tripData.tripId
      };

      if (this.noteId) {
        NotesDataService.update(this.noteId, noteData)
          .then(() => {
            this.updateTrip();
            this.animateSavedMessage();
          })
          .catch(error => {
            console.error("Error updating note:", error);
          });
      } else {
        NotesDataService.create(noteData)
          .then(response => {
            this.noteId = response.data.noteid;
            this.updateTrip();
          })
          .catch(error => {
            console.error("Error creating note:", error);
          });
      }
    },
    animateSavedMessage() {
      this.noteSaved = true;
      setTimeout(() => {
        this.noteSaved = false;
      }, 3000);
    },
    handleGearWeightUpdate(newGearWeight) {
      console.log(newGearWeight);
    },
    updateTrip() {
      const updatedTripData = {
        pilotid: this.editableTripData.pilotId,
        helicopterid: this.editableTripData.helicopterId,
        triptype: this.editableTripData.triptype,
        sortingindex: this.editableTripData.sortingindex
      };

      TripDataService.update(this.tripData.tripId, updatedTripData)
      // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.tripData.helicopterId = this.editableTripData.helicopterId;
          this.tripData.pilotId = this.editableTripData.pilotId;
          this.tripData.triptype = this.editableTripData.triptype;
          this.tripData.sortingindex = this.editableTripData.sortingindex;
          console.log('trips need updating');
          this.$emit('updateTrip'); // Emit the event to refresh trips
        })
        .catch(error => {
          console.error("Error updating trip:", error);
        });
    },
    updateGroupDate({ groupId, newEndDate }) {
      const tripId = this.tripData.tripId;
      TripDataService.updateGroupDate({ groupId, tripId, newEndDate })
      // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.$emit('groupDateUpdated', { groupId, newEndDate });
        })
        .catch(error => {
          console.error("Error updating group end date:", error);
        });
    },
    removeGuide(guideToRemove) {
      this.tripData.guides = this.tripData.guides.filter(guide => guide.personid !== guideToRemove.personid);
      this.updateTrip();
    },
    removeClient(index) {
      this.tripData.clientids.splice(index, 1);
      this.updateTrip();
    },
    removeReservation(reservationId) {
      this.$emit('removeReservationFromTrip', {
        tripId: this.tripData.tripId,
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
      TripDataService.delete(this.tripData.tripId)
        .then(() => {
          this.$emit('tripDeleted', this.tripData.tripId);
          this.updateTrip();
        })
        .catch(error => {
          console.error("Error deleting trip:", error);
        });
    },
    incrementSortingIndex() {
      if (this.editableTripData.sortingindex < 5) {
        this.editableTripData.sortingindex++;
      } else {
        this.editableTripData.sortingindex = 1;
      }
      this.updateTrip();
    },
    decrementSortingIndex() {
      if (this.editableTripData.sortingindex > 1) {
        this.editableTripData.sortingindex--;
      } else {
        this.editableTripData.sortingindex = 5;
      }
      this.updateTrip();
    }
  }
};
</script>

<style scoped>
@media (min-width: 768px) {
  .trip-card .card-header > .pilot-helicopter-container {
    display: flex;
    flex-wrap: wrap;
  }

  .trip-card .card-header > .pilot-helicopter-container > .pilots-section,
  .trip-card .card-header > .pilot-helicopter-container > .helicopter-section {
    flex: 1;
    padding-right: 5px;
  }

  .trip-card .card-header > .pilot-helicopter-container > .helicopter-section {
    padding-right: 0;
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

.trip-header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-primary {
  background-color: var(--primary-text-eph-color);
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pilot-helicopter-container {
  display: flex;
  justify-content: space-between;
}

.pilots-section, .helicopter-section {
  flex: 1;
  padding-right: 5px;
}

.helicopter-section {
  padding-right: 0;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e3e6ea;
  position: relative;
}

.card-body {
  padding: 15px;
}

.notes-container {
  position: relative;
}

.notes-container textarea {
  width: 100%;
  padding-bottom: 30px;
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
  background-color: #f8f9fa;
  border-top: 2px solid #e9ecef;
  padding-top: 20px;
}

.reservations-section .card-title {
  color: var(--primary-text-eph-color);
  margin-bottom: 15px;
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

.tripnumberheader {
  color: var(--primary-text-eph-color);
}

.remove-reservation {
  background-color: transparent;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  color: #dc3545;
}

.remove-reservation:hover {
  text-decoration: underline;
}

select, textarea {
  width: 100%;
  margin-bottom: 10px;
}

.sorting-section {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.sorting-controls {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.sorting-controls button {
  background-color: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
  padding: 0 10px;
  margin: 0 5px;
  border-radius: 4px;
  height: 34px;
}

.sorting-controls span {
  font-size: 18px;
  padding: 0 10px;
}
</style>
