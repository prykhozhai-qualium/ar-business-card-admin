<template>
  <form class="form log-in">
    <div class="log-in__title">QR Business card management</div>
    <label class="input-wrapper">
      <div class="input-title">User name</div>
      <input class="input" tabindex="1" type="text" />
    </label>
    <label class="input-wrapper">
      <div class="input-title">Password</div>
      <input class="input" tabindex="2" type="password" />
    </label>
    <div class="form__message">Validation message</div>
    <button type="button" class="button" tabindex="3">Sign In</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LogIn",
  components: {},
});
</script>
