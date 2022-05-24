<template>
  <main class="main">
    <div class="main-picture-container">
      <div class="main-title-container">
        <h3 class="main-title">Twenty One Pilots</h3>
        <p class="main-subtitle">22.02.23 в 21:00</p>
      </div>
      <div class="main-button-container">
        <button class="next-prev-button">
          <img src="../assets/images/arrow_prev.svg" alt="arrow previous" />
        </button>
        <ButtonComponent anotherClass="main-button" buttonText="Купить билет" />
        <button class="next-prev-button next-prev-button_active">
          <img src="../assets/images/arrow_next.svg" alt="arrow next" />
        </button>
      </div>
      <div class="main-gradient-container"></div>
    </div>

    <section class="tickets-section">
      <h4 class="tickets-section-title section-title">Купили билеты</h4>
      <div class="tickets-section-cards-container">
        <!-- <div :v-if="!data">loading</div> -->
        <ClockLoader v-if="isLoading" />
        <ProfileCard
          v-for="profile in data"
          :v-if="data.length"
          :key="profile.id"
          :profileName="profile.name"
          :profileCity="profile.address.city"
          :anotherClass="profile - card_active"
          :userId="profile.id"
        />
        <!-- <ProfileCard
          profileName="Иванов семен"
          profileCity="Санкт-Петербург"
          anotherClass=""
        />
        <ProfileCard
          profileName="Иванов семен"
          profileCity="Санкт-Петербург"
          anotherClass=""
        />
        <ProfileCard
          profileName="Иванов семен"
          profileCity="Санкт-Петербург"
          anotherClass=""
        /> -->
      </div>
    </section>
    <section class="venue-section">
      <div class="venue-section-description">
        <h4 class="venue-section-title section-title">О площадке</h4>
        <div class="venue-description">
          <img
            src="../assets/images/scrollbar-thumb.svg"
            alt="scrollbar-thumbs"
            class="venue-description-scrollbar-thumbs"
          />
          <p class="venue-description-text_bold">
            Современная площадка для проведения концертов и других мероприятий
            любой сложности.
          </p>
          <p class="venue-description-text_medium">
            Мы предоставляем всю необходимую для организаторов инфраструктуру и
            готовые решения под все основные задачи любого события, а также
            современное оборудование, соответствующее самым высоким мировым
            стандартам.
          </p>
        </div>
      </div>
      <div class="venue-section-application">
        <p class="venue-section-application-text">
          Оставить заявку на проведение концерта
        </p>
        <textarea
          name="venueApplication"
          id="venueApplication"
          placeholder="Расскажите о вашем предложении"
          class="venue-section-application-textarea"
        ></textarea>
        <ButtonComponent
          anotherClass="venue-section-button"
          buttonText="Отправить"
        />
      </div>
    </section>
    <section class="about-group-section">
      <h4 class="about-group-section-title section-title">О группе</h4>
      <p class="about-group-section-text">
        Twenty One Pilots — американский дуэт из Колумбуса, штат Огайо. Группа
        образовалась в 2009 году и на данный момент состоит из Тайлера Джозефа и
        Джоша Дана. Коллектив самостоятельно выпустил два альбома: Twenty One
        Pilots в 2009 и Regional at Best в 2011.
      </p>
    </section>
  </main>
</template>

