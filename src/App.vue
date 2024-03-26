<!-- PACKAGE MANAGER APPLICATION UNDER SYSGEN-->
<!-- CREATED BY: Riley George GITHUB: https://github.com/octobarian -->
<!-- VERSION: 0, DATE PUBLISHED: 00-00-000 -->
<template>
  <div id="app">
    <!-- Here is the Login section of the app, loaded first and acts like a wall to the rest of the app -->
    <div v-if="!authenticated" id="login">
      <header>
        <h1><i class="header-icon"></i> MECHSKI</h1>
      </header>
      <div id="container">
        <Greet v-bind:email="email" v-bind:authState="authState" v-bind:boolShowSignOut="showSignOut" />
        <Update v-if="email" />
      </div>
    </div>
    <div v-if="authenticated && role=='office'">
      <!-- Here is the main app when we are logged in, basically just a navbar, the rest is handled by router -->
      <!-- This is the ADMIN Dashboard, below this is the GUIDE dashboard -->
      <nav class="navbar navbar-expand-lg navbar-custom">
        <!-- Logo, Brand name -->
        <div style="padding-left: 2%; padding-right: 50px;">
          <img style="height:40px; margin-right:px;" src="~@/assets/logo.svg">
          <router-link to="/" style="color: white;margin-left: 10px;" class="navbar-brand">EagleEX Office</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- Bookings Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="bookingsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Bookings
              </a>
              <ul class="dropdown-menu" aria-labelledby="bookingsDropdown">
                <router-link to="/reservationlist" class="dropdown-item">Reservations</router-link>
                <router-link to="/trips" class="dropdown-item">Trips</router-link>
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
              </ul>
            </li>
            <!-- Reports Dropdown -->
            <li class="nav-item">
              <router-link to="/generatereports" class="nav-link">Reports</router-link>
            </li>
            <!-- Testing Dropdown -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="testingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Testing
              </a>
              <ul class="dropdown-menu" aria-labelledby="testingDropdown">
                <router-link to="/zaui" class="dropdown-item">Zaui Testing</router-link>
              </ul>
            </li>

          </ul>
          <!-- Sign Out button placed to the right -->
          <ul class="navbar-nav">
            <li>
              <router-link style="padding-top: 7px;" to="/zauiinfo" class="nav-link zauicircle">
                <span :class="zauiStatusClass"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <a :href="vue_app_oauth_server_ip_logout" class="nav-link">Sign Out</a>
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
      <!-- This is the GUIDE Dashboard -->
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
              <a :href="vue_app_oauth_server_ip_logout" class="nav-link">Sign Out</a>
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
import Update from "./Update";

export default {
  name: "app",
  components: {
    Greet,
    Update
  },
  data() {
    return {
      email: null,
      body: null,
      showSignOut: false,
      authenticated: false,
      authState: null,

      role: null,
      zauiStatus: null,
      zauiStatusCheckInterval: null,

      vue_app_oauth_server_ip: process.env.VUE_APP_OAUTHSERVERIP+":"+process.env.VUE_APP_OAUTHSERVERPORT,
      vue_app_oauth_server_ip_logout: process.env.VUE_APP_OAUTHSERVERIP+":"+process.env.VUE_APP_OAUTHSERVERPORT+"/logout",
      vue_app_server_ip: process.env.VUE_APP_SERVERIP+":"+process.env.VUE_APP_SERVERPORT

    };
  },
  computed: {
    zauiStatusClass() {
      if (!this.zauiStatus) return 'status-indicator grey'; // No status
      if (this.zauiStatus.responsemessage !== 'Pong') return 'status-indicator red';
      if (this.zauiStatus.responsetime > 1000) return 'status-indicator yellow';
      return 'status-indicator green';
    },
  },

mounted() {

  this.fetchZauiStatus();

  this.vue_app_oauth_server_ip = process.env.VUE_APP_OAUTHSERVERIP+":"+process.env.VUE_APP_OAUTHSERVERPORT;
  this.vue_app_oauth_server_ip_logout = this.vue_app_oauth_server_ip+"/logout";
  this.vue_app_server_ip = process.env.VUE_APP_SERVERIP+":"+process.env.VUE_APP_SERVERPORT;

  fetch(`${this.vue_app_oauth_server_ip}/user`, {
    credentials: "include" // fetch won't send cookies unless you set credentials
  })
      .then((response) => response.json())
      .then((data) => {
        if (data.authState == "Authorized"){
          //Authenticated and Authorized
          //check for the users role, either they are office or guide
          console.log(JSON.stringify(data.introspectResponse));
          if(data.introspectResponse.roles){
            console.log(data.introspectResponse.roles);
            if(data.introspectResponse.roles.includes('Office')){this.role = 'office'}
            else if(data.introspectResponse.roles.includes('Guide')){this.role = 'guide'}
            else if(data.introspectResponse.roles.includes('admin')){this.role = 'office'} //TODO: Remove this later or choose an Admin page
            else {this.role=null}
            //role needs to be stored in user session so we can access it to decide which dashboard to show
            sessionStorage.setItem("role", this.role);
            
          }
          this.email = data.introspectResponse.email;
          sessionStorage.setItem("email", this.email);
          this.body = data.body;
          this.showSignOut = true;
          this.authenticated = true;
        }
        else if (data.authState == "notAuthorized"){
          //Authenticated, but not authorized to access mechski
          this.showSignOut = true;
          this.authenticated = false;
        }
        else if (data.authState == "notAuthenticated"){
          //niether Authenticated or Authorized
          this.showSignOut = false;
          this.authenticated = false;
        }
        this.authState = data.authState
      });
},
created() {
  //when App.vue is created, check for Zaui status
  this.startZauiStatusCheck();
},
beforeDestroy() {
  // Clear the interval when the component is destroyed to prevent memory leaks
  this.stopZauiStatusCheck();
},

methods: {
  // ... other methods ...
    fetchZauiStatus() {
      fetch(`${this.vue_app_server_ip}/zaui/zaui-status`, {
          credentials: 'include', // Include cookies in the request
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
      // Check immediately when the component is created
      this.fetchZauiStatus();
      // because were in app.vue for the navbar, the zauistatus is only checked once, make it so it checks on an interval.
      // Set an interval to check every hour (3600000 milliseconds)
      this.zauiStatusCheckInterval = setInterval(this.fetchZauiStatus, 1500000);
    },
    stopZauiStatusCheck() {
      if (this.zauiStatusCheckInterval) {
        clearInterval(this.zauiStatusCheckInterval);
      }
    }, 
  },
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
