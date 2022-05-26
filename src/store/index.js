import { createStore } from "vuex";
import { moduleForPosts } from "./moduleForPosts";
import { moduleForPerson } from "./moduleForPerson";
import { moduleForComments } from "./moduleForComments";

const store = createStore({
  state: {
    //состояние для загрузки
    isLoading: false,
  },

  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_IS_LOADING: (state, payload) => {
      state.isLoading = payload;
    },
  },
  actions: {},
  modules: { moduleForPerson, moduleForPosts, moduleForComments },
});

export default store;
