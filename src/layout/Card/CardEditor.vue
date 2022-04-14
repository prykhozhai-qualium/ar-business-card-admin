<template>
  <div class="card-editor-wrapper" @click.self="cancelCardEditor">
    <div class="card-editor-workplane">
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
          <input v-model="card.name" class="input" tabindex="1" type="text" />
        </label>
        <label class="input-wrapper">
          <div class="input-title">E-Mail</div>
          <input v-model="card.email" class="input" tabindex="2" type="email" />
        </label>
        <FileLoader
          :title="'Upload VCF file'"
          :onChange="onVCFFileChange"
          accept="text/x-vcard"
        ></FileLoader>
        <div class="form__message">{{ validation.text }}</div>
        <div class="form__col">
          <div class="form__row">
            <button
              @click="startCreatingCard"
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
            <a
              ref="qrCodeDownload"
              href="#"
              class="card-editor__qr-code-download-button"
            >
              Download
            </a>
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
              <input
                @input="card.$state.changed = true"
                v-model="card.name"
                class="input"
                tabindex="1"
                type="text"
              />
            </label>
            <label class="input-wrapper">
              <div class="input-title">E-Mail</div>
              <input
                @input="card.$state.changed = true"
                v-model="card.email"
                class="input"
                tabindex="2"
                type="email"
              />
            </label>
            <FileLoader
              :title="
                card.vcf && !card.$state.changed
                  ? card.vcf.name
                  : 'Upload VCF file'
              "
              :onChange="onVCFFileChange"
              accept="text/x-vcard"
            ></FileLoader>
            <div class="form__message">{{ validation.text }}</div>
          </div>
        </div>
        <div class="form__row" style="">
          <button
            @click="startCreatingCard"
            type="button"
            class="button"
            tabindex="3"
            :disabled="!card.$state.changed"
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
</template>

<script lang="ts">
import Vue from "vue";
import FileLoader from "@/components/File.vue";
import QRCodeStyling from "qr-code-styling";
import CanvasToDotMind from "@/helpers/CanvasToDotMind/CanvasToDotMind";
import CardEditorMode from "@/enums/CardEditorMode";
import qrCodeOptions from "@/helpers/qrCodeOptions/qrCodeOptions";

export default Vue.extend({
  name: "CardEditor",
  components: { FileLoader },
  data: () => ({
    qrCode: null as null | QRCodeStyling,
    enums: {
      CardEditorMode,
    },
    validation: {
      text: null as null | string,
    },
    card: {
      id: null as null | string,
      name: "",
      email: "",
      vcf: null,
      qrCode: null as null | Blob,
      mind: null,
      $state: {
        changed: false,
        updating: false,
      },
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
    createFormData() {},
    clearCardState() {
      this.card.$state.changed = false;
      this.card.$state.updating = false;
      this.validation.text = "";
    },
    onVCFFileChange(e: any) {
      this.card.vcf = e.target.files[0];
      this.card.$state.changed = true;
    },
    cancelCardEditor() {
      this.$store.commit("workstation/cancelCardEditor");
    },
    startCreatingCard() {
      if (!this.card.name) {
        this.validation.text = "The name field must be written";
        return;
      }

      if (
        !String(this.card.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        this.validation.text = "Email is not valid";
        return;
      }

      if (!this.card.vcf) {
        this.validation.text = "Select vcf file";
        return;
      }

      this.$store.commit("workstation/setCardEditorMode", {
        mode: this.enums.CardEditorMode.CreatingSecondaryFiles,
      });
    },
    generateQRCode(cb: any) {
      const qrCode = new QRCodeStyling(qrCodeOptions("canvas") as any);

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
          // console.log(buffer);

          this.clearCardState();

          this.$store.commit("workstation/setCardEditorMode", {
            mode: this.enums.CardEditorMode.Edit,
          });

          this.$nextTick().then(() => {
            this.onCardCreated();
          });
        },
      });
    },
    onCardCreated() {
      this.qrCode = new QRCodeStyling(qrCodeOptions("svg") as any);
      this.qrCode?.append(this.$refs.qrCodeView as HTMLElement);
      this.qrCode._svgDrawingPromise?.finally(() => {
        let svg_text = `<svg class="logo-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" >
                ${(
                  (this.$refs.qrCodeView as HTMLElement).querySelector(
                    "svg"
                  ) as SVGSVGElement
                ).innerHTML!}
              </svg>`;

        this.card.qrCode = new Blob([svg_text], {
          type: "svg",
        });

        let qrCodeDownload = this.$refs.qrCodeDownload as HTMLLinkElement;

        (qrCodeDownload as any).download = "qrCode.svg";
        qrCodeDownload.href = URL.createObjectURL(this.card.qrCode);
        qrCodeDownload.dataset.downloadurl = [
          "svg",
          (qrCodeDownload as any).download,
          qrCodeDownload.href,
        ].join(":");
      });
    },
  },
  mounted() {},
});
</script>
