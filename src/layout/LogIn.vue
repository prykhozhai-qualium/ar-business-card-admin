<template>
  <form class="form log-in">
    <div class="log-in__title">QR Business card management</div>
    <label class="input-wrapper">
      <div class="input-title">User name</div>
      <input v-model="login" class="input" tabindex="1" type="text" />
    </label>
    <label class="input-wrapper">
      <div class="input-title">Password</div>
      <input v-model="password" class="input" tabindex="2" type="password" />
    </label>
    <div class="form__message">{{validation_message}}</div>
    <button @click="logIn" type="button" class="button" tabindex="3">Sign In</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LogIn",
  data(){
    return {
      login: "",
      password: "",
      validation_message: "",
    }
  },
  components: {},
  methods: {
    logIn(){
      if(this.login == "") {
        this.validation_message = "User name field is empty";
        return;
      }

      if(this.password == "") {
        this.validation_message = "Password field is empty";
        return;
      }

      this.$store.dispatch("logIn", {
        login: this.login,
        password: this.password,
      })
    }
  }
});
</script>
