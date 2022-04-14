<template>
  <div class="file">
    <input :accept="accept" style="display: none" type="file" ref="file" />
    <div class="file__title">{{ title }}</div>
    <div class="file__button" @click="trigger" data-cursor-link="true">
      {{ file_name || "Select" }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "File",
  props: {
    title: String,
    onChange: Function,
    accept: String,
  },
  data: () => ({
    file_name: false,
  }),
  methods: {
    trigger() {
      (this.$refs.file as HTMLElement).click();
    },
  },
  mounted() {
    (this.$refs.file as HTMLElement).onchange = (event: any) => {
      this.file_name = event.target.files[0].name;
      this.onChange(event);
    };
  },
});
</script>
