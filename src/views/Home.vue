<template>
  <div class="home">
    <Navbar />
    <CardList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/layout/Navbar.vue";
import CardList from "@/layout/Card/CardList.vue";
import AccessLevel from "@/enums/AccessLevel";

export default Vue.extend({
  components: {
    Navbar,
    CardList,
  },
  computed: {
    access_level() {
      return this.$store.state.access_level;
    },
  },
  watch: {
    access_level() {
      if (this.$store.state.access_level == AccessLevel.NotAuthorized) {
        this.$router.push({name: "Enter"});
      }
    },
  },
  mounted() {
    this.$store.commit("updateAccessLevel");

    if (this.$store.state.access_level == AccessLevel.NotAuthorized) {
      this.$router.push({name: "Enter"});
    }
  },
});
</script>
