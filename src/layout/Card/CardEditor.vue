<template>
  <div class="card-editor-wrapper">
    <div
      class="form card-editor"
      v-if="enums.CardEditorMode.Create == CardEditorMode"
    >
      <div class="card-editor__title">
        CREATE <br />
        NEW BUSINESS CARD
      </div>
      <label class="input-wrapper">
        <div class="input-title">Name</div>
        <input class="input" tabindex="1" type="text" />
      </label>
      <label class="input-wrapper">
        <div class="input-title">E-Mail</div>
        <input class="input" tabindex="2" type="email" />
      </label>
      <FileLoader></FileLoader>
      <div class="form__message">Validation message</div>
      <div class="form__col">
        <div class="form__row">
          <button
            @click="
              $store.commit('workstation/setCardEditorMode', {
                mode: enums.CardEditorMode.CreatingSecondaryFiles,
              })
            "
            type="button"
            class="button"
            tabindex="3"
          >
            Create
          </button>
          <button
            @click="cancelCardEditor"
            type="button"
            class="button button_theme_clear_error"
            tabindex="3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div
      class="form card-editor"
      v-if="enums.CardEditorMode.CreatingSecondaryFiles == CardEditorMode"
      :key="2"
    >
      <div class="form__title">Generation process</div>
      <div
        ref="qrCode"
        class="card-editor__qr-code card-editor__qr-code_hidden"
      ></div>
      <div ref="qrCodeProgress">0%</div>
    </div>
    <div
      class="form card-editor card-editor_size_large"
      v-if="enums.CardEditorMode.Edit == CardEditorMode"
    >
      <div class="card-editor__title">EDIT BUSINESS CARD</div>
      <div class="form__row">
        <div class="form__col">
          <div ref="qrCodeView" class="card-editor__qr-code"></div>
        </div>
        <div class="form__col form__col_size_large">
          <label class="input-wrapper">
            <div class="input-title">Link</div>
            <input
              disabled
              class="input"
              tabindex="1"
              type="text"
              value="https://www.qualium-systems.com/"
            />
          </label>
          <label class="input-wrapper">
            <div class="input-title">Name</div>
            <input class="input" tabindex="1" type="text" />
          </label>
          <label class="input-wrapper">
            <div class="input-title">E-Mail</div>
            <input class="input" tabindex="2" type="email" />
          </label>
          <FileLoader></FileLoader>
          <div class="form__message">Validation message</div>
          <div class="form__row">
            <button
              @click="startCreatingCard"
              type="button"
              class="button"
              tabindex="3"
            >
              Update
            </button>
            <button
              @click="
                $store.commit('workstation/setCardEditorMode', {
                  mode: enums.CardEditorMode.CreatingSecondaryFiles,
                })
              "
              type="button"
              class="button button_theme_clear_error"
              tabindex="3"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FileLoader from "@/components/File.vue";
import QRCodeStyling from "qr-code-styling";
import CanvasToDotMind from "@/helpers/CanvasToDotMind/CanvasToDotMind";
import CardEditorMode from "@/enums/CardEditorMode";

export default Vue.extend({
  name: "CardEditor",
  components: { FileLoader },
  data: () => ({
    qrCode: null as null | QRCodeStyling,
    enums: {
      CardEditorMode,
    },
  }),
  computed: {
    CardEditorMode(): CardEditorMode {
      return this.$store.state.workstation.card_editor.mode;
    },
  },
  watch: {
    CardEditorMode() {
      if (
        this.enums.CardEditorMode.CreatingSecondaryFiles == this.CardEditorMode
      ) {
        this.$nextTick().then(() => {
          this.generateQRCode(this.generateMindMap);
        });
      }
    },
  },
  methods: {
    cancelCardEditor() {
      this.$store.commit("workstation/cancelCardEditor");
    },
    startCreatingCard() {
      this.$store.commit("workstation/setCardEditorMode", {
        mode: this.enums.CardEditorMode.CreatingSecondaryFiles,
      });
    },
    generateQRCode(cb: any) {
      const qrCode = new QRCodeStyling({
        width: 150,
        height: 150,
        type: "canvas",
        data: "https://www.qualium-systems.com/",
        image: "./assets/logo.svg",
        dotsOptions: {
          color: "#000",
          gradient: {
            type: "linear",
            rotation: Math.PI / 4,
            colorStops: [
              {
                offset: -50,
                color: "#61CDFF",
              },
              {
                offset: 100,
                color: "#FFF",
              },
            ],
          },
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: undefined,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 4,
        },
      });

      qrCode.append(this.$refs.qrCode as HTMLElement);
      qrCode._canvasDrawingPromise?.finally(() => {
        cb();
      });

      this.qrCode = qrCode;

      // qrCode.download({ name: "qrCode", extension: "svg" });
    },
    async generateMindMap() {
      CanvasToDotMind({
        canvas: (this.$refs.qrCode as HTMLElement).querySelector(
          "canvas"
        ) as HTMLCanvasElement,
        progress_cb: (p: number) => {
          (this.$refs.qrCodeProgress as HTMLElement).innerHTML =
            p.toFixed(2).toString() + "%";
        },
        on_compile: (buffer) => {
          console.log(buffer);

          this.$store.commit("workstation/setCardEditorMode", {
            mode: this.enums.CardEditorMode.Edit,
          });
          this.$nextTick().then(() => {
            this.qrCode?.append(this.$refs.qrCodeView as HTMLElement);
            this.qrCode?.update();
          });
        },
      });
    },
  },
  mounted() {},
});
</script>
