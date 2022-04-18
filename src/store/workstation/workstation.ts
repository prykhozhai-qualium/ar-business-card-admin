import IWorkstationState from "@/interfaces/Workstation";
import { Module } from "vuex";
import CardEditorMode from "@/enums/CardEditorMode";

let getEmptyCard = (card?: any) => ({
  id: null as null | string,
  name: {
    value: card && card.name ? card.name : "",
    changed: false,
  },
  link: card && card.link ? card.link : "",
  email: {
    value: card && card.email ? card.email : "",
    changed: false,
  },
  vcf: {
    value: null,
    changed: false,
  },
  qrCode: null as null | Blob,
  mind: null,
  $state: {
    changed: false,
    updating: false,
  },
});

const Workstation: Module<IWorkstationState, any> = {
  namespaced: true,
  state: {
    card_editor: {
      mode: CardEditorMode.Create,
      selected_card: getEmptyCard(),
      active: false,
    },
    card_list: {
      list: [
        {
          id: 1,
          name: "Name",
          email: "email@gmail.com",
          link: "https://www.qualium-systems.com/",
          vcf: "#link",
          qrCode: "#link",
        },
        {
          id: 2,
          name: "Name 1",
          email: "email@gmail.com",
          link: "https://www.qualium-systems.com/1",
          vcf: "#link",
          qrCode: "#link",
        },
        {
          id: 3,
          name: "Name 2",
          email: "email@gmail.com",
          link: "https://www.qualium-systems.com/2",
          vcf: "#link",
          qrCode: "#link",
        },
        {
          id: 4,
          name: "Name 3",
          email: "email@gmail.com",
          link: "https://www.qualium-systems.com/3",
          vcf: "#link",
          qrCode: "#link",
        },
      ],
    },
  },
  getters: {},
  mutations: {
    setCardEditorMode(
      state,
      {
        mode,
        card,
        save_card = false,
      }: {
        mode: CardEditorMode;
        card: any | undefined;
        save_card: boolean | undefined;
      }
    ) {
      if (!save_card) {
        Object.assign(state.card_editor.selected_card, getEmptyCard(card));
      }
      state.card_editor.active = true;
      state.card_editor.mode = mode;
    },
    cancelCardEditor(state) {
      state.card_editor.active = false;
    },
  },
  actions: {},
};

export default Workstation;
