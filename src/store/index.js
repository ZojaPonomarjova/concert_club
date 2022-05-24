import { createStore } from "vuex";
// import { moduleForPerson } from "./moduleforPerson";
// import { moduleForBeer } from "./moduleForBeer";

export default createStore({
  state: {
    //состояние для загрузки
    isLoading: false,
    //ошибка при загрузке
    errorText: "",
    //состояние для отображения выбранного профиля
    chosenProfile: null,
    //состояние для полученных данных
    data: [],
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    chosenProfile(state) {
      return state.chosenProfile;
    },
    data(state) {
      return state.data;
    },
  },
  mutations: {
    SET_IS_LOADING: (state, payload) => {
      state.isLoading = payload;
    },
    SET_CHOOSEN_PROFILE: (state, payload) => {
      state.chosenProfile = payload;
    },
    SET_ERROR_TEXT: (state, payload) => {
      state.errorText = payload;
    },
    SET_DATA: (state, payload) => {
      state.data = payload;
    },
  },
  actions: {
    getData: (context) => {
      context.commit("SET_IS_LOADING", true);
      //   context.commit("SET_CHOOSEBUTTON_IS_CLICKED", true);
      //setTimeout, чтобы показать лоадер
      setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => {
            try {
              if (data) {
                context.commit("SET_DATA", data);
                console.log(data);
              }
              if (!data) {
                throw new Error(
                  "Попробуйте повторить запрос: пришли некорректные данные."
                );
              }
            } catch (error) {
              console.log(error);
              context.commit("SET_ERROR_TEXT", error);
            }
          })
          .catch((error) => {
            console.log(error);
            context.commit(
              "SET_ERROR_TEXT",
              "Проверьте свое соединение с сетью"
            );
          })
          .finally(() => {
            context.commit("SET_IS_LOADING", false);
          });
      }, 5000);
    },
  },
  modules: {},
});
