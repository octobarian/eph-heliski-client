<template>
    <div class="client">
      <h2 class="page-title">Client Profile</h2>

      <div class="button-container">
        <button class="back-button" @click="editing?editing=!editing:goBack()">Back</button>
        <button v-if="!editing" class="edit-button" @click="startEditing">Edit</button>
      </div>
      <section v-if="!editing">
        <section class="profile-section">
          <h3>Person Details</h3>
          <div class="profile-details" v-if="person">
            <p><strong>First Name:</strong> {{ person.firstname }}</p>
            <p><strong>Last Name:</strong> {{ person.lastname }}</p>
            <!-- Add other person details here -->
          </div>
          <div class="loading" v-else>
            <p>Loading person details...</p>
          </div>
        </section>

        <section class="profile-section">
        <h3>Health Records</h3>
        <div v-if="person">
          <div v-for="healthRecord in healthRecords" :key="healthRecord.id" class="health-record">
              <p><strong>Health Record ID:</strong> {{ healthRecord.id }}</p>
              <p><strong>Description:</strong> {{ healthRecord.description }}</p>
              <p><strong>Severity:</strong> {{ healthRecord.severity.description }}</p>
              <!-- Add other health record details here -->
          </div>
        </div>
        <div v-else>
          <p>Loading person details...</p>
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
    <section v-if="editing" class="edit-section">
    <h3>Edit Client Details</h3>
    <form @submit.prevent="updateClient">
      <div class="form-group profile-details">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName" :placeholder="person.firstname" v-model="editableClient.firstname">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName" :placeholder="person.lastname" v-model="editableClient.lastname">
      </div>
      <!-- Add other input fields as needed -->

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
          <!-- Add other health record fields as needed -->
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
    },
    created() {
      //Get the client by the ID
      this.fetchClientData();
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
  
  .profile-details {
    margin-top: 10px;
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

.edit-button{
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
  </style>
  