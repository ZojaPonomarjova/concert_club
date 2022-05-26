/*компонент для комментария */
<template>
  <div class="chosen-post-comment-container" v-bind:class="[anotherClass]">
    <p class="chosen-post-comment-email">{{ commentEmail }}</p>
    <p class="chosen-post-comment-name">{{ commentName }}</p>
    <p class="chosen-post-comment-text">{{ commentText }}</p>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  props: {
    commentName: String,
    commentText: String,
    anotherClass: String,
    commentEmail: String,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.chosen-post-comment-container {
  padding: 15px 10px 15px;
  margin-bottom: 20px;

  border: 1px solid rgba(0, 0, 0, 0.41);
}

.chosen-post-comment-name {
  font-family: "OpenSans-Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 23px;
  text-transform: capitalize;

  color: #000000;

  margin-bottom: 5px;
}

.chosen-post-comment-text {
  font-family: "OpenSans-Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;

  color: rgba(0, 0, 0, 0.41);

  margin-bottom: 10px;
}

.chosen-post-comment-email {
  font-family: "Proximanova_bold";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 17px;

  margin-bottom: 20px;
}
</style>
