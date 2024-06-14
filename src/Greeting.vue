<template>
  <div id="loginscreen">
    <div class="login-container">
      <img src="https://eaglepassheli.com/resources/themes/eaglepass/img/logo.svg?m=1690981199">
      <h3 class="login-message">Please log in</h3>
      <div>
        <input type="email" v-model="email" placeholder="Email" class="login-input"/>
        <input type="password" v-model="password" placeholder="Password" class="login-input"/>
        <button @click="login" class="login-button">Log In</button>
      </div>
      <div v-if="authState" class="authStateBox">{{ authState }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Greet',
  props: ["authState"],
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$emit('login', this.email, this.password);
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

.login-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: var(--primary-eph-color);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: var(--primary-eph-color-hover);
}
</style>
