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
    posts: [],
    allPostsAreShown: false,
    chosenPost: null,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    chosenProfile(state) {
      return state.chosenProfile;
    },
    chosenPost(state) {
      return state.chosenPost;
    },
    data(state) {
      return state.data;
    },
    posts(state) {
      return state.posts;
    },
    allPostsAreShown(state) {
      return state.allPostsAreShown;
    },
    firstPosts(state) {
      const firstPosts = [...state.posts].splice(0, 3);
      return firstPosts;
    },
  },
  mutations: {
    SET_IS_LOADING: (state, payload) => {
      state.isLoading = payload;
    },
    SET_CHOOSEN_PROFILE: (state, payload) => {
      state.chosenProfile = payload;
    },
    SET_CHOOSEN_POST: (state, payload) => {
      state.chosenPost = payload;
    },
    SET_ERROR_TEXT: (state, payload) => {
      state.errorText = payload;
    },
    SET_DATA: (state, payload) => {
      state.data = payload;
    },
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },
    SET_ALL_POSTS_ARE_SHOWN: (state) => {
      state.allPostsAreShown = !state.allPostsAreShown;
    },
  },
  actions: {
    showAllPosts: (context) => {
      context.commit("SET_ALL_POSTS_ARE_SHOWN");
    },
    getChosenProfile: (context, event) => {
      const clickedCard = event.target.closest(".profile-card");

      const chosenPerson = context.state.data.find(
        (elem) => elem.id === +clickedCard.dataset.userId
      );
      console.log(chosenPerson);
      context.commit("SET_CHOOSEN_PROFILE", chosenPerson);
    },
    getChosenPost: (context, event) => {
      const clickedPost = event.target.closest(".post-preview-card");
      // console.log(clickedPost.dataset.postId);
      const chosenPost = context.state.posts.find(
        (elem) => elem.id === +clickedPost.dataset.postId
      );
      console.log(chosenPost);
      context.commit("SET_CHOOSEN_POST", chosenPost);
    },
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
      }, 2000);
    },
    getChosenProfilePosts: (context) => {
      context.commit("SET_IS_LOADING", true);
      // context.commit("SET_CHOOSEBUTTON_IS_CLICKED", true);
      //setTimeout, чтобы показать лоадер
      setTimeout(() => {
        fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${context.state.chosenProfile.id}`
        )
          .then((response) => response.json())
          .then((data) => {
            try {
              if (data) {
                context.commit("SET_POSTS", data);
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
      }, 1000);
    },
  },
  modules: {},
});