<script>
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import ProfileCard from "../components/ProfileCard.vue";
import ClockLoader from "@/components/ClockLoader.vue";
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    ButtonComponent,
    ProfileCard,
    ClockLoader,
  },
  mounted() {
    if (this.$store.getters.data.length === 0) {
      this.$store.dispatch("getData");
    }
    console.log(this.$store.getters.data);
  },

  computed: {
    // //ошибка при загрузке
    // errorText() {
    //   return this.$store.getters.errorTextForPerson;
    // },
    // //данные пользователя
    data() {
      return this.$store.getters.data;
    },
    //вычисленный возраст
    isLoading() {
      return this.$store.getters.isLoading;
    },
    // //src для фото профиля
    // profileUrl() {
    //   return this.$store.getters.avatar;
    // },
    // //состояние для разворачивания сайдбара на маленьких экранах
    // minimizeSidebar() {
    //   return this.$store.getters.minimizeSidebar;
    // },
  },
  methods: {
    // ...mapActions({
    //   handleClickToggleSidebar: "minimizeSidebar",
    // }),
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/vars.scss";
.main {
  flex: 1 0 auto;
  background-color: $background;

  max-width: 1116px;
  margin: 0 auto;
}

.main-picture-container {
  position: absolute;
  top: 10px;
  left: 0px;

  width: 100%;

  min-height: 500px;

  padding: 0 60px;

  background-image: url("../assets/images/6412a54272_1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-title-container {
  padding: 0 100px 66px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #000000 0%,
    rgba(0, 0, 0, 0) 100%
  );
  margin-top: 190px;
  margin-bottom: 34px;
}

.main-title {
  font-family: "AlegreyaSansSC-Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 60px;

  text-align: center;

  color: #ffffff;

  margin: 0;
  padding-top: 20px;
  padding-bottom: 10px;
}

.main-subtitle {
  font-family: "AlegreyaSansSC-Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;

  text-align: center;
  margin: 0;

  color: #ffffff;
}

.main-button-container {
  z-index: 10;
  width: 100%;

  display: flex;
  justify-content: space-between;
}

.main-button {
  margin-bottom: 45px;
}

.next-prev-button {
  height: 40px;
  width: 40px;
  border: 1px solid #ffffff;
  background: transparent;
}

.next-prev-button_active {
  background-color: #fff;
}

.main-gradient-container {
  background: linear-gradient(
    180deg,
    #000000 0%,
    rgba(0, 0, 0, 0.55) 23.22%,
    rgba(0, 0, 0, 0.14) 42.37%,
    rgba(0, 0, 0, 0) 56.3%
  );
  transform: matrix(1, 0, 0, -1, 0, 0);
  height: 282px;
  width: 100%;

  position: absolute;
  bottom: 0px;
  z-index: 5;
}

.section-title {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 0px;
}
.tickets-section-title {
  padding-top: 40px;
  margin-bottom: 16px;
}

.tickets-section {
  margin-top: 450px;

  padding: 0 60px 47px;

  background-color: $background;
}

.tickets-section-cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;
}

.venue-section {
  background-color: $background;
  padding: 0 60px 48px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}

.venue-section-description {
  width: calc(50% - 68px);
  padding-right: 68px;
  position: relative;
}

.venue-section-application {
  width: 50%;
  min-width: 559px;
  padding: 13px 26px;

  border: 2px solid #dadada;

  display: flex;
  flex-direction: column;
}

.venue-description {
  border-left: 2px solid rgba(13, 30, 75, 0.2);
}

.venue-section-title {
  margin-bottom: 16px;
}

.venue-description-text_bold {
  font-family: "OpenSans-Bold";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;

  margin-left: 42px;
}

.venue-description-text_medium {
  font-family: "OpenSans-SemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;

  color: #939393;

  margin-left: 42px;
}
.venue-description-scrollbar-thumbs {
  position: absolute;
  top: 45%;
  left: -3px;
}

.venue-section-application-text {
  font-family: "OpenSans-SemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 40px;

  margin-bottom: 15px;
}

.venue-section-application-textarea {
  width: calc(100% - 2px);
  height: 110px;
  padding: 10px 20px;
  margin-bottom: 20px;
  border: 1px solid $almostBlack;
  background-color: $background;
}
.venue-section-application-textarea::placeholder {
  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;

  color: #969696;
}

.venue-section-button {
  padding: 10px 20px;
  margin-bottom: 15px;
  min-width: 100px;

  background-color: $almostBlack;

  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;

  text-transform: capitalize;

  color: #ffffff;

  align-self: flex-end;
}

.about-group-section {
  margin-top: -1px;
  background-color: $background;
  padding: 0 60px 40px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.about-group-section-text {
  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  text-align: justify;

  color: #939393;

  margin-top: 15px;
  width: calc(100% - 168px);
}

.clock-loader {
  align-self: center;
}
</style>
