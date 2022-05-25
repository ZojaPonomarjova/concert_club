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
    comments: [],
    allPostsAreShown: false,
    chosenPost: null,
    commentIsAdding: false,
    successText: "",
    errorTextForComment: "",
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
    comments(state) {
      return state.comments;
    },
    allPostsAreShown(state) {
      return state.allPostsAreShown;
    },
    firstPosts(state) {
      const firstPosts = [...state.posts].splice(0, 3);
      return firstPosts;
    },
    commentIsAdding(state) {
      return state.commentIsAdding;
    },
    successText(state) {
      return state.successText;
    },
    errorTextForComment(state) {
      return state.errorTextForComment;
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
    SET_COMMENTS: (state, payload) => {
      state.comments = payload;
    },
    SET_ALL_POSTS_ARE_SHOWN: (state) => {
      state.allPostsAreShown = !state.allPostsAreShown;
    },
    COMMENT_IS_ADDING: (state, payload) => {
      state.commentIsAdding = payload;
    },
    SET_SUCCESS_TEXT: (state, payload) => {
      state.successText = payload;
    },
    SET_ERROR_TEXT_FOR_COMMENT: (state, payload) => {
      state.errorTextForComment = payload;
    },
  },
  actions: {
    addComment: (context) => {
      context.commit("COMMENT_IS_ADDING", true);
      console.log("eeeee");
    },
    sendComment: (context) => {
      context.commit("SET_ERROR_TEXT_FOR_COMMENT", "");
      const emailInput = document.getElementById("addCommentEmail");
      const nameInput = document.getElementById("addCommentName");
      const bodyInput = document.getElementById("addCommentTextarea");
      if (
        emailInput.value !== "" &&
        nameInput.value !== "" &&
        bodyInput.value !== ""
      ) {
        fetch(
          `https://jsonplaceholder.typicode.com/comments/${context.state
            .comments[context.state.comments.length - 1].id++}`,
          {
            method: "PUT",
            body: JSON.stringify({
              id: context.state.comments[context.state.comments.length - 1]
                .id++,
              email: emailInput.value,
              name: nameInput.value,
              body: bodyInput.value,
              userId: context.state.chosenProfile.id,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(context.state.comments);
            console.log(response);
            if (response.name === nameInput.value) {
              const newComment = {
                id: +context.state.comments[context.state.comments.length - 1]
                  .id++,
                email: emailInput.value,
                name: nameInput.value,
                body: bodyInput.value,
              };
              const updatedComments = [].concat(context.state.comments);
              updatedComments.push(newComment);
              context.commit("SET_COMMENTS", updatedComments);
              context.commit("SET_SUCCESS_TEXT", "Успешно отправлено");
            }
          })
          .catch((error) => {
            console.log(error);
            context.commit(
              "SET_ERROR_TEXT_FOR_COMMENT",
              "Что-то пошло не так! Попробуйте еще раз."
            );
          })
          .finally(() => {
            setTimeout(() => {
              context.commit("SET_SUCCESS_TEXT", "");
              context.commit("COMMENT_IS_ADDING", false);
            }, 5000);
          });
      }
    },

    showAllPosts: (context) => {
      context.commit("SET_ALL_POSTS_ARE_SHOWN");
    },

    getChosenProfile: (context, event) => {
      const clickedCard = event.target.closest(".profile-card");

      const chosenPerson = context.state.data.find(
        (elem) => elem.id === +clickedCard.dataset.userId
      );
      // console.log(chosenPerson);
      context.commit("SET_CHOOSEN_PROFILE", chosenPerson);
    },
    getChosenPost: (context, event) => {
      const clickedPost = event.target.closest(".post-preview-card");
      // console.log(clickedPost.dataset.postId);
      const chosenPost = context.state.posts.find(
        (elem) => elem.id === +clickedPost.dataset.postId
      );
      // console.log(chosenPost);
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
                // console.log(data);
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
    getChosenPostComments: (context) => {
      context.commit("SET_IS_LOADING", true);

      //setTimeout, чтобы показать лоадер
      setTimeout(() => {
        fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${context.state.chosenPost.id}`
        )
          .then((response) => response.json())
          .then((comments) => {
            try {
              if (comments) {
                context.commit("SET_COMMENTS", comments);
                console.log(comments);
              }
              if (!comments) {
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

    getChosenProfilePosts: (context) => {
      context.commit("SET_IS_LOADING", true);

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
                // console.log(data);
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
