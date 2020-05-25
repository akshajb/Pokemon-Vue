import Vue from "vue";
import Vuex from "vuex";
import config from "../config";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sideBar: false,
    pokedexs: [],
    bgcolor: "",
  },
  getters: {},
  mutations: {
    showsidebar: (state) => {
      state.sideBar = true;
    },
    hidesidebar: (state) => {
      state.sideBar = false;
    },
    populatePokedexs: (state, payload) => {
      state.pokedexs = payload;
    },
    populateBackground: (state, payload) => {
      state.bgcolor = payload;
    },
  },
  actions: {
    setpokedexs: (context) => {
      axios
        .get(`${config.apiSrc}/`)
        .then((response) => {
          context.commit("populatePokedexs", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setbackground: (context, payload) => {
      context.commit("populateBackground", payload);
    },
  },
});
