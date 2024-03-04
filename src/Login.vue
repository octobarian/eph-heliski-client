<template>
  <h1 v-if="boolShowSignOut"><a href='http://localhost:8080/logout'>Sign Out</a></h1>
  <h1 v-else><a href='http://localhost:8080/login'>Sign In</a></h1>
</template>
<script>
export default {
  name: "Login",
  props: ["boolShowSignOut"],
};
</script>
