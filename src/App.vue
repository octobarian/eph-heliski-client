<template>
  <div id="app">
    <!-- Here is the Login section of the app, loaded first and acts like a wall to the rest of the app -->
    <div v-if="!authenticated" id="login">
      <header>
        <h1><i class="header-icon"></i> MECHSKI</h1>
      </header>
      <div id="container">
        <Greet v-if="!authenticated" @login="login" />
      </div>
    </div>
    <div v-if="authenticated && (role=='office' || role=='admin')">
      <!-- Office Dashboard -->
      <nav class="navbar navbar-expand-lg navbar-custom">
        <!-- Logo, Brand name -->
        <div style="padding-left: 2%; padding-right: 50px;">
          <img style="height:40px; margin-right:10px;" src="~@/assets/logo.svg">
          <router-link to="/" style="color: white;margin-left: 10px;" class="navbar-brand">EagleEX Office</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- DASHBOARD -->
            <li class="nav-item">
              <router-link to="/" class="nav-link">Dashboard</router-link>
            </li>
            <!-- DAILY TASK dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dailyDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Daily
              </a>
              <ul class="dropdown-menu" aria-labelledby="dailyDropdown">
                <router-link to="/shuttles" class="dropdown-item">Assign Shuttles</router-link>
                <router-link to="/runsadmin" class="dropdown-item">Runs/Zones Admin</router-link>
                <router-link to="/wildlifeadmin" class="dropdown-item">Wildlife Admin</router-link>
              </ul>
            </li>
            <li>|</li>
            <li>|</li>
            <!-- Bookings Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="bookingsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Bookings
              </a>
              <ul class="dropdown-menu" aria-labelledby="bookingsDropdown">
                <router-link to="/reservationlist" class="dropdown-item">Reservations</router-link>
              </ul>
            </li>
            <!-- People Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="peopleDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                People
              </a>
              <ul class="dropdown-menu" aria-labelledby="peopleDropdown">
                <router-link to="/stafflist" class="dropdown-item">Staff</router-link>
                <router-link to="/passengers" class="dropdown-item">Clients</router-link>
              </ul>
            </li>
            <!-- Equipment Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="equipmentDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Equipment
              </a>
              <ul class="dropdown-menu" aria-labelledby="equipmentDropdown">
                <router-link to="/beaconlist" class="dropdown-item">Beacons</router-link>
                <router-link to="/helicopterlist" class="dropdown-item">Helicopters</router-link>
                <router-link to="/shuttlelist" class="dropdown-item">Shuttles</router-link>
              </ul>
            </li>
            <li>|</li>
            <li>|</li>
            <!-- Reports Dropdown -->
            <li class="nav-item">
              <router-link to="/generatereports" class="nav-link">Reports</router-link>
            </li>
          </ul>
          <!-- Sign Out button placed to the right -->
          <ul class="navbar-nav">
            <li>
              <router-link style="padding-top: 7px;" to="/zauiinfo" class="nav-link zauicircle">
                <span :class="zauiStatusClass"></span>
              </router-link>
            </li>
            <!-- SETTINGS ICON -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="testingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                  <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
                </svg>
              </a>
              <ul class="dropdown-menu" aria-labelledby="testingDropdown">
                <router-link to="/zaui" class="dropdown-item">Zaui Testing</router-link>
              </ul>
            </li>
            <li class="nav-item">
              <a @click="logout" class="nav-link" style="cursor:pointer;">Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>
      <!-- THE ROUTER VIEW FOR THE ADMIN PAGE -->
      <div class="container mt-3">
        <router-view/>
      </div>
    </div>  

    <div v-if="authenticated && role=='guide'">
      <!-- Guide Dashboard -->
      <nav class="navbar navbar-expand-lg navbar-custom">
        <!-- Logo, Brand name -->
        <div style="padding-left: 2%; padding-right: 50px;">
          <img style="height:40px; margin-right:10px;" src="~@/assets/logo.svg">
          <router-link to="/" style="color: white;margin-left: 10px;" class="navbar-brand">EagleEx Guide</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdownGuide" aria-controls="navbarNavDropdownGuide" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavDropdownGuide">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- Trips Dropdown (if applicable, otherwise leave as a single link) -->
            <li class="nav-item">
              <router-link to="/trips" class="nav-link">Trips</router-link>
            </li>
            <!-- Reports Dropdown (if applicable, otherwise leave as a single link) -->
            <li class="nav-item">
              <router-link to="/generatereports" class="nav-link">Reports</router-link>
            </li>
            <!-- Other dropdowns as required -->
            <!-- ... other dropdowns ... -->
          </ul>
          <!-- Zaui Info and Sign Out button placed to the right -->
          <ul class="navbar-nav ml-auto">
            <li>
              <router-link style="padding-top: 7px;" to="/zauiinfo" class="nav-link zauicircle">
                <span :class="zauiStatusClass"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <a @click="logout" class="nav-link" style="cursor:pointer;">Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- THE ROUTER VIEW FOR THE GUIDE PAGE -->
      <div class="container mt-3">
        <router-view/>
      </div>
    </div> 
  </div>
