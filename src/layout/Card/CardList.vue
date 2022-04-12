<template>
  <div class="card-list">
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <CardEditor v-if="card_editor_active" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "./Card.vue";
import CardEditor from "@/layout/Card/CardEditor.vue";
export default Vue.extend({
  name: "CardList",
  components: {
    Card,
    CardEditor,
  },
  computed: {
    card_editor_active() {
      return this.$store.state.workstation.card_editor.active;
    },
  },
});
</script>
