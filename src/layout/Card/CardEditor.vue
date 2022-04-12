<template>
  <div class="card-editor-wrapper">
    <div class="form card-editor">
      <div class="card-editor__title">CREATE NEW BUSINESS CARD</div>
      <label class="input-wrapper">
        <div class="input-title">User name</div>
        <input class="input" tabindex="1" type="text" />
      </label>
      <label class="input-wrapper">
        <div class="input-title">Password</div>
        <input class="input" tabindex="2" type="password" />
      </label>
      <File></File>
      <div class="form__message">Validation message</div>
      <button type="button" class="button" tabindex="3">Sign In</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import File from "@/components/File.vue";
export default Vue.extend({
  name: "CardEditor",
  components: { File },
});
</script>