</template>

<script>
import Greet from "./Greeting";

export default {
  name: "app",
  components: {
    Greet,
  },
  data() {
    return {
      email: null,
      body: null,
      showSignOut: false,
      authenticated: false,
      authState: null,

      role: 'office',
      zauiStatus: null,
      zauiStatusCheckInterval: null,

      vue_app_server_ip: process.env.VUE_APP_SERVER_IP,
      logout_address: process.env.VUE_APP_SERVER_IP + "/logout"
    };
  },
  computed: {
    zauiStatusClass() {
      if (!this.zauiStatus) return 'status-indicator grey';
      if (this.zauiStatus.responsemessage !== 'Pong') return 'status-indicator red';
      if (this.zauiStatus.responsetime > 2000) return 'status-indicator yellow';
      return 'status-indicator green';
    },
  },
  methods: {
    login(email, password) {

      let loginUrl = '';

      if (process.env.NODE_ENV === 'production') {
        //TODO: Make these into ENV variables
        loginUrl = 'https://eebackend.azurewebsites.net/login';
      } else {
        loginUrl = 'http://localhost:8080/login';
      }

      fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          this.authenticated = true;
          this.role = data.role;
          this.email = data.email;
          this.authState = 'Authorized';
          sessionStorage.setItem('role', this.role);
          sessionStorage.setItem('email', this.email);
        } else {
          this.authState = 'notAuthorized';
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
    },
    logout() {
      fetch(this.logout_address, {
        credentials: 'include'
      })
      .then(() => {
        this.authenticated = false;
        this.role = '';
        sessionStorage.clear();
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
    },
    fetchZauiStatus() {
      fetch(`${this.vue_app_server_ip}/zaui/zaui-status`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.zauiStatus = data;
      })
      .catch(error => {
        console.error(this.vue_app_server_ip);
        console.error('Error fetching Zaui status:', error);
      });
    },
    startZauiStatusCheck() {
      this.fetchZauiStatus();
      this.zauiStatusCheckInterval = setInterval(this.fetchZauiStatus, 1500000);
    },
    stopZauiStatusCheck() {
      if (this.zauiStatusCheckInterval) {
        clearInterval(this.zauiStatusCheckInterval);
      }
    },
  },
  mounted() {
    this.fetchZauiStatus();
    this.vue_app_server_ip = process.env.VUE_APP_SERVER_IP;
    this.logout_address = process.env.VUE_APP_SERVER_IP + "/logout";
    
    const role = sessionStorage.getItem('role');
    const email = sessionStorage.getItem('email');
    if (role && email) {
      this.role = role;
      this.email = email;
      this.authenticated = true;
    }

    this.startZauiStatusCheck();
  },
  beforeDestroy() {
    this.stopZauiStatusCheck();
  }
}
</script>


<style>
/* Style adjustments for mobile view and responsive behavior */
@media (max-width: 991px) {
    .navbar-custom {
        padding: 0; /* Remove padding on small screens */
    }

    .navbar-nav .nav-item, .zaui-info-link, #signout {
        margin: 0; /* Remove margins on small screens */
        border: none; /* Remove borders on small screens */
        padding: 0; /* Remove padding on small screens */
    }

    .navbar-toggler {
        border: none; /* Remove border from the toggler */
    }

    .navbar-toggler-icon {
        /* Adjust the SVG icon color if needed */
        background-image: url("data:image/svg+xml;charset=UTF-8,<svg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'><path stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/></svg>");
    }

    .navbar-nav {
        flex-direction: column; /* Stack nav items vertically on small screens */
        align-items: flex-start; /* Align nav items to the start */
    }

    #navbarNavDropdown {
        padding-left: 0; /* Remove the padding on smaller screens */
    }
}

