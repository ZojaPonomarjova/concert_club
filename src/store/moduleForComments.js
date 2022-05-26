import store from "./index";

export const moduleForComments = {
  state: () => ({
    //комментарии к выбранному посту
    comments: [],
    //состояние для перехода в режим добавления комментария
    commentIsAdding: false,
    //сообщение при успешной отправке комментария
    successText: "",
    //ошибка при отправке комментария
    errorTextForComment: "",
    //ошибка при загрузке комментариев
    errorTextForCommentsLoading: "",
  }),
  mutations: {
    SET_COMMENTS: (state, payload) => {
      state.comments = payload;
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
        const userId =
          store.state.moduleForPerson.chosenProfile !== null
            ? store.state.moduleForPerson.chosenProfile.id
            : JSON.parse(sessionStorage.getItem("chosenPerson")).id;

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
              userId: userId,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
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
            }, 2000);
          });
      }
    },

    getChosenPostComments: (context) => {
      context.commit("SET_IS_LOADING", true);
      context.commit("SET_ERROR_TEXT_FOR_COMMENTS_LOADING", "");
      context.commit("SET_COMMENTS", []);

      const postId =
        store.state.moduleForPosts.chosenPost !== null
          ? store.state.moduleForPosts.chosenPost.id
          : JSON.parse(sessionStorage.getItem("chosenPost")).id;

      //setTimeout, чтобы показать лоадер
      setTimeout(() => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
          .then((response) => response.json())
          .then((comments) => {
            try {
              if (comments) {
                context.commit("SET_COMMENTS", comments);
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
  },
  getters: {
    comments(state) {
      return state.comments;
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

    errorTextForCommentsLoading(state) {
      return state.errorTextForCommentsLoading;
    },
  },
};
