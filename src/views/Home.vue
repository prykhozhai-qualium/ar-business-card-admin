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
export default Vue.extend({
  components: {
    Navbar,
    CardList,
  },
});
</script>
