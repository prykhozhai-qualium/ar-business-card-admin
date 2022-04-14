import IWorkstationState from "@/interfaces/Workstation";
import { Module } from "vuex";
import CardEditorMode from "@/enums/CardEditorMode";

const Workstation: Module<IWorkstationState, any> = {
  namespaced: true,
  state: {
    card_editor: {
      mode: CardEditorMode.Create,
      selected_card: null,
      active: false,
    },
  },
  getters: {},
  mutations: {
    setCardEditorMode(state, { mode }: { mode: CardEditorMode }) {
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
