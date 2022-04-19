<template>
  <div class="enter">
    <LogIn />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LogIn from "@/layout/LogIn.vue";
import AccessLevel from "@/enums/AccessLevel";

export default Vue.extend({
  name: "Home",
  components: {
    LogIn,
  },
  computed: {
    access_level() {
      return this.$store.state.access_level;
    },
  },
  watch: {
    access_level() {
      if (this.$store.state.access_level == AccessLevel.Authorized) {
        this.$router.push({name: "Home"});
      }
    },
  },
  mounted() {
    this.$store.commit("updateAccessLevel");

    if (this.$store.state.access_level == AccessLevel.Authorized) {
      this.$router.push({name: "Home"});
    }
  },
});
</script>
