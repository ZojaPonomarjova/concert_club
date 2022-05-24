/*компонент для кнопки */
<template>
  <router-link to="/post">
    <div
      class="post-preview-card"
      v-bind:class="[anotherClass]"
      v-bind:data-post-id="[postId]"
      v-on:click="$emit('handleClickOnPostCard')"
    >
      <p class="profile-card-name">{{ profileName }}</p>
      <p class="profile-card-city">{{ profileCity }}</p>
      <ButtonComponent
        anotherClass="profile-card-button"
        buttonText="Смотреть профиль"
        v-on:click="$emit('handleClickOnCard')"
      />
    </div>
  </router-link>
</template>

<script>
import ButtonComponent from "./UI/ButtonComponent.vue";
export default {
  name: "PostPreview",
  props: {
    profileName: String,
    profileCity: String,
    anotherClass: String,
    postId: Number,
  },
  components: {
    ButtonComponent,
  },
  emits: ["handleClickOnPostCard"],
};
</script>

<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.profile-card {
  border: 2px solid #dadada;
  padding: 14px 14px;
  width: 240px;
  margin-bottom: 10px;
}

.profile-card:not(:last-child) {
  margin-right: 12px;
}

.profile-card_active {
  border: 1px solid #000;
}

.profile-card-button {
  font-family: "OpenSans-SemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;

  text-transform: capitalize;

  color: #ffffff;
  background-color: $almostBlack;

  padding: 10px 20px;
  min-width: 148px;
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
