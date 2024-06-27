<template>
  <div class="helicopter-list">
    <h1>Helicopter List</h1>
    <button class="btn btn-primary" @click="openCreateModal">Create Helicopter</button>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Model</th>
          <th>Call Sign</th>
          <th>Fuel Amount Total</th>
          <th>Weight</th>
          <th>Max Weight</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="helicopter in helicopters" :key="helicopter.helicopterid">
          <td>{{ helicopter.helicopterid }}</td>
          <td v-if="!helicopter.isEditing">{{ helicopter.model }}</td>
          <td v-else><input type="text" v-model="helicopter.model"></td>
          <td v-if="!helicopter.isEditing">{{ helicopter.callsign }}</td>
          <td v-else><input type="text" v-model="helicopter.callsign"></td>
          <td v-if="!helicopter.isEditing">{{ helicopter.fuelamounttotal }}</td>
          <td v-else><input type="number" v-model="helicopter.fuelamounttotal"></td>
          <td v-if="!helicopter.isEditing">{{ helicopter.weight }}</td>
          <td v-else><input type="number" v-model="helicopter.weight"></td>
          <td v-if="!helicopter.isEditing">{{ helicopter.maxweight }}</td>
          <td v-else><input type="number" v-model="helicopter.maxweight"></td>
          <td class="action-buttons">
            <button v-if="!helicopter.isEditing" class="btn btn-warning" @click="editHelicopter(helicopter)">Edit</button>
            <button v-if="!helicopter.isEditing" class="btn btn-danger" @click="deleteHelicopter(helicopter.helicopterid)">Delete</button>
            <button v-if="helicopter.isEditing" class="btn btn-success" @click="saveHelicopter(helicopter)">Save</button>
            <button v-if="helicopter.isEditing" class="btn btn-secondary" @click="cancelEdit(helicopter)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create Helicopter Modal -->
    <div class="modal fade" id="createHelicopterModal" tabindex="-1" aria-labelledby="createHelicopterModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createHelicopterModalLabel">Create New Helicopter</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createHelicopter">
              <div class="mb-3">
                <label for="model" class="form-label">Model</label>
                <input type="text" class="form-control" id="model" v-model="newHelicopter.model" required>
              </div>
              <div class="mb-3">
                <label for="callsign" class="form-label">Call Sign</label>
                <input type="text" class="form-control" id="callsign" v-model="newHelicopter.callsign" required>
              </div>
              <div class="mb-3">
                <label for="fuelamounttotal" class="form-label">Fuel Amount Total</label>
                <input type="number" class="form-control" id="fuelamounttotal" v-model="newHelicopter.fuelamounttotal" required>
              </div>
              <div class="mb-3">
                <label for="weight" class="form-label">Empty Weight</label>
                <input type="number" class="form-control" id="weight" v-model="newHelicopter.weight" required>
              </div>
              <div class="mb-3">
                <label for="maxweight" class="form-label">Gross Weight</label>
                <input type="number" class="form-control" id="maxweight" v-model="newHelicopter.maxweight" required>
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
      helicopters: [],
      newHelicopter: {
        model: '',
        callsign: '',
        fuelamounttotal: 0,
        weight: 0,
        maxweight: 0
      }
    };
  },
  methods: {
    fetchHelicopters() {
      EquipmentDataService.getHelicopters()
        .then(response => {
          this.helicopters = response.data.map(helicopter => ({
            ...helicopter,
            isEditing: false,
            originalData: { ...helicopter } // Store original data for cancel functionality
          }));
        })
        .catch(error => {
          console.error("Error fetching helicopters:", error);
        });
    },
    createHelicopter() {
      EquipmentDataService.createHelicopter(this.newHelicopter)
        .then(() => {
          this.fetchHelicopters(); // Refresh the list
          this.$bvModal.hide('createHelicopterModal'); // Hide the modal after creation
        })
        .catch(error => {
          console.error("Error creating helicopter:", error);
        });
    },
    editHelicopter(helicopter) {
      helicopter.isEditing = true;
    },
    saveHelicopter(helicopter) {
      EquipmentDataService.editHelicopter(helicopter.helicopterid, helicopter)
        .then(() => {
          helicopter.isEditing = false;
          helicopter.originalData = { ...helicopter }; // Update original data
          this.fetchHelicopters(); // Refresh the list
        })
        .catch(error => {
          console.error("Error updating helicopter:", error);
        });
    },
    cancelEdit(helicopter) {
      Object.assign(helicopter, helicopter.originalData); // Restore original data
      helicopter.isEditing = false;
    },
    deleteHelicopter(helicopterId) {
      if (confirm("Are you sure you want to delete this helicopter? This action cannot be undone.")) {
        EquipmentDataService.deleteHelicopter(helicopterId)
          .then(() => {
            alert("Helicopter deleted successfully.");
            this.fetchHelicopters(); // Refresh the list after deletion
          })
          .catch(error => {
            console.error("Error deleting helicopter:", error);
            alert("An error occurred while trying to delete the helicopter.");
          });
      }
    },
    openCreateModal() {
      // Reset the form
      this.newHelicopter = {
        model: '',
        callsign: '',
        fuelamounttotal: 0,
        weight: 0,
        maxweight: 0
      };
      this.$bvModal.show('createHelicopterModal');
    }
  },
  created() {
    this.fetchHelicopters();
  }
};
</script>

<style scoped>
/* Add styles here */
</style>
