import IWorkstationState from "@/interfaces/Workstation";
import { Module } from "vuex";
import CardEditorMode from "@/enums/CardEditorMode";
import Card from "@/templates/Card";
import axios from "axios";
import CardLink from "@/templates/CardLink";
import user_page_path from "@/computed/user_page_path";
import AccessLevel from "@/enums/AccessLevel";

import UserInstance from "@/services/UserInstance";

let request_wrapper = async (request: any) => {
  request.catch((e: any) => {
    alert("Error: " + e);
  })

  return await request;
}

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
    async updateUserCard(context, { id, email, name, mind, vcf }) {
      let jwt = localStorage.getItem("jwt");

      if (!jwt) {
        context.rootState.access_level = AccessLevel.NotAuthorized;
        return;
      }

      let user_card = new FormData()

      if (name)
        user_card.append("username", name);

      if (email)
        user_card.append("email", email);

      if (vcf)
        user_card.append("vcf", await vcf.arrayBuffer());

      if (mind)
        user_card.append("target", new File(mind, "target.mind"));

      await request_wrapper(UserInstance(jwt).patch("users/" + id, user_card, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }));
    },
    async createUserCard(context, card: any) {
      let jwt = localStorage.getItem("jwt");

      if (!jwt) {
        context.rootState.access_level = AccessLevel.NotAuthorized;
        return;
      }

      let user_card = new FormData()

      user_card.append("username", card.name);
      user_card.append("email", card.email);
      user_card.append("vcf", card.vcf);

      console.log(card)

      let response = await request_wrapper(UserInstance(jwt).post("users", user_card, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }));

      context.state.card_editor.selected_card.id = response.data.id;
      context.state.card_editor.selected_card.link = user_page_path(response.data.id)

      context.dispatch("updateCardList");
    },
    async deleteCard(context, card_id) {
      let card = [];

      let jwt = localStorage.getItem("jwt");

      if (!jwt) {
        context.rootState.access_level = AccessLevel.NotAuthorized;
        return;
      }

      let response = await request_wrapper(UserInstance(jwt).delete("users", {
        params: {
          users: [card_id],
        },
      }));

      context.dispatch("updateCardList");

    },
    async updateCardList(context) {
      let card = [];

      let jwt = localStorage.getItem("jwt");

      if (!jwt) {
        context.rootState.access_level = AccessLevel.NotAuthorized;
        return;
      }

      let response = await request_wrapper(UserInstance(jwt).get("users", {
        params: {
          limit: 100,
        },
      }));

      context.commit("updateCardList", response.data);
    },
  },
};

export default Workstation;
