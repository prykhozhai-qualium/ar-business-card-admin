<template>
  <div class="enter">
    <LogIn />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LogIn from "@/layout/LogIn.vue";

export default Vue.extend({
  name: "Home",
  components: {
    LogIn,
  },
});
</script>
