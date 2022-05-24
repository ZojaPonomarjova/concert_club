/*компонент для отображения футера */
<template>
  <header class="header">
    <p class="header-logo">CONCERT CLUB</p>
    <div class="header-buttons">
      <ButtonComponent
        anotherClass="header-button header-button_visuallyImpaired"
        buttonText="Версия для слабовидящих"
      />
      <ButtonComponent
        anotherClass="header-button header-button_profile"
        buttonText="Мой профиль"
      />
    </div>
  </header>
</template>

<script>
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
export default {
  name: "HeaderComponent",
  components: {
    ButtonComponent,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.header {
  height: 70px;
  width: 100%;
  padding: 0 61px;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: $almostBlack;
}
.header-logo {
  font-family: "AlegreyaSansSC-Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 60px;

  text-align: center;
  text-transform: uppercase;

  color: #ffffff;

  margin: 0;
}

.header-button_visuallyImpaired {
  margin-right: 12px;
}
</style>
