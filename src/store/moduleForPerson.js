export const moduleForPerson = {
  state: () => ({
    //ошибка при загрузке юзеров
    errorTextForUsers: "",
    //состояние для отображения выбранного профиля
    chosenProfile: null,
    //состояние для полученных данных пользователей
    data: [],

    //состояние для сворачивания/разворачивания карточек юзеров
    allUsersAreShown: false,
  }),
  mutations: {
    SET_CHOOSEN_PROFILE: (state, payload) => {
      state.chosenProfile = payload;
    },

    SET_DATA: (state, payload) => {
      state.data = payload;
    },

    SET_ALL_USERS_ARE_SHOWN: (state) => {
      state.allUsersAreShown = !state.allUsersAreShown;
    },
    SET_FIRST_USERS: (state, payload) => {
      state.firstUsers = payload;
    },

    SET_ERROR_TEXT_FOR_USERS: (state, payload) => {
      state.errorTextForUsers = payload;
    },
  },
  actions: {
    showAllUsers: (context) => {
      context.commit("SET_ALL_USERS_ARE_SHOWN");
    },

    getChosenProfile: (context, event) => {
      const clickedCard = event.target.closest(".profile-card");

      const chosenPerson = context.state.data.find(
        (elem) => elem.id === +clickedCard.dataset.userId
      );

      context.commit("SET_CHOOSEN_PROFILE", chosenPerson);

      //сохраняю, чтобы не ломалось все при перезагрузке страницы
      sessionStorage.setItem("chosenPerson", JSON.stringify(chosenPerson));
    },

    getData: (context) => {
      context.commit("SET_IS_LOADING", true);
      context.commit("SET_ERROR_TEXT_FOR_USERS", "");
      //setTimeout, чтобы показать лоадер
      setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => {
            try {
              if (data) {
                const firstUsers = [...data].splice(0, 4);

                context.commit("SET_DATA", data);
                context.commit("SET_FIRST_USERS", firstUsers);
              }
              if (!data) {
                throw new Error(
                  "Попробуйте повторить запрос: пришли некорректные данные."
                );
              }
            } catch (error) {
              console.log(error);
              context.commit("SET_ERROR_TEXT_FOR_USERS", error);
            }
          })
          .catch((error) => {
            console.log(error);
            context.commit(
              "SET_ERROR_TEXT_FOR_USERS",
              "Проверьте свое соединение с сетью"
            );
          })
          .finally(() => {
            context.commit("SET_IS_LOADING", false);
          });
      }, 2000);
    },
  },
  getters: {
    chosenProfile(state) {
      return state.chosenProfile;
    },

    data(state) {
      return state.data;
    },

    firstUsers(state) {
      return state.firstUsers;
    },
    allUsersAreShown(state) {
      return state.allUsersAreShown;
    },

    errorTextForUsers(state) {
      return state.errorTextForUsers;
    },
  },
};
