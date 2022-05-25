<template>
  <main class="main">
    <div class="posts-section">
      <h4 class="section-title user-section-posts-title">Публикации</h4>
      <ClockLoader v-if="isLoading" />
      <div class="posts-section-container" v-if="posts.length && !isLoading">
        <PostPreview
          v-for="post in posts"
          :key="post.id"
          :postTitle="post.title"
          :postText="post.body.substr(0, 50) + '...'"
          anotherClass="posts-section-post-preview"
          :postId="post.id"
          v-on:handleClickOnPostCard="handleClickOnPostCard($event)"
        />
      </div>
    </div>
  </main>
</template>

<script>
import PostPreview from "@/components/PostPreview.vue";

import ClockLoader from "@/components/ClockLoader.vue";
import { mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    // ButtonComponent,
    PostPreview,

    ClockLoader,
  },
  // mounted() {
  //   this.$store.dispatch("getData");
  //   console.log(this.$store.getters.data);
  // },

  computed: {
    //   // //ошибка при загрузке
    //   // errorText() {
    //   //   return this.$store.getters.errorTextForPerson;
    //   // },
    //   // //данные пользователя
    //   data() {
    //     return this.$store.getters.data;
    //   },
    //
    isLoading() {
      return this.$store.getters.isLoading;
    },
    posts() {
      return this.$store.getters.posts;
    },
  },
  methods: {
    ...mapActions({
      handleClickOnPostCard: "getChosenPost",
    }),
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.posts-section {
  width: 1116px;
  margin: 0 auto;

  min-height: calc(100vh - 70px);

  .router-link-active,
  .posts-section-post-preview {
    width: 30%;
    max-width: 350px;
  }
}

.posts-section-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.section-title {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 30px 0px;
}

.posts-section a {
  width: 30%;
  max-width: 350px;
  margin-bottom: 15px;
}
</style>
