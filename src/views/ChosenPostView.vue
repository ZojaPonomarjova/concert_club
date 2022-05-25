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
  },
  //emailError
  computed: {
    //ошибка при отправке комментария
    errorTextForComment() {
      return this.$store.getters.errorTextForComment;
    },
    //состояние для сохранения выбранного поста
    chosenPost() {
      return this.$store.getters.chosenPost;
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
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.chosen-post-section {
  width: 1116px;
  margin: 0 auto;

  min-height: calc(100vh - 70px);

  display: flex;
  flex-direction: column;
  align-items: center;
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

  border: 1px solid rgba(0, 0, 0, 0.51);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-comment-input {
  background-color: $background;

  margin-bottom: 20px;
  height: 40px;
  width: 30vw;

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
  //   padding: 50px 20px;

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
  //   margin-top: 250px;
}
</style>
