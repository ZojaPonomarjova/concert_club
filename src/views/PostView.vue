<template>
  <main class="main">
    <h5>post view</h5>
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
</style>
