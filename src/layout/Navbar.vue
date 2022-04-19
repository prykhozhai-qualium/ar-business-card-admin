<template>
  <div class="navbar">
    <div class="navbar__title">QR Business card management</div>
    <div class="navbar__list">
      <button
        type="button"
        class="button button_theme_clear"
        @click="openEditorToCreate"
      >
        Create new
      </button>
      <button @click="logOut" type="button" class="button">Sign out</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CardEditorMode from "@/enums/CardEditorMode";
export default Vue.extend({
  name: "Navbar",
  data: () => ({
    enums: {
      CardEditorMode,
    },
  }),
  methods: {
    openEditorToCreate() {
      this.$store.commit("workstation/setCardEditorMode", {
        mode: this.enums.CardEditorMode.Create,
      });
    },
    logOut(){
      this.$store.dispatch("logOut");
    }
  },
});
</script>
