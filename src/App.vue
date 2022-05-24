<template>
  <HeaderComponent />

  <router-view />
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
  },
};
</script>

<style lang="scss">
@import "./assets/styles/vars.scss";
#app {
  display: flex;
  flex-direction: column;
  background-color: $background;
}
* {
  box-sizing: border-box;
  text-decoration: none;
}
p {
  margin: 0;
}

body,
#app {
  height: 100%;
}
</style>
