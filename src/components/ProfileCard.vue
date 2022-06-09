/*компонент для карточки профиля */
<template>
  <router-link to="/about">
    <div
      class="profile-card"
      v-bind:class="[anotherClass]"
      v-bind:data-user-id="[userId]"
      v-on:click="$emit('handleClickOnCard', $event)"
    >
      <p class="profile-card-name">{{ profileName }}</p>
      <p class="profile-card-city">{{ profileCity }}</p>
      <ButtonComponent
        anotherClass="profile-card-button"
        buttonText="Смотреть профиль"
        v-bind:data-user-id="[userId]"
        v-on:click="$emit('handleClickOnCard', $event)"
      />
    </div>
  </router-link>
</template>

<script>
import ButtonComponent from "./UI/ButtonComponent.vue";
export default {
  name: "ProfileCard",
  props: {
    profileName: String,
    profileCity: String,
    anotherClass: String,
    userId: Number,
  },
  components: {
    ButtonComponent,
  },
  emits: ["handleClickOnCard"],
};
</script>

<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.profile-card {
  border: 2px solid #dadada;
  padding: 14px 14px;
  width: 240px;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  @media screen and (max-width: 616px) {
    width: 100%;

    max-width: 350px;
  }
}

.profile-card:not(.profile-card:last-child) {
  margin-right: 12px;
}

.profile-card:hover {
  border: 1px solid #000;
}

.profile-card-button {
  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;

  text-transform: capitalize;

  color: #ffffff;
  background-color: $almostBlack;

  padding: 10px 20px;
  min-width: 148px;

  &:hover {
    background: rgba(0, 0, 0, 0);
    color: $almostBlack;
    box-shadow: inset 0 0 0 3px $almostBlack;

    font-weight: 700;
    font-family: "OpenSans-Bold", sans-serif;
  }
}

.profile-card-name,
.profile-card-city {
  margin: 0;
}
.profile-card-name {
  font-family: "OpenSans-Bold";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 23px;
  text-transform: capitalize;

  color: #000000;

  margin-bottom: 5px;
}

.profile-card-city {
  font-family: "OpenSans-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;

  color: rgba(0, 0, 0, 0.41);

  margin-bottom: 35px;
}
</style>
