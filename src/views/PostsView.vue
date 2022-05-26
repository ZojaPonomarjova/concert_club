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
      <div class="user-section-error" v-if="errorTextForPosts">
        {{ errorTextForPosts }}
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
    //ошибка при загрузке
    errorTextForPosts() {
      return this.$store.getters.errorTextForPosts;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    posts() {
      const posts = this.checkPosts();
      return posts;
    },
  },
  methods: {
    ...mapActions({
      handleClickOnPostCard: "getChosenPost",
    }),

    checkPosts() {
      if (this.$store.getters.posts.length === 0) {
        return JSON.parse(sessionStorage.getItem("chosenPersonPosts"));
      } else {
        return this.$store.getters.posts;
      }
      //chosenPersonPosts
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.posts-section {
  max-width: 1116px;
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

  @media screen and (max-width: 1116px) {
    padding: 0 20px 40px;
  }

  @media screen and (max-width: 920px) {
    justify-content: center;
  }
}

.section-title {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 30px 0px;

  @media screen and (max-width: 1116px) {
    text-align: center;
  }
}

.posts-section-container a {
  width: 30%;
  max-width: 350px;
  min-width: 280px;
  margin-bottom: 15px;

  margin-right: 12px;
}

.user-section-error {
  color: brown;
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;

  margin: 0px 0px;

  min-height: 159px;

  text-align: center;
}
</style>
