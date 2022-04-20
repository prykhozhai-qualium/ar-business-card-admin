<template>
  <div class="card">
    <div class="card__col card__col_left">
      <div class="card__title">{{ card.name }}</div>
      <div class="card__subtitle">{{ card.email }}</div>
    </div>
    <div class="card__col card__col_right">
      <div class="card__icon-button" @click="openCard(card)">
        <i class="fa-solid fa-angle-right"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CardEditorMode from "@/enums/CardEditorMode";
export default Vue.extend({
  name: "Card",
  props: {
    card: Object,
  },
  data: () => ({
    enums: {
      CardEditorMode,
    },
  }),
  methods: {
    openCard(card: any) {
      this.$store.commit("workstation/setCardEditorMode", {
        mode: this.enums.CardEditorMode.Edit,
        card: this.card,
      });
    },
  },
});
</script>
