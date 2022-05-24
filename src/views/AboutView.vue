<template>
  <main class="main">
    <div class="user-section">
      <div class="user-section-data">
        <h5 class="user-name">Иванов Семен</h5>
      </div>
      <div class="black-line"></div>
      <div class="user-data">
        <div class="user-city">Иванов Семен</div>
        <div class="user-email">ivanov@mail.com</div>

        <div class="user-phone">+7 (821) 311-21-32</div>
        <div class="user-website">hildegard.org</div>
        <div class="user-company">
          <p>Romaguera-Crona</p>
          <p class="user-bs">harness real-time e-markets</p>
        </div>

        <!-- <div class="user-section-buttons-container">
          <ButtonComponent
            anotherClass="user-section-button"
            buttonText="Написать сообщение"
          />
          <ButtonComponent
            anotherClass="user-section-button"
            buttonText="Предложить сходить на концерт"
          />
        </div> -->
      </div>
      <div class="black-line"></div>
      <div class="user-section-posts">
        <div class="black-line"></div>
        <div class="posts-container">
          <h4 class="section-title user-section-posts-title">Посты</h4>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import ProfileCard from "../components/ProfileCard.vue";
import ClockLoader from "@/components/ClockLoader.vue";
import { mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    // ButtonComponent,
    // ProfileCard,
    // ClockLoader,
  },
  // mounted() {
  //   this.$store.dispatch("getData");
  //   console.log(this.$store.getters.data);
  // },

  // computed: {
  //   // //ошибка при загрузке
  //   // errorText() {
  //   //   return this.$store.getters.errorTextForPerson;
  //   // },
  //   // //данные пользователя
  //   data() {
  //     return this.$store.getters.data;
  //   },
  //   //вычисленный возраст
  //   isLoading() {
  //     return this.$store.getters.isLoading;
  //   },
  //   // //src для фото профиля
  //   // profileUrl() {
  //   //   return this.$store.getters.avatar;
  //   // },
  //   // //состояние для разворачивания сайдбара на маленьких экранах
  //   // minimizeSidebar() {
  //   //   return this.$store.getters.minimizeSidebar;
  //   // },
  // },
  // methods: {
  //   // ...mapActions({
  //   //   handleClickToggleSidebar: "minimizeSidebar",
  //   // }),
  // },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.user-section {
  margin-top: 36px;

  border: 1px solid black;

  min-height: calc(100vw - 70px);
}

.black-line {
  width: 100vw;
  height: 1px;
  background-color: black;
}

.user-section-data {
  width: 1116px;
  margin: 0 auto;

  border-left: 1px solid black;
  border-right: 1px solid black;
}

.user-name {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 0;
  padding: 11px 18px 13px;
}

.user-data {
  width: 1116px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  div:not(.user-section-buttons-container) {
    border-left: 1px solid #000;
    font-family: "OpenSans-Regular", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 17px;
    text-align: center;

    padding: 14px 20px 10px;

    display: flex;
    align-items: center;
  }
  div:last-child {
    border-right: 1px solid #000;
  }

  .user-bs {
    font-size: 14px;
    padding-top: 10px;

    color: #939393;
  }

  .user-company {
    flex-direction: column;
  }
}

.user-section-button {
  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;

  color: #ffffff;
  background-color: $almostBlack;

  padding-left: 28px;
  padding-right: 28px;

  justify-self: flex-end;
  :last-child {
    border-left: 1px solid $background;
  }
}

.user-section-buttons-container {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 0px 0px;
}

.user-section-posts {
  margin-top: 25px;
}

.posts-container {
  width: 1116px;
  margin: 0 auto;

  // border-left: 1px solid black;
  // border-right: 1px solid black;
}

.section-title {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 0;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
