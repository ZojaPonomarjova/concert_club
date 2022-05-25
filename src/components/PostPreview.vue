/*компонент для кнопки */
<template>
  <router-link to="/chosen-post">
    <div
      class="post-preview-card"
      v-bind:class="[anotherClass]"
      v-bind:data-post-id="[postId]"
      v-on:click="$emit('handleClickOnPostCard', $event)"
    >
      <p class="post-preview-title">{{ postTitle }}</p>
      <p class="post-preview-text">{{ postText }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "PostPreview",
  props: {
    postTitle: String,
    postText: String,
    anotherClass: String,
    postId: Number,
  },
  components: {
    // ButtonComponent,
  },
  emits: ["handleClickOnPostCard"],
};
</script>

<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.post-preview-card {
  border: 1px solid #000;
  padding: 14px 23px 17px 35px;
  // min-width: 240px;
  // max-width: 350px;

  margin-bottom: 10px;

  height: 100%;
}

.profile-card:not(:last-child) {
  margin-right: 12px;
}

.post-preview-title,
.post-preview-text {
  margin: 0;
}
.post-preview-title {
  font-family: "OpenSans-Bold";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 23px;
  text-transform: capitalize;

  color: #000000;

  margin-bottom: 5px;
}

.post-preview-text {
  font-family: "OpenSans-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;

  color: rgba(0, 0, 0, 0.41);

  //   margin-bottom: 35px;
}
</style>
