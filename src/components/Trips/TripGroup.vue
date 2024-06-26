<template>
  <div class="trip-group">
    <div class="group-header">
      <div class="group-info-container">
        <span class="group-id-label">Heli: {{ heliNumber }} - Group: {{ groupIndex + 1 }}</span>
        <span class="group-info">
          Clients: {{ clientCount }} | Total Weight: {{ totalWeight }}lb | FP: {{ fuelPercentage }}%
        </span>
      </div>
      <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
        <span v-if="!isCollapsed">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
            <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
          </svg>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
            <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753-1.659H3.204a1 1 0 0 1-.753-1.659"/>
          </svg>
        </span>
      </button>
      <button v-if="!isCollapsed" class="delete-group-btn" @click="deleteGroup(groupId)">
        Delete Group   
        <svg style="margin-left: 15px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
      </button>
    </div>
    <div v-if="!isCollapsed" class="group-details">
      <div class="guide-dropdown">
        <label>Guide: </label>
        <select v-model="selectedGuideId" @change="refetchFuelPercentage" style="margin-left: 10px;">
          <option disabled value="">Select a Guide</option>
          <option 
            v-for="availableGuide in allGuides" 
            :key="availableGuide.staffid" 
            :value="availableGuide.staffid">
            {{ availableGuide.person.firstname }} {{ availableGuide.person.lastname }}
          </option>
        </select>
      </div>
      <div class="continue-section">
        <label>Continue till: </label>
        <input type="date" v-model="groupEndDate" @change="emitDateChange" style="margin-left: 10px;" class="continue-till-date">
      </div>
      <div class="clients-section">
        <label class="group-members-label">Group Members:</label>
        <div class="client-grid">
          <div v-for="(client, index) in localClients" :key="client.reservationid" class="client-card">
            <div class="row client-information-sections">
              <span class="age-emoji" :style="getAgeStyle(client.person.age)">{{ getAgeEmoji(client.person.age) }}</span>
              {{ client.person.firstname }} {{ client.person.lastname }} 
              <button class="remove-client-btn" @click="emitRemoveClient(client, index)">x</button>
            </div>
            <div class="row beacon-selection-section">
              <select v-model="client.selectedBeaconId" @change="onBeaconSelect(index)">
                <option disabled value="">Select a Beacon</option>
                <option v-for="beacon in allBeacons" :key="beacon.beaconid" :value="beacon.beaconid">
                  {{ beacon.beaconnumber }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EquipmentDataService from '@/services/EquipmentDataService';
import TripDataService from '@/services/TripDataService';

export default {
  props: {
    groupId: Number,
    groupIndex: Number,
    heliNumber: Number,
    guide: {
      type: [Object, null],
      default: () => null,
      required: false
    },
    clients: {
      type: Array,
      default: () => [],
    },
    allGuides: {
      type: Array,
      required: true,
    },
    allBeacons: Array,
    groupEndDate: String,
  },
  methods: {
    getAgeEmoji(age) {
      if (age < 18) {
        return '👶🏻'; // Kid emoji
      } else if (age > 65) {
        return '👴🏻'; // Senior
      } else {
        return ''; // No emoji for adults between 18 and 65
      }
    },
    getAgeStyle(age) {
      if (age < 18) {
        return {
          fontSize: '25px',
          backgroundColor: 'lightgreen',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          width: '33px',
          height: '33px'
        };
      } else if (age > 64) {
        return {
          fontSize: '25px',
          backgroundColor: 'lightcoral',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          width: '33px',
          height: '33px'
        };
      } else {
        return {};
      }
    },
    deleteGroup(groupId) {
      this.$emit('deleteGroup', groupId);
      this.refetchFuelPercentage();
    },
    emitRemoveGuide(guide) {
      this.$emit('removeGuide', guide);
    },
    emitRemoveClient(client) {
      console.log(client); // This should now correctly log the client object
      this.$emit('removeClient', { tripClientId: client.tripClientId, groupId: this.groupId });
      this.refetchFuelPercentage();
    },
    emitDateChange() {
      this.$emit('updateEndDate', { groupId: this.groupId, newEndDate: this.groupEndDate });
      this.refetchFuelPercentage();
    },
    assignBeacon(beaconId, tripClientId) {
      EquipmentDataService.assignBeaconToTripClient(beaconId, tripClientId)
        .then(() => {
          console.log(`Beacon ${beaconId} assigned to TripClient ${tripClientId} successfully.`);
        })
        .catch(error => {
          console.error("Error assigning beacon to trip client:", error);
        });
    },
    onBeaconSelect(clientIndex) {
      const client = this.localClients[clientIndex];
      if (client.selectedBeaconId && client.tripClientId) {
        this.assignBeacon(client.selectedBeaconId, client.tripClientId);
      }
    },
    initializeClients() {
      this.localClients = this.clients.map(client => ({
        ...client,
        selectedBeaconId: client.beacon ? client.beacon.beaconid : null,
      }));
    },
    refetchFuelPercentage() {
      TripDataService.getTripGroupFuelPercentage(this.groupId)
        .then(response => {
          this.fuelPercentage = response.data.fuelPercentage;
        })
        .catch(error => {
          console.error("Error fetching fuel percentage:", error);
        });
    }
  },
  data() {
    return {
      isCollapsed: true,
      localClients: this.clients || [],
      continueTillDate: this.groupEndDate || '',
      fuelPercentage: 0,
    };
  },
  watch: {
    clients: {
      handler(newValue) {
        this.localClients = newValue || [];
        this.refetchFuelPercentage();
      },
      deep: true,
      immediate: true,
    }
  },
  computed: {
    clientCount() {
      return this.localClients ? this.localClients.length : 0;
    },
    totalWeight() {
      return this.localClients.reduce((total, client) => {
        const weight = parseInt(client.person && client.person.weight);
        return total + (isNaN(weight) ? 0 : weight);
      }, 0);
    },
    selectedGuideId: {
      get() {
        if (this.guide && this.guide.guideid) {
          const matchingGuide = this.allGuides.find(guide => guide.staffid === this.guide.guideid);
          return matchingGuide ? matchingGuide.staffid : '';
        }
        return '';
      },
      set(value) {
        if (value) {
          let guideObject = this.allGuides.find(guide => guide.staffid === value);
          if (guideObject) {
            this.$emit('update:guide', guideObject.staffid, this.groupId);
            this.refetchFuelPercentage();
          }
        }
      }
    },
  },
  created() {
    this.initializeClients();
    this.refetchFuelPercentage();
  },
};
</script>

<style scoped>
.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f5f5f5;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.group-info-container {
  display: flex;
  flex-direction: column;
}

.group-id-label {
  color: var(--primary-text-eph-color);
  margin-bottom: 10px;
}

.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 20px;
}

