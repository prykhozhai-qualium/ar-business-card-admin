<template>
  <div class="card">
    <div class="card__col card__col_left">
      <div class="card__title">User Name</div>
      <div class="card__subtitle">user-email@qualium-system.com</div>
    </div>
    <div class="card__col card__col_right">
      <div class="card__icon-button">
        <i class="fa-solid fa-angle-right"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Card",
});
</script>
