<template>
    <div class="beacon-list">
      <h1>Beacon List</h1>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createBeaconModal">Create Beacon</button>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <!-- <th>Beacon ID</th> Dont need to display backend id-->
            <th>Attached To (as of {{ today }})</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(beacon) in beacons" :key="beacon.beaconid">
              <td>{{ beacon.beaconnumber }}</td>
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
                <td>{{ beacon.active ? 'Active' : 'Inactive' }}</td>
                <td class="action-buttons">

                    <!-- Delete Button -->
                    <button class="btn btn-danger" @click="deleteBeacon(beacon.beaconid)">
                    <!-- Trash Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                    </button>

                    <!-- Toggle Active/Inactive Button -->
                    <button class="btn btn-secondary" @click="toggleBeaconStatus(beacon.beaconid, !beacon.active)">
                    <!-- Eye Open/Closed Icon -->
                    <svg v-if="beacon.active" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708"/>
                    </svg>
                    </button>

                    <!-- Unlink Button (only shown if linked) -->
                    <button v-if="beacon.tripclient" class="btn btn-warning" @click="unlinkBeacon(beacon.beaconid)">
                    <!-- Link Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6z"/>
                    </svg>
                    </button>
                </td>
            </tr>
        </tbody>
      </table>
  
      <!-- Create Beacon Modal -->
      <div ref="createBeaconModal" class="modal fade" id="createBeaconModal" tabindex="-1" aria-labelledby="createBeaconModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createBeaconModalLabel">Create New Beacon</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createBeacon">
                <div class="mb-3">
                  <label for="beaconNumber" class="form-label">Beacon Number</label>
                  <input type="text" class="form-control" id="beaconNumber" v-model="newBeacon.beaconNumber" required>
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
          beaconNumber: ''
        },
        today: new Date().toISOString().split('T')[0]
      };
    },
    methods: {
    fetchBeacons() {
        EquipmentDataService.getAllBeacons()
          .then(response => {
            this.beacons = response.data;
            console.log(this.beacons);
          })
          .catch(error => {
            console.error("Error fetching beacons:", error);
          });
      },
    openCreateModal() {
        this.newBeacon.beaconNumber = '';
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
        // If isActive is true, reactivate the beacon
        EquipmentDataService.reactivateBeacon(beaconId)
        .then(() => {
            this.fetchBeacons(); // Refresh the list
        })
        .catch(error => {
            console.error("Error reactivating beacon:", error);
        });
    } else {
        // If isActive is false, deactivate the beacon
        EquipmentDataService.deactivateBeacon(beaconId)
        .then(() => {
            this.fetchBeacons(); // Refresh the list
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
              this.fetchBeacons(); // Refresh the list
              this.closeModalAndReset(); // Close the modal and reset the form
            })
            .catch(error => {
              console.error("Error creating beacon:", error);
            });
        },
    closeModalAndReset() {
            const modal = this.$refs.createBeaconModal;
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            
            // Remove the modal's backdrop
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
            }
            this.newBeacon.beaconNumber = ''; // Reset the form field
        },
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
  