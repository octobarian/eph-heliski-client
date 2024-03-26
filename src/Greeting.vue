<template>
  <div id="loginscreen">
    <div class="login-container">
      <img src="https://eaglepassheli.com/resources/themes/eaglepass/img/logo.svg?m=1690981199">
      <h3 class="login-message">You are not logged in</h3>
      
      <div class="authStateBox">{{ authState }}</div>
       <!-- Added Sign In/Sign Out button here -->
      <h1>
        <a id="signInButton" :href="oauthServerUrl">Sign In</a>
      </h1>
    </div>
    <div class="login-container">
      <h3> DEBUGGING TIME:</h3>
      <p style="color: white;">Login URL: {{ oauthServerUrl }}</p>
      <p style="color: white;">OAUTH SERVER IP: {{ oauthServerIP }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Greet',
  props: ["email", "authState", "boolShowSignOut"],
  computed: {
    oauthServerUrl() {
      return process.env.VUE_APP_OAUTH_LOGIN_SERVER_URL;
    },
    oauthServerIP(){
      return process.env.VUE_APP_OAUTHSERVERIP;
    }
  }
};
</script>

<style>
#loginscreen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2f2f2;
    font-family: 'Arial', sans-serif;
    background-image: url('~@/assets/login-background.jpg'); /* Set the background image */
    background-size: cover; /* Cover the entire area */
    background-position: center; /* Center the background image */
    background-repeat: no-repeat; /* Do not repeat the background */
}

.login-message {
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;  /* Added a bit of margin for separation */
}

.login-container {
    width: 350px;
    padding: 40px;
    background-color: var(--dark-eph-color);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.authState-label {
    margin-top: 20px;
    font-weight: bold;
}

.authStateBox {
    margin-top: 10px;
    padding: 10px;
    background-color: #e6e6e6;  /* Lighter color for the box */
    border-radius: 25px;
    display: inline-block;
    color: #a0a0a0;  /* Gray text color */
    font-weight: bold;
}

h1 > a {
    display: inline-block;
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 5px;
    color: #fff;
    transition: background-color 0.2s, transform 0.2s;  /* Added transform for a slight scaling on hover */
    font-size: 18px;  /* Slightly bigger font for the button */
    margin-top: 30px;
}

h1 > a:hover {
    background-color: var(--primary-eph-color);
    transform: scale(1.05);  /* Slight scaling effect on hover */
}

/* Style for the Sign In button */
h1 > #signInButton {
    background-color: var(--primary-eph-color);
}


</style>

