<template>
  <div class="card-list">
    <Card :card="card" v-for="card in card_list" :key="card.id"/>
    <CardEditor v-if="card_editor_active" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "./Card.vue";
import CardEditor from "@/layout/Card/CardEditor.vue";
export default Vue.extend({
  name: "CardList",
  data: () => ({
  }),
  components: {
    Card,
    CardEditor,
  },
  computed: {
    card_editor_active() {
      return this.$store.state.workstation.card_editor.active;
    },
    card_list(){
      return this.$store.state.workstation.card_list.list;
    }
  },
});
</script>
