/**детальная страница поста со списком всех комментариев */
<template>
  <main class="main">
    <div class="chosen-post-section">
      <h4
        class="section-title chosen-post-section-posts-title"
        v-if="chosenPost"
      >
        {{ chosenPost.title }}
      </h4>
      <p class="chosen-post-section-text">
        {{ chosenPost.body }}
      </p>
      <h5
        class="section-title chosen-post-section-posts-subtitle"
        v-if="chosenPost"
      >
        Комментарии
      </h5>
      <div class="chosen-post-section-container" v-if="chosenPost">
        <CommentComponent
          v-for="comment in comments"
          :key="comment.id"
          :commentName="comment.name"
          :commentText="comment.body"
          anotherClass=""
          :commentEmail="comment.email"
        />
        <ClockLoader v-if="isLoading && !commentIsAdding" />
        <div class="chosen-post-section-error">
          {{ errorTextForCommentsLoading }}
        </div>
      </div>
      <ButtonComponent
        buttonText="Добавить комментарий"
        anotherClass="chosen-post-section-button"
        v-on:click="handleClickAddComment"
      />
      <div class="chosen-post-section-add-comment" v-if="commentIsAdding">
        <div>
          <div class="add-comment-success" v-if="successText !== ''">
            {{ successText }}
          </div>
          <div v-if="successText === ''" class="add-comment-container">
            <div class="cl-btn-2" v-on:click="closeAddCommentMode">
              <div>
                <div class="leftright"></div>
                <div class="rightleft"></div>
                <span class="close-btn">закрыть</span>
              </div>
            </div>
            <label for="addCommentEmail" class="add-comment-label"
              >Напишите e-mail</label
            >
            <input
              type="text"
              class="add-comment-input"
              id="addCommentEmail"
              placeholder="Напишите e-mail"
              @change="checkEmail"
            />
            <div class="email-error">{{ this.emailError }}</div>
            <label for="addCommentName" class="add-comment-label"
              >Напишите название</label
            >
            <input
              type="text"
              class="add-comment-input"
              id="addCommentName"
              placeholder="Напишите название"
            />

            <textarea
              name="addComment"
              id="addCommentTextarea"
              class="add-comment-textarea"
              placeholder="Напишите свой комментарий"
            ></textarea>
            <ButtonComponent
              buttonText="Отправить"
              anotherClass="chosen-post-section-button"
              v-on:click="handleClickSendComment"
              :disabled="emailError !== ''"
            />
            <div class="add-comment-error">{{ errorTextForComment }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CommentComponent from "@/components/CommentComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import ClockLoader from "@/components/ClockLoader.vue";
import { mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    ButtonComponent,
    CommentComponent,

    ClockLoader,
  },
  mounted() {
    this.$store.dispatch("getChosenPostComments");
    this.$store.dispatch("closeAddCommentMode");
  },
  //emailError
  computed: {
    //ошибка при отправке комментария
    errorTextForComment() {
      return this.$store.getters.errorTextForComment;
    },
    //состояние для сохранения выбранного поста
    chosenPost() {
      const chosenPost = this.checkCosenPost();
      return chosenPost;
    },
    //состояние для загрузки
    isLoading() {
      return this.$store.getters.isLoading;
    },
    //состояние для сохранения комментариев
    comments() {
      return this.$store.getters.comments;
    },
    //состояние для перехода в режим добавления комментария
    commentIsAdding() {
      return this.$store.getters.commentIsAdding;
    },
    //текст при успешной отправке комментария
    successText() {
      return this.$store.getters.successText;
    },
    //ошибка при получении комментариев
    errorTextForCommentsLoading() {
      return this.$store.getters.errorTextForCommentsLoading;
    },
  },
  data() {
    return {
      emailError: "",
    };
  },

  methods: {
    ...mapActions({
      handleClickOnPostCard: "getChosenPost",
      handleClickAddComment: "addComment",
      handleClickSendComment: "sendComment",
      closeAddCommentMode: "closeAddCommentMode",
    }),

    checkEmail(event) {
      const reg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

      if (!event.target.value.match(reg)) {
        this.emailError =
          "Проверьте правильность написания адреса электронной почты.";
      } else {
        this.emailError = "";
      }
    },
    checkCosenPost() {
      let chosenPost;
      if (this.$store.getters.chosenPost === null) {
        chosenPost = JSON.parse(sessionStorage.getItem("chosenPost"));
      } else {
        chosenPost = this.$store.getters.chosenPost;
      }

      return chosenPost;
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.chosen-post-section {
  max-width: 1116px;
  margin: 0 auto;

  min-height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1146px) {
    margin: 0 20px;
  }
}

.chosen-post-section-container {
  margin-bottom: 30px;
}

.section-title {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 30px 0px;

  align-self: flex-start;
}

.chosen-post-section-text {
  font-family: "OpenSans-Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;

  color: rgba(0, 0, 0, 0.41);

  margin-bottom: 30px;
}

.chosen-post-section-posts-subtitle {
  font-size: 28px;
}

.chosen-post-section-button {
  color: #fff;
  background-color: $almostBlack;

  font-size: 18px;

  margin-bottom: 20px;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.61);
  }

  &:hover {
    @media screen and (min-width: 579px) {
      background: rgba(0, 0, 0, 0);
      color: $almostBlack;
      box-shadow: inset 0 0 0 3px $almostBlack;
    }
  }

  @media screen and (max-width: 400px) {
    height: fit-content;

    padding: 11.5px 35px;
  }
}

