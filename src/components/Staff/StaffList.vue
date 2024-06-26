<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name" v-model="searchName" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchNameMethod">Search</button>
        </div>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createStaffModal">Create Staff</button>
      </div>
    </div>
    <div class="col-md-12">
      <h4>Staff List</h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">
              <div class="d-flex justify-content-between align-items-center">
                <span>Job Title</span>
                <div>
                  <label for="jobTitleFilter" class="visually-hidden">Filter by Job Title:</label>
                  <select class="form-select" id="jobTitleFilter" v-model="selectedJobTitle" @change="filterStaffByJobTitle">
                    <option value="">All</option>
                    <option v-for="job in jobs" :key="job.jobid" :value="job.jobtitle">{{ job.jobtitle }}</option>
                  </select>
                </div>
              </div>
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(staff, index) in filteredStaffs" :key="staff.staffid">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ staff.person.firstname }}</td>
            <td>{{ staff.person.lastname }}</td>
            <td>{{ staff.person.email }}</td>
            <td>{{ staff.job ? staff.job.jobtitle : 'N/A' }}</td>
            <td>
              <router-link :to="{ name: 'staff', params: { id: staff.staffid }}">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div ref="createStaffModal" class="modal fade" id="createStaffModal" tabindex="-1" aria-labelledby="createStaffModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createStaffModalLabel">Create New Staff Member</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveNewStaff">
              <div class="mb-3">
                <label for="staffFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="staffFirstName" v-model="newStaff.firstName" required>
              </div>
              <div class="mb-3">
                <label for="staffLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="staffLastName" v-model="newStaff.lastName" required>
              </div>
              <div class="mb-3">
                <label for="staffEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="staffEmail" v-model="newStaff.email" required>
              </div>
              <div class="mb-3">
                <label for="staffJobTitle" class="form-label">Job Title</label>
                <select class="form-select" id="staffJobTitle" v-model="newStaff.jobTitle" required>
                  <option value="" disabled>Select job title</option>
                  <option v-for="job in jobs" :key="job.jobid" :value="job.jobtitle">{{ job.jobtitle }}</option>
                </select>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="canLogin" v-model="newStaff.canLogin">
                <label class="form-check-label" for="canLogin">Can Login?</label>
              </div>
              <div v-if="newStaff.canLogin">
                <div class="mb-3">
                  <label for="staffPassword" class="form-label">Password</label>
                  <input type="password" class="form-control" id="staffPassword" v-model="newStaff.password" required>
                </div>
                <div class="mb-3">
                  <label for="staffRole" class="form-label">Role</label>
                  <select class="form-select" id="staffRole" v-model="newStaff.role" required>
                    <option value="office">Office</option>
                    <option value="guide">Guide</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StaffDataService from "../../services/StaffDataService.js";

export default {
  name: "staff-list",
  data() {
    return {
      newStaff: {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        canLogin: false,
        password: '',
        role: 'office'
      },
      staffs: [],
      jobs: [],
      searchName: "",
      selectedJobTitle: ""
    };
  },
  computed: {
    filteredStaffs() {
      if (this.selectedJobTitle === "inactive") {
        return this.staffs.filter(staff => staff.job && staff.job.jobtitle === "inactive");
      } else if (this.selectedJobTitle) {
        return this.staffs.filter(staff => staff.job && staff.job.jobtitle === this.selectedJobTitle);
      } else {
        return this.staffs.filter(staff => !staff.job || staff.job.jobtitle !== "inactive");
      }
    }
  },
  methods: {
    retrieveStaff() {
      StaffDataService.getAll()
        .then(response => {
          this.staffs = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveNewStaff() {
      const newStaffData = {
        jobid: this.jobs.find(job => job.jobtitle === this.newStaff.jobTitle).jobid,
        person: {
          firstname: this.newStaff.firstName,
          lastname: this.newStaff.lastName,
          email: this.newStaff.email,
        },
        canLogin: this.newStaff.canLogin,
        ...(this.newStaff.canLogin && {
          userLogin: {
            email: this.newStaff.email,
            password: this.newStaff.password,
            role: this.newStaff.role,
          }
        })
      };

      StaffDataService.create(newStaffData)
        .then(response => {
          this.staffs.push(response.data.staff);
          this.closeModalAndReset();
          this.retrieveStaff(); // Refetch the staff list
        })
        .catch(error => {
          console.error("Error creating staff:", error);
        });
    },
    closeModalAndReset() {
      const modal = this.$refs.createStaffModal;
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      this.newStaff = {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        canLogin: false,
        password: '',
        role: 'office'
      };
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
    searchNameMethod() {
      StaffDataService.findByName(this.searchName)
        .then(response => {
          this.staffs = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    filterStaffByJobTitle() {
      this.retrieveStaff(); // You might want to refetch the staff list if needed
    }
  },
  mounted() {
    this.retrieveStaff();
    this.fetchJobs();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 950px;
  margin: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group select {
  max-width: 150px; /* Adjust the width to match the Job Title column */
}
</style>
