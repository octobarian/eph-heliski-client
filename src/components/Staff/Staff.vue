<template>
    <div class="staff">
      <h2 class="page-title">Staff Profile</h2>
      
        <div class="button-container">
          <button class="back-button" @click="editing?editing=!editing:goBack()">Back</button>
          <button v-if="!editing" class="edit-button" @click="startEditing">Edit</button>
          <button v-if="editing" class="delete-button" @click="deleteStaff">Delete</button>
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
          <h3>Job Details</h3>
          <div v-if="staff">
            <p><strong>Job Title:</strong> {{ staff.job ? staff.job.jobtitle : 'N/A' }}</p>
            <!-- Add other job details here -->
          </div>
          <div v-else>
            <p>Loading job details...</p>
          </div>
        </section>
      </section>
      <!-- EDITING THE STAFF SECTION -->
      <section v-if="editing" class="edit-section">
        <h3>Edit Staff Details</h3>
        <form @submit.prevent="updateStaff">
          <div class="form-group profile-details">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" v-model="editablePerson.firstname">
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" v-model="editablePerson.lastname">
          </div>
          <div class="form-group">
            <label for="jobTitle">Job Title</label>
            <select class="form-control" id="jobTitle" v-model="editableStaff.jobid">
              <option v-for="job in jobs" :value="job.jobid" :key="job.jobid">
                {{ job.jobtitle }}
              </option>
            </select>
          </div>
          <!-- Add other input fields as needed -->
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </section>
      <!-- Add more sections as needed -->
    </div>
  </template>
  
  <script>
  import StaffDataService from "@/services/StaffDataService";
  
  export default {
    name: 'Staff',
    props: ['id'],
    data() {
      return {
        editing: false,
        staff: null,
        person: null,
        jobs: [],
        //editing features
        editableStaff: null,
        editablePerson: null,
      };
    },
    methods: {
      startEditing() {
        this.editing = true;
        // Make copies of the objects to avoid mutating the original data
        this.editableStaff = JSON.parse(JSON.stringify(this.staff));
        this.editablePerson = JSON.parse(JSON.stringify(this.person));
      },
      goBack() {
        this.$router.go(-1);
      },
      fetchStaffData() {
        // Fetch staff data by id
        StaffDataService.get(this.id)
          .then(response => {
            console.log(response);
            this.staff = response.data;
            this.person = response.data.person;
            // Handle other data fetching here
          })
          .catch(e => {
            console.error(e);
          });
      },
      updateStaff() {
        const updateData = {
          staff: this.editableStaff,
          person: this.editablePerson,
        };

        StaffDataService.update(this.editableStaff.staffid, updateData)
          .then(() => {
            // Assuming back-end only sends a success message
            // Manually update local data, or re-fetch data from server
            this.staff = { ...this.staff, ...this.editableStaff };
            this.person = { ...this.person, ...this.editablePerson };
            this.editing = false;
          })
          .catch(e => {
            console.error(e);
            // Optionally, handle different types of errors
          });
      },

      deleteStaff() {
        if (confirm('Are you sure you want to delete this staff member?')) {
          StaffDataService.delete(this.staff.staffid)
            .then(() => {
              alert('Staff member deleted successfully.');
              this.$router.push('/stafflist'); // Navigate to staff list
            })
            .catch(e => {
              console.error('Error deleting staff:', e);
              alert('Failed to delete staff member.');
            });
        }
      },

      fetchJobs() {
        StaffDataService.fetchJobs()
          .then(response => {
            this.jobs = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
    },
    created() {
      this.fetchStaffData();
      this.fetchJobs(); // Fetch job titles when component is created
    }
  };
  </script>
  
  <style scoped>

  .delete-button {
    background-color: #dc3545; /* Bootstrap danger color */
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #c82333; /* Darker shade for hover */
  }
  .client, .staff {
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
  
  .edit-button,
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
  
  