.navbar-custom {
    background-color: #464440; /* Changed from black to white */
    border-bottom: 1px solid #666;
    align-items: center;
    display: flex; /* Use flexbox for alignment */
    justify-content: space-between; /* Space between logo and nav items */
    padding: 0 20px; /* Add padding to align items */
}

.navbar-brand {
    color: #ffffff; /* Changed from white to black */
    margin-right: 20px; /* Space after the logo */
}

.navbar-nav .nav-item {
    margin: 0 10px;
    padding: 5px 10px; /* Padding inside the border */
    background-color: #fff; /* White background for nav items */
    border-radius: 5px;
}

.navbar-nav .nav-link {
    color: #000; /* Text color */
    background: none;
    padding: 0 15px;
}

.navbar-nav .nav-item.dropdown:hover .nav-link, 
.navbar-nav .nav-item.dropdown:focus .nav-link {
    background-color: #e9ecef; /* Light grey background on hover/focus */
}

.navbar-nav .dropdown-menu {
    border: 1px solid #000; /* Black border for dropdown menus */
}

/* Additional styles for the dropdown items */
.dropdown-item {
    color: #000; /* Text color for dropdown items */
}

.dropdown-item:hover, .dropdown-item:focus {
    color: #fff; /* White text color on hover/focus */
    background-color: #333; /* Dark background on hover/focus */
}

#navbarNavDropdown {
    flex-grow: 1; /* Allow navbar to take up the appropriate space */
    justify-content: flex-end; /* Align nav items to the right */
}

#signout {
    background-color: #fff; /* White background */
    border: 1px solid #000; /* Black border */
    border-radius: 5px; /* Rounded corners */
    padding: 5px 15px; /* Padding */
    color: #000; /* Black color text */
}

#signout:hover {
    background-color: #e9ecef; /* Light grey background on hover */
}

header {
    background-color: grey; /* White background */
    border-bottom: 3px solid #000; /* Bottom border */
    display: flex; /* Use flexbox for layout */
    justify-content: flex-start; /* Align to the start */
    align-items: center; /* Center items vertically */
    padding: 20px 15%; /* Vertical padding and horizontal padding starting at 15% */
}

header h1 {
    font-size: 24px; /* Header font size */
    color: #ffffff; /* Header text color */
    margin: 0; /* Remove any default margin */
}

.header-icon {
    width: 20px; /* Width of the header icon */
    height: 20px; /* Height of the header icon */
    background: url('/src/assets/logo.png') no-repeat center; /* Background image for the header icon */
    background-size: cover; /* Ensure the image covers the area */
    margin-right: 10px; /* Space after the header icon */
}

.status-indicator {
    display: inline-block; /* Inline-block for the status indicators */
    width: 15px; /* Width of the indicators */
    height: 15px; /* Height of the indicators */
    border-radius: 50%; /* Make them circular */
}

/* Status colors */
.green { background-color: green; }
.yellow { background-color: yellow; }
.red { background-color: red; }
.grey { background-color: grey; }

</style>
