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
}
// .button span {
//   position: relative;
//   display: block;
//   width: 100%;
//   height: 100%;
// }
// .button:before,
// .button:after {
//   position: absolute;
//   content: "";
//   right: 0;
//   bottom: 0;
//   background: rgba(251, 75, 2, 1);
//   box-shadow: 7px 7px 20px 0px rgba(255, 255, 255, 0.9),
//     4px 4px 5px 0px rgba(255, 255, 255, 0.9),
//     7px 7px 20px 0px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
//   transition: all 0.3s ease;
// }
// .button:before {
//   height: 0%;
//   width: 2px;
// }
// .button:after {
//   width: 0%;
//   height: 2px;
// }
// .button:hover {
//   color: rgba(251, 75, 2, 1);
//   background: transparent;
// }
// .button:hover:before {
//   height: 100%;
// }
// .button:hover:after {
//   width: 100%;
// }
// .button span:before,
// .button span:after {
//   position: absolute;
//   content: "";
//   left: 0;
//   top: 0;
//   background: rgba(251, 75, 2, 1);
//   box-shadow: 7px 7px 20px 0px rgba(255, 255, 255, 0.9),
//     4px 4px 5px 0px rgba(255, 255, 255, 0.9),
//     7px 7px 20px 0px rgba(0, 0, 0, 0.2), 4px 4px 5px 0px rgba(0, 0, 0, 0.3);
//   transition: all 0.3s ease;
// }
// .button span:before {
//   width: 2px;
//   height: 0%;
// }
// .button span:after {
//   height: 2px;
//   width: 0%;
// }
// .button span:hover:before {
//   height: 100%;
// }
// .button span:hover:after {
//   width: 100%;
// }
// .button:active {
//   top: 2px;
// }
// .choose-button {
//   margin-top: 140px;
//   @media screen and (max-width: 768px) {
//     margin-top: 40px;
//   }
// }
</style>
