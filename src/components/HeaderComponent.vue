/*компонент для отображения хэдера */
<template>
  <header class="header">
    <router-link to="/">
      <p class="header-logo">CONCERT CLUB</p>
    </router-link>
    <input id="menu-toggle" type="checkbox" />
    <label class="menu-button-container" for="menu-toggle">
      <div class="menu-button"></div>
    </label>

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

  @media screen and (max-width: 768px) {
    padding: 0 40px;
  }
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

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
}

.header-button_visuallyImpaired {
  margin-right: 12px;
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: "";
  margin-top: -8px;
}

.menu-button::after {
  content: "";
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 991px) {
  .menu-button-container {
    display: flex;
  }
  .header-buttons {
    position: absolute;
    top: 0;
    margin-top: 50px;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  #menu-toggle ~ .header-buttons button {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    font-size: 0px;
  }
  #menu-toggle:checked ~ .header-buttons button {
    border: 1px solid #333;
    height: 3em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    font-size: 14px;
  }
  .header-buttons button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 1em 0;
    width: 100%;
    height: 50px;
  }
  .header-buttons button:not(:last-child) {
    border-bottom: 2px solid #444;
  }
}
</style>
