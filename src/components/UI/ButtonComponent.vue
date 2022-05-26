/*компонент для кнопки */
<template>
  <button
    class="button"
    v-bind:class="[anotherClass]"
    v-on:click="$emit('handleClick')"
  >
    <span>{{ buttonText }}</span>
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    buttonText: String,
    anotherClass: String,
  },
  emits: ["handleClick"],
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/vars.scss";

.button {
  min-width: 205px;
  height: 40px;
  border: none;
  padding: 11.5px 52.5px;

  font-family: "Proximanova_bold";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  color: #000;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  outline: none;

  &:hover {
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.5);
  }
}
</style>