.chosen-post-section-add-comment {
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0px;
  left: 0px;

  background-color: $grey;
}

.add-comment-container {
  margin: 200px auto 50px;
  min-width: 300px;
  max-width: fit-content;
  padding: 30px 20px;

  position: relative;

  border: 1px solid rgba(0, 0, 0, 0.51);

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 992px) {
    margin: 150px auto 50px;
  }

  @media screen and (max-width: 320px) {
    min-width: 280px;
  }
}

.add-comment-input {
  background-color: $background;

  margin-bottom: 20px;
  height: 40px;
  width: 30vw;

  @media screen and (max-width: 992px) {
    width: 100%;
  }

  &::placeholder {
    font-family: "OpenSans-SemiBold", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 15px;

    color: #969696;
  }

  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.51);
  }
}

.add-comment-textarea {
  background-color: $background;
  margin-bottom: 30px;
  height: 100px;
  width: 30vw;

  @media screen and (max-width: 992px) {
    width: 100%;
  }

  &::placeholder {
    font-family: "OpenSans-SemiBold", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 15px;

    color: #969696;
  }

  &:focus {
    border: 2px solid rgba(0, 0, 0, 0.51);
  }
}

.add-comment-label {
  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;

  color: #969696;

  margin-bottom: 10px;
  text-align: start;

  width: 100%;

  &:first-of-type {
    margin-top: 50px;
  }
}

.email-error {
  margin-top: -15px;
  margin-bottom: 20px;

  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;

  color: brown;
}

.add-comment-success {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 0px 0px;
  margin-top: 250px;
  text-align: center;
}

.add-comment-error {
  color: brown;
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;

  margin: 0px 0px;
  text-align: center;
}

.chosen-post-section-error {
  color: brown;
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;

  margin: 0px 0px;
}

.cl-btn-2 {
  margin: 20px;
  display: flex;
  justify-content: center;

  position: absolute;
  right: 0px;
  top: 0px;
}
.cl-btn-2 div {
  cursor: pointer;
  position: relative;
  height: 68px;
  width: 50px;
}
.cl-btn-2 .leftright {
  height: 4px;
  width: 50px;
  position: absolute;
  margin-top: 24px;
  background-color: #969696;
  border-radius: 2px;
  transform: rotate(45deg);
  transition: all 0.3s ease-in;
}
.cl-btn-2 .rightleft {
  height: 4px;
  width: 50px;
  position: absolute;
  margin-top: 24px;
  background-color: #969696;
  border-radius: 2px;
  transform: rotate(-45deg);
  transition: all 0.3s ease-in;
}
.cl-btn-2 .close-btn {
  margin: 54px 0 0 -5px;
  position: absolute;
  color: #969696;
  font-family: Tahoma, sans-serif;
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease-in;
  opacity: 0;
}
.cl-btn-2 div:hover .leftright {
  @media screen and (min-width: 579px) {
    transform: rotate(-45deg);
    background-color: #969696;
  }
}
.cl-btn-2 div:hover .rightleft {
  @media screen and (min-width: 579px) {
    transform: rotate(45deg);
    background-color: #969696;
  }
}
.cl-btn-2 div:hover .close-btn {
  @media screen and (min-width: 579px) {
    opacity: 1;
  }
}
</style>