.trip-group {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  position: relative;
  margin-bottom: 15px;
}

.delete-group-btn {
  background-color: #dc3545;
  color: #fff;
  border-radius: 10px;
  border: none;
  position: absolute;
  bottom: 6px;
  right: 25%;
  cursor: pointer;
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-section,
.continue-section {
  margin-bottom: 10px;
}

.guide-dropdown {
  margin-bottom: 10px;
}

.group-members-label {
  margin-bottom: 10px;
}

.group-details {
  border: 1px solid #ccc;
  border-top: none;
  padding: 0 15px 15px;
  margin-bottom: 35px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.group-info {
  background-color: #333;
  color: #fff;
  font-size: 0.875rem;
  padding: 5px 10px;
  border-radius: 15px;
  display: inline-block;
}

.dropdown-text {
  display: block;
  background-color: #fff;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.continue-till-date {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
}

.clients-section {
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.clients-section .client-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.client-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #dedede;
  border-radius: 16px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.client-card {
  background-color: #dedede;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.client-information-section, .beacon-selection-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.beacon-selection-section select {
  flex-grow: 1;
}

.client-tag:hover {
  background-color: #ccc;
}

.remove-client-btn {
  margin-left: auto;
  width: 25px;
  background-color: #dc3545;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  padding: 0 6px;
  line-height: 1.5;
}

.remove-client-btn:hover {
  background-color: #c82333;
}
</style>
