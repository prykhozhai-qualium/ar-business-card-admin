import IWorkstationState from "@/interfaces/Workstation";
import { Module } from "vuex";
import CardEditorMode from "@/enums/CardEditorMode";
import Card from "@/templates/Card";
import axios from "axios";
import CardLink from "@/templates/CardLink";

import UserInstance from "@/services/UserInstance";

const Workstation: Module<IWorkstationState, any> = {
  namespaced: true,
  state: {
    card_editor: {
      mode: CardEditorMode.Create,
      selected_card: Card(),
      active: false,
    },
    card_list: {
      list: [],
    },
  },
  getters: {},
  mutations: {
    updateCardList(state, list: any[]) {
      state.card_list.list = [];
      list.forEach(element => {
        state.card_list.list.push(CardLink(element))
      });
    },
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
        state.card_editor.selected_card = Card(card);
      }
      state.card_editor.active = true;
      state.card_editor.mode = mode;
    },
    cancelCardEditor(state) {
      state.card_editor.active = false;
    },
  },
  actions: {
    async deleteCard(context, card_id){
      let card = [];

      let jwt = localStorage.getItem("jwt");

      if(!jwt){
        return;
      }

      let response = await UserInstance(jwt).delete("users", {
        params: {
          users: [card_id],
        },
      });

      context.dispatch("updateCardList");

    },
    async updateCardList(context) {
      let card = [];

      let jwt = localStorage.getItem("jwt");

      if(!jwt){
        return;
      }

      let response = await UserInstance(jwt).get("users", {
        params: {
          limit: 100,
        },
      })

      context.commit("updateCardList", response.data);
    },
  },
};

export default Workstation;
