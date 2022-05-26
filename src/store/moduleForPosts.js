import store from "./index";

export const moduleForPosts = {
  state: () => ({
    //посты выбранного пользователя
    posts: [],

    //состояние для сворачивания/разворачивания постов
    allPostsAreShown: false,

    //выбранный пост
    chosenPost: null,

    //ошибка при загрузке постов
    errorTextForPosts: "",
  }),
  mutations: {
    SET_CHOOSEN_POST: (state, payload) => {
      state.chosenPost = payload;
    },
    SET_POSTS: (state, payload) => {
      state.posts = payload;
    },
    SET_ALL_POSTS_ARE_SHOWN: (state) => {
      state.allPostsAreShown = !state.allPostsAreShown;
    },
    SET_ERROR_TEXT_FOR_POSTS: (state, payload) => {
      state.errorTextForPosts = payload;
    },
  },
  actions: {
    showAllPosts: (context) => {
      context.commit("SET_ALL_POSTS_ARE_SHOWN");
    },

    getChosenPost: (context, event) => {
      const clickedPost = event.target.closest(".post-preview-card");

      const posts =
        context.state.posts.length !== 0
          ? context.state.posts
          : JSON.parse(sessionStorage.getItem("chosenPersonPosts"));

      const chosenPost = posts.find(
        (elem) => elem.id === +clickedPost.dataset.postId
      );

      context.commit("SET_CHOOSEN_POST", chosenPost);

      //сохраняю, чтобы не ломалось все при перезагрузке страницы
      sessionStorage.setItem("chosenPost", JSON.stringify(chosenPost));
    },

    getChosenProfilePosts: (context) => {
      context.commit("SET_IS_LOADING", true);
      context.commit("SET_ERROR_TEXT_FOR_POSTS", "");
      context.commit("SET_POSTS", []);

      const userId =
        store.state.moduleForPerson.chosenProfile !== null
          ? store.state.moduleForPerson.chosenProfile.id
          : JSON.parse(sessionStorage.getItem("chosenPerson")).id;
      //setTimeout, чтобы показать лоадер
      setTimeout(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            try {
              if (data) {
                context.commit("SET_POSTS", data);
                sessionStorage.setItem(
                  "chosenPersonPosts",
                  JSON.stringify(data)
                );
              }
              if (!data) {
                throw new Error(
                  "Попробуйте повторить запрос: пришли некорректные данные."
                );
              }
            } catch (error) {
              console.log(error);
              context.commit("SET_ERROR_TEXT_FOR_POSTS", error);
            }
          })
          .catch((error) => {
            console.log(error);
            context.commit(
              "SET_ERROR_TEXT_FOR_POSTS",
              "Проверьте свое соединение с сетью"
            );
          })
          .finally(() => {
            context.commit("SET_IS_LOADING", false);
          });
      }, 1000);
    },
  },
  getters: {
    chosenPost(state) {
      return state.chosenPost;
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
    errorTextForPosts(state) {
      return state.errorTextForPosts;
    },
  },
};
