<template>
  <div>
    <h1 v-if="boolShowSignOut">
      <!-- Use environment variable for logout URL -->
      <a :href="logoutUrl">Sign Out</a>
    </h1>
    <h1 v-else>
      <!-- Use environment variable for login URL -->
      <a :href="loginUrl">Sign In</a>
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Access environment variables and store them in data properties
      loginUrl: process.env.VUE_APP_SERVERIP+":"+process.env.VUE_APP_SERVERPORT+"/login",
      logoutUrl: process.env.VUE_APP_SERVERIP+":"+process.env.VUE_APP_SERVERPORT+"/logout",
    };
  },
};
</script>
