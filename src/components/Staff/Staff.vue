<template>
  <div class="staff">
    <h2 class="page-title">Staff Profile</h2>

    <div class="button-container">
      <button class="back-button" @click="editing ? editing = !editing : goBack()">Back</button>
      <button v-if="!editing" class="edit-button" @click="startEditing">Edit</button>
      <button v-if="editing" class="delete-button" @click="deleteStaff">Delete</button>
    </div>

    <section v-if="!editing">
      <section class="profile-section">
        <h3>Person Details</h3>
        <div class="profile-container">
          <div class="profile-photo">
            <div class="photo-placeholder">Future Staff Photo Spot</div>
          </div>
          <div class="profile-details" v-if="person">
            <p><strong>First Name:</strong> {{ person.firstname }}</p>
            <p><strong>Last Name:</strong> {{ person.lastname }}</p>
            <p><strong>Mobile Phone:</strong> {{ person.mobilephone }}</p>
            <p><strong>Email:</strong> {{ person.email }}</p>
            <p><strong>Country:</strong> {{ person.country }}</p>
            <p><strong>Date of Birth:</strong> {{ person.dateofbirth }}</p>
            <p><strong>Weight:</strong> {{ person.weight }} lbs</p>
          </div>
          <div class="loading" v-else>
            <p>Loading person details...</p>
          </div>
        </div>
      </section>

      <section class="profile-section">
        <h3>Job Details</h3>
        <div v-if="staff">
          <p><strong>Job Title:</strong> {{ staff.job ? staff.job.jobtitle : 'N/A' }}</p>
          <br>
          <p><strong>Can Login?:</strong> {{ canLogin ? 'True' : 'False' }}</p>
          <p><strong>EagleEX Role:</strong> {{ loginDetails.role }}</p>
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
          <label for="mobilePhone">Mobile Phone</label>
          <input type="text" class="form-control" id="mobilePhone" v-model="editablePerson.mobilephone">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" v-model="editablePerson.email">
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <input type="text" class="form-control" id="country" v-model="editablePerson.country">
        </div>
        <div class="form-group">
          <label for="dateOfBirth">Date of Birth</label>
          <input type="date" class="form-control" id="dateOfBirth" v-model="editablePerson.dateofbirth">
        </div>
        <div class="form-group">
          <label for="weight">Weight</label>
          <input type="number" class="form-control" id="weight" v-model="editablePerson.weight">
        </div>

        <div class="form-group">
          <label for="jobTitle">Job Title</label>
          <select class="form-control" id="jobTitle" v-model="editableStaff.jobid">
            <option v-for="job in jobs" :value="job.jobid" :key="job.jobid">
              {{ job.jobtitle }}
            </option>
          </select>
        </div>
        
        <!-- New section for login details -->
        <div class="form-group">
          <label for="canLogin">Can Login?</label>
          <input type="checkbox" id="canLogin" v-model="canLogin">
        </div>
        <div v-if="canLogin">
          <div class="form-group">
            <label for="loginEmail">Login Email</label>
            <input type="email" class="form-control" id="loginEmail" v-model="loginDetails.email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="loginDetails.password">
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select class="form-control" id="role" v-model="loginDetails.role">
              <option value="office">Office</option>
              <option value="guide">Guide</option>
            </select>
          </div>
        </div>

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
      // Editing features
      editableStaff: null,
      editablePerson: null,
      canLogin: false, // New data property for login checkbox
      loginDetails: {
        email: '',
        password: '',
        role: 'office'
      }
    };
  },
  methods: {
    startEditing() {
      this.editing = true;
      // Make copies of the objects to avoid mutating the original data
      this.editableStaff = JSON.parse(JSON.stringify(this.staff));
      this.editablePerson = JSON.parse(JSON.stringify(this.person));
      // Initialize login details if available
      if (this.canLogin && this.staff.logins && this.staff.logins.length > 0) {
        this.loginDetails = {
          email: this.staff.logins[0].email,
          password: '',
          role: this.staff.logins[0].role
        };
      } else {
        this.canLogin = false;
        this.loginDetails = {
          email: '',
          password: '',
          role: 'office'
        };
      }
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
          this.canLogin = response.data.logins && response.data.logins.length > 0;
          if (this.canLogin) {
            this.loginDetails = {
              email: response.data.logins[0].email,
              role: response.data.logins[0].role
            };
          } else {
            this.loginDetails = {
              email: '',
              role: 'N/A'
            };
          }
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
        canLogin: this.canLogin,
        userLogin: this.canLogin ? this.loginDetails : null
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
.staff {
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
</style>
