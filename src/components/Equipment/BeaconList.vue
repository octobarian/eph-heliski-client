<template>
  <div class="beacon-list">
      <h1>Transceivers List</h1>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createBeaconModal">Create Transceivers</button>
      <table class="table">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Attached To (as of {{ today }})</th>
                  <th>Status</th>
                  <th>Inspection Date</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(beacon) in beacons" :key="beacon.beaconid">
                  <td v-if="!beacon.isEditing">{{ beacon.beaconnumber }}</td>
                  <td v-else><input type="text" v-model="beacon.beaconnumber" /></td>
                  <td>
                      <template v-if="beacon.tripClient && beacon.tripClient.client && beacon.tripClient.client.person">
                          <router-link :to="`/clients/${beacon.tripClient.client.clientid}`" class="client-link">
                              {{ beacon.tripClient.client.person.firstname }} {{ beacon.tripClient.client.person.lastname }}
                          </router-link>
                      </template>
                      <template v-else>
                          Unlinked
                      </template>
                  </td>
                  <td v-if="!beacon.isEditing">{{ beacon.active ? 'Active' : 'Inactive' }}</td>
                  <td v-else>
                      <select v-model="beacon.active">
                          <option :value="true">Active</option>
                          <option :value="false">Inactive</option>
                      </select>
                  </td>
                  <td v-if="!beacon.isEditing">{{ beacon.inspectionDate ? new Date(beacon.inspectionDate).toLocaleDateString() : 'N/A' }}</td>
                  <td v-else>
                      <input type="date" v-model="beacon.inspectionDate" />
                  </td>
                  <td class="action-buttons">
                      <button v-if="!beacon.isEditing" class="btn btn-warning" @click="editBeacon(beacon)">Edit</button>
                      <button v-if="!beacon.isEditing" class="btn btn-danger" @click="deleteBeacon(beacon.beaconid)">Delete</button>
                      <button v-if="beacon.isEditing" class="btn btn-success" @click="saveBeacon(beacon)">Save</button>
                      <button v-if="beacon.isEditing" class="btn btn-secondary" @click="cancelEdit(beacon)">Cancel</button>
                  </td>
              </tr>
          </tbody>
      </table>

      <!-- Create Beacon Modal -->
      <div ref="createBeaconModal" class="modal fade" id="createBeaconModal" tabindex="-1" aria-labelledby="createBeaconModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="createBeaconModalLabel">Create New Transceivers</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <form @submit.prevent="createBeacon">
                          <div class="mb-3">
                              <label for="beaconNumber" class="form-label">Transceivers Number</label>
                              <input type="text" class="form-control" id="beaconNumber" v-model="newBeacon.beaconNumber" required>
                          </div>
                          <div class="mb-3">
                              <label for="inspectionDate" class="form-label">Inspection Date</label>
                              <input type="date" class="form-control" id="inspectionDate" v-model="newBeacon.inspectionDate">
                          </div>
                          <button type="submit" class="btn btn-primary">Create</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import EquipmentDataService from "@/services/EquipmentDataService";

export default {
  data() {
      return {
          beacons: [],
          hoverStates: {},
          newBeacon: {
              beaconNumber: '',
              inspectionDate: ''
          },
          today: new Date().toISOString().split('T')[0]
      };
  },
  methods: {
      fetchBeacons() {
          EquipmentDataService.getAllBeacons()
              .then(response => {
                  this.beacons = response.data.map(beacon => ({
                      ...beacon,
                      isEditing: false,
                      originalData: { ...beacon }
                  }));
              })
              .catch(error => {
                  console.error("Error fetching beacons:", error);
              });
      },
      openCreateModal() {
          this.newBeacon.beaconNumber = '';
          this.newBeacon.inspectionDate = '';
          this.createBeaconModal.show();
      },
      showHoverBox(index) {
          this.$set(this.hoverStates, index, true);
      },
      hideHoverBox(index) {
          this.$set(this.hoverStates, index, false);
      },
      deleteBeacon(beaconId) {
          EquipmentDataService.deleteBeacon(beaconId)
              .then(() => {
                  this.fetchBeacons();
              })
              .catch(error => {
                  console.error("Error deleting beacon:", error);
              });
      },
      toggleBeaconStatus(beaconId, isActive) {
          if (isActive) {
              EquipmentDataService.reactivateBeacon(beaconId)
                  .then(() => {
                      this.fetchBeacons();
                  })
                  .catch(error => {
                      console.error("Error reactivating beacon:", error);
                  });
          } else {
              EquipmentDataService.deactivateBeacon(beaconId)
                  .then(() => {
                      this.fetchBeacons();
                  })
                  .catch(error => {
                      console.error("Error deactivating beacon:", error);
                  });
          }
      },
      unlinkBeacon(beaconId) {
          EquipmentDataService.unlinkBeaconFromTrip(beaconId)
              .then(() => {
                  this.fetchBeacons();
              })
              .catch(error => {
                  console.error("Error unlinking beacon:", error);
              });
      },
      createBeacon() {
          EquipmentDataService.createBeacon(this.newBeacon)
              .then(() => {
                  this.fetchBeacons();
                  this.closeModalAndReset();
              })
              .catch(error => {
                  console.error("Error creating beacon:", error);
              });
      },
      closeModalAndReset() {
          const modal = this.$refs.createBeaconModal;
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
              backdrop.parentNode.removeChild(backdrop);
          }
          this.newBeacon.beaconNumber = '';
          this.newBeacon.inspectionDate = '';
      },
      editBeacon(beacon) {
          beacon.isEditing = true;
      },
      saveBeacon(beacon) {
          EquipmentDataService.updateBeacon(beacon.beaconid, {
              beaconnumber: beacon.beaconnumber,
              active: beacon.active,
              inspectiondate: beacon.inspectionDate
          })
              .then(() => {
                  beacon.isEditing = false;
              })
              .catch(error => {
                  console.error("Error updating beacon:", error);
              });
      },
      cancelEdit(beacon) {
          beacon.beaconnumber = beacon.originalData.beaconnumber;
          beacon.active = beacon.originalData.active;
          beacon.inspectionDate = beacon.originalData.inspectionDate;
          beacon.isEditing = false;
      }
  },
  created() {
      this.fetchBeacons();
  }
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 5px;
}
.action-buttons button {
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.hover-box {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  display: none;
}
.hover-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.hover-box ul li {
  padding: 5px 10px;
  cursor: pointer;
}
.hover-box ul li:hover {
  background-color: #f0f0f0;
}
</style>
