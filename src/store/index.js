import { createStore } from "vuex";
// import { moduleForPerson } from "./moduleforPerson";
// import { moduleForBeer } from "./moduleForBeer";

export default createStore({
  state: {
    //состояние для загрузки
    isLoading: false,
    //ошибка при загрузке юзеров
    errorTextForUsers: "",
    //состояние для отображения выбранного профиля
    chosenProfile: null,
    //состояние для полученных данных пользователей
    data: [],
    //посты выбранного пользователя
    posts: [],
    //комментарии к выбранному посту
    comments: [],
    //состояние для сворачивания/разворачивания постов
    allPostsAreShown: false,
    //состояние для сворачивания/разворачивания карточек юзеров
    allUsersAreShown: false,
    //выбранный пост
    chosenPost: null,
    //состояние для перехода в режим добавления комментария
    commentIsAdding: false,
    //сообщение при успешной отправке комментария
    successText: "",
    //ошибка при отправке комментария
    errorTextForComment: "",
    //ошибка при загрузке постов
    errorTextForPosts: "",
    //ошибка при загрузке комментариев
    errorTextForCommentsLoading: "",
  },
  // },

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
    firstUsers(state) {
      return state.firstUsers;
    },
    allUsersAreShown(state) {
      return state.allUsersAreShown;
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
    errorTextForUsers(state) {
      return state.errorTextForUsers;
    },
    errorTextForPosts(state) {
      return state.errorTextForPosts;
    },
    errorTextForCommentsLoading(state) {
      return state.errorTextForCommentsLoading;
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
    SET_ALL_USERS_ARE_SHOWN: (state) => {
      state.allUsersAreShown = !state.allUsersAreShown;
    },
    SET_FIRST_USERS: (state, payload) => {
      state.firstUsers = payload;
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
    SET_ERROR_TEXT_FOR_USERS: (state, payload) => {
      state.errorTextForUsers = payload;
    },
    SET_ERROR_TEXT_FOR_POSTS: (state, payload) => {
      state.errorTextForPosts = payload;
    },
    SET_ERROR_TEXT_FOR_COMMENTS_LOADING: (state, payload) => {
      state.errorTextForCommentsLoading = payload;
    },
  },
  actions: {
    addComment: (context) => {
      context.commit("COMMENT_IS_ADDING", true);
    },

    closeAddCommentMode: (context) => {
      context.commit("COMMENT_IS_ADDING", false);
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
            // console.log(context.state.comments);
            // console.log(response);
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

    showAllUsers: (context) => {
      context.commit("SET_ALL_USERS_ARE_SHOWN");
    },

    getChosenProfile: (context, event) => {
      const clickedCard = event.target.closest(".profile-card");

      const chosenPerson = context.state.data.find(
        (elem) => elem.id === +clickedCard.dataset.userId
      );

      context.commit("SET_CHOOSEN_PROFILE", chosenPerson);
    },

    getChosenPost: (context, event) => {
      const clickedPost = event.target.closest(".post-preview-card");

      const chosenPost = context.state.posts.find(
        (elem) => elem.id === +clickedPost.dataset.postId
      );

      context.commit("SET_CHOOSEN_POST", chosenPost);
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
                // console.log(data);
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

    getChosenPostComments: (context) => {
      context.commit("SET_IS_LOADING", true);
      context.commit("SET_ERROR_TEXT_FOR_COMMENTS_LOADING", "");
      context.commit("SET_COMMENTS", []);

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
                // console.log(comments);
              }
              if (!comments) {
                throw new Error(
                  "Попробуйте повторить запрос: пришли некорректные данные."
                );
              }
            } catch (error) {
              console.log(error);
              context.commit("SET_ERROR_TEXT_FOR_COMMENTS_LOADING", error);
            }
          })
          .catch((error) => {
            console.log(error);
            context.commit(
              "SET_ERROR_TEXT_FOR_COMMENTS_LOADING",
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
      context.commit("SET_ERROR_TEXT_FOR_POSTS", "");
      context.commit("SET_POSTS", []);
      //setTimeout, чтобы показать лоадер
      setTimeout(() => {
        fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${context.state.chosenProfile.id}`
        )
          .then((response) => response.json())
          .then((data) => {
            try {
              if (data) {
                // console.log(data);
                context.commit("SET_POSTS", data);
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
  modules: {},
  // },
});
