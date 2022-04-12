import IWorkstationState from "@/interfaces/Workstation";
import { Module } from "vuex";
import CardEditorMode from "@/enums/CardEditorMode";

const Workstation: Module<IWorkstationState, any> = {
  state: {
    card_editor: {
      mode: CardEditorMode.Create,
      selected_card: null,
      active: false,
    },
  },
  getters: {},
  mutations: {},
  actions: {},
};

export default Workstation;
