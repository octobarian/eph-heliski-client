<template>
  <div class="client">
    <h2 class="page-title">Client Profile</h2>

    <div class="button-container">
      <button class="back-button" @click="editing ? editing = !editing : goBack()">Back</button>
      <button v-if="!editing" class="edit-button" @click="startEditing">Edit</button>
    </div>
    <section v-if="!editing">
      <section class="profile-section">
        <h3>Person Details</h3>
        <div class="profile-container">
          <div class="profile-photo">
            <div class="photo-placeholder">Future Client Photo Spot</div>
          </div>
          <div class="profile-details" v-if="person">
            <p><strong>First Name:</strong> {{ person.firstname }}</p>
            <p><strong>Last Name:</strong> {{ person.lastname }}</p>
            <p><strong>Mobile Phone:</strong> {{ person.mobilephone }}</p>
            <p><strong>Email:</strong> {{ person.email }}</p>
            <p><strong>Country:</strong> {{ person.country }}</p>
            <p><strong>Date of Birth:</strong> {{ person.dateofbirth }}</p>
            <p><strong>Weight:</strong> {{ person.weight }} kg</p>
          </div>
          <div class="loading" v-else>
            <p>Loading person details...</p>
          </div>
        </div>
      </section>

      <section class="profile-section">
        <h3>Health Records</h3>
        <div v-if="person">
          <div v-for="healthRecord in healthRecords" :key="healthRecord.id" class="health-record">
            <p><strong>Health Record ID:</strong> {{ healthRecord.id }}</p>
            <p><strong>Description:</strong> {{ healthRecord.description }}</p>
            <p><strong>Severity:</strong> {{ healthRecord.severity.description }}</p>
          </div>
        </div>
        <div v-else>
          <p>Loading person details...</p>
        </div>
      </section>

      <section class="profile-section">
        <h3 @click="toggleCustomFields" class="collapsible-header">
          Zaui Fields <span>{{ isCustomFieldsCollapsed ? '▼' : '▲' }}</span>
        </h3>
        <div v-show="!isCustomFieldsCollapsed">
          <div v-if="person && filteredCustomFields.length > 0">
            <div v-for="customField in filteredCustomFields" :key="customField.field_name" class="custom-field">
              <p><strong>{{ customField.field_name }}:</strong> {{ customField.field_value }}</p>
            </div>
          </div>
          <div v-else>
            <p>No custom fields available.</p>
          </div>
        </div>
      </section>

      <section>
        <h3>Trip History</h3>
        <!-- Future implementation for trip history -->
      </section>

      <section>
        <h3>Training Details</h3>
        <!-- Display and edit training details -->
      </section>
    </section>

    <!-- EDITING SECTION -->
    <section v-if="editing" class="edit-section">
      <h3>Edit Client Details</h3>
      <form @submit.prevent="updateClient">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" class="form-control" id="firstName" :placeholder="person.firstname" v-model="editableClient.firstname">
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" class="form-control" id="lastName" :placeholder="person.lastname" v-model="editableClient.lastname">
        </div>
        <div class="form-group">
          <label for="mobilePhone">Mobile Phone</label>
          <input type="text" class="form-control" id="mobilePhone" :placeholder="person.mobilephone" v-model="editableClient.mobilephone">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" :placeholder="person.email" v-model="editableClient.email">
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <input type="text" class="form-control" id="country" :placeholder="person.country" v-model="editableClient.country">
        </div>
        <div class="form-group">
          <label for="dateOfBirth">Date of Birth</label>
          <input type="date" class="form-control" id="dateOfBirth" :placeholder="person.dateofbirth" v-model="editableClient.dateofbirth">
        </div>
        <div class="form-group">
          <label for="weight">Weight</label>
          <input type="number" class="form-control" id="weight" :placeholder="person.weight" v-model="editableClient.weight">
        </div>

        <!-- Health Record Details Form Fields -->
        <div v-if="editableHealthRecords.length">
          <h4>Health Record</h4>
          <div v-for="(record, index) in editableHealthRecords" :key="index">
            <div class="form-group">
              <label for="description">Description</label>
              <input type="text" class="form-control" id="description" v-model="record.description">
            </div>
            <div class="form-group">
              <label for="severity">Severity</label>
              <select class="form-control" id="severity" v-model="record.severityid">
                <option v-for="severity in severities" :value="severity.id" :key="severity.id">
                  {{ severity.description }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </section>
  </div>
</template>

<script>
import ClientsDataService from "@/services/ClientsDataService";
import HealthDataService from "@/services/HealthDataService";

export default {
  name: 'Client',
  props: ['id'],
  data() {
    return {
      editing: false,
      client: null,
      person: null,
      healthRecords: [],
      trainingDetails: [],
      editableClient: null,
      editableHealthRecords: [],
      severities: [],
      isCustomFieldsCollapsed: true, // State to manage the collapse of custom fields
    };
  },
  methods: {
    startEditing() {
      this.editing = true;
      this.editableClient = JSON.parse(JSON.stringify(this.client));
      this.editableHealthRecords = JSON.parse(JSON.stringify(this.client.person.personhealth));
      this.fetchSeverities();
    },
    goBack() {
      this.$router.go(-1);
    },
    fetchSeverities() {
      HealthDataService.fetchSeverities()
        .then(response => {
          this.severities = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    fetchClientData() {
      // Fetch client data by id
      ClientsDataService.get(this.id)
        .then(response => {
          console.log(response);
          this.client = response.data;
          this.person = response.data.person;
          this.customFields = response.data.person.customFields;
          // Additional fetch calls to get health records and training details
          this.healthRecords = response.data.person.personhealth;
        })
        .catch(e => {
          console.error(e);
        });
    },
    updateClient() {
      // Prepare data to be sent, including health records
      const updateData = {
        client: this.editableClient,
        healthRecords: this.editableHealthRecords
      };
      // Make API call to update client and health records
      ClientsDataService.update(this.editableClient.clientid, updateData)
        .then(response => {
          // Update data with response
          this.client = response.data.client;
          this.person = response.data.person;
          this.healthRecords = response.data.person.personhealth;
          this.editing = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    toggleCustomFields() {
      this.isCustomFieldsCollapsed = !this.isCustomFieldsCollapsed;
    }
  },
  created() {
    // Get the client by the ID
    this.fetchClientData();
  },
  computed: {
    filteredCustomFields() {
      return this.customFields.filter(field => {
        // Check if field_value is not empty, not an empty object, and not an empty array
        const value = field.field_value;
        return value && value !== '{}' && (!Array.isArray(value) || value.length > 0);
      });
    }
  }
};
</script>

<style scoped>
.client {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-section {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
}

.profile-container {
  display: flex;
  flex-direction: row;
}

.profile-photo {
  flex: 0 0 150px;
  height: 150px;
  margin-right: 20px;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
  text-align: center;
}

.profile-details {
  flex: 1;
}

.profile-details p {
  margin: 5px 0;
}

.health-record {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
}

.save-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #0056b3;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.edit-button {
  background-color: var(--primary-eph-color);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.back-button {
  background-color: #ccc;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.edit-button:hover,
.back-button:hover {
  background-color: #999;
}

.back-button {
  background-color: #007bff;
}

.back-button:hover {
  background-color: #0056b3;
}

.collapsible-header {
  cursor: pointer;
}
</style>
