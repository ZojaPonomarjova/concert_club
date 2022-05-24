<template>
  <main class="main">
    <div class="user-section">
      <div class="user-section-data">
        <h5 class="user-name">{{ chosenProfile.username }}</h5>
      </div>
      <div class="black-line"></div>
      <div class="user-data">
        <div class="user-city">{{ chosenProfile.name }}</div>
        <div class="user-email">{{ chosenProfile.email }}</div>

        <div class="user-phone">{{ chosenProfile.phone }}</div>
        <div class="user-website">{{ chosenProfile.website }}</div>
        <div class="user-company">
          <p>{{ chosenProfile.company.name }}</p>
          <p class="user-bs">{{ chosenProfile.company.bs }}</p>
        </div>

        <!-- <div class="user-section-buttons-container">
          <ButtonComponent
            anotherClass="user-section-button"
            buttonText="Написать сообщение"
          />
          <ButtonComponent
            anotherClass="user-section-button"
            buttonText="Предложить сходить на концерт"
          />
        </div> -->
      </div>
      <div class="black-line"></div>
      <div class="user-section-posts">
        <div class="black-line"></div>
        <div class="posts-container">
          <h4 class="section-title user-section-posts-title">Посты</h4>
          <div class="posts-preview">
            <ClockLoader v-if="isLoading" />
            <template v-if="posts.length && !allPostsAreShown && !isLoading">
              <PostPreview
                v-for="post in firstPosts"
                :key="post.id"
                :postTitle="post.title"
                :postText="post.body.substr(0, 50) + '...'"
                anotherClass=""
                :postId="post.id"
                v-on:handleClickOnPostCard="handleClickOnPostCard($event)"
              />
            </template>
            <template
              v-else-if="posts.length && allPostsAreShown && !isLoading"
            >
              <PostPreview
                v-for="post in posts"
                :key="post.id"
                :postTitle="post.title"
                :postText="post.body.substr(0, 50) + '...'"
                anotherClass=""
                :postId="post.id"
                v-on:handleClickOnPostCard="handleClickOnPostCard($event)"
            /></template>
          </div>
          <a
            href="#"
            class="user-section-link"
            v-if="!isLoading && !allPostsAreShown"
            v-on:click.prevent="handleClickOnlink"
          >
            Развернуть &rarr;</a
          >
          <a
            href="#"
            class="user-section-link user-section-link_up"
            v-if="!isLoading && allPostsAreShown"
            v-on:click.prevent="handleClickOnlink"
          >
            Свернуть &uarr;</a
          >
        </div>
        <div class="user-section-button-container">
          <router-link to="/posts">
            <ButtonComponent
              anotherClass="user-section-button"
              buttonText="Смотреть публикации"
              v-on:click="$emit('handleClickOnCard', $event)"
            />
          </router-link>
        </div>
        <div class="black-line user-section-black-line"></div>
      </div>
    </div>
  </main>
</template>

<script>
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import PostPreview from "@/components/PostPreview.vue";
import ClockLoader from "@/components/ClockLoader.vue";
import { mapActions } from "vuex";

export default {
  name: "AboutView",
  components: {
    ButtonComponent,
    PostPreview,
    ClockLoader,
  },

  mounted() {
    // if (
    //   this.$store.getters.posts.length === 0 &&
    //   this.$store.getters.firstPosts.length === 0
    // ) {
    this.$store.dispatch("getChosenProfilePosts");
    // }
    // console.log(this.$store.getters.data);
  },

  computed: {
    //   // //ошибка при загрузке
    //   // errorText() {
    //   //   return this.$store.getters.errorTextForPerson;
    //   // },

    posts() {
      return this.$store.getters.posts;
    },

    //первые три поста
    firstPosts() {
      return this.$store.getters.firstPosts;
    },

    //состояние для сохранения выбранного пользователя
    chosenProfile() {
      return this.$store.getters.chosenProfile;
    },
    //состояние для лоадера
    isLoading() {
      return this.$store.getters.isLoading;
    },

    //состояние для показа всех постов пользователя
    allPostsAreShown() {
      return this.$store.getters.allPostsAreShown;
    },
  },
  methods: {
    ...mapActions({
      handleClickOnlink: "showAllPosts",
      handleClickOnPostCard: "getChosenPost",
    }),
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.user-section {
  margin-top: 36px;

  border: 1px solid black;

  min-height: calc(100vh - 70px);
}

.black-line {
  width: 100vw;
  height: 1px;
  background-color: black;
}

.user-section-data {
  width: 1116px;
  margin: 0 auto;

  border-left: 1px solid black;
  border-right: 1px solid black;
}

.user-name {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 0;
  padding: 11px 18px 13px;
}

.user-data {
  width: 1116px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  div:not(.user-section-buttons-container) {
    border-left: 1px solid #000;
    font-family: "OpenSans-Regular", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 17px;
    text-align: center;

    padding: 14px 20px 10px;

    display: flex;
    align-items: center;
  }
  div:last-child {
    border-right: 1px solid #000;
  }

  .user-bs {
    font-size: 14px;
    padding-top: 10px;

    color: #939393;
  }

  .user-company {
    flex-direction: column;
  }
}

.user-section-button {
  font-family: "OpenSans-SemiBold", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;

  color: #ffffff;
  background-color: $almostBlack;

  padding-left: 28px;
  padding-right: 28px;

  margin: 0 auto;
  align-self: center;
}

.user-section-button-container {
  margin: 70px 0 30px;

  display: flex;
  justify-content: center;
}

// .user-section-buttons-container {
//   display: flex;
//   flex-wrap: wrap;
//   padding: 0px 0px 0px;
// }

.user-section-posts {
  margin-top: 25px;
}

.posts-container {
  width: 1116px;
  margin: 0 auto;

  position: relative;
}

.posts-preview {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  a {
    margin-bottom: 20px;

    max-width: 350px;
    width: 30%;
  }
}

.section-title {
  font-family: "AlegreyaSansSC-Medium", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 40px;

  margin: 0;
  padding-top: 16px;
  padding-bottom: 16px;
}

.loader-container_small {
  min-height: 143px;
}

.user-section-link {
  position: absolute;
  right: 0px;
  margin: 20px 0 30px;

  font-family: "OpenSans-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 17px;

  color: #000;

  &:hover {
    color: rgba(0, 0, 0, 0.51);
  }
}

.user-section-link_up {
  margin: -30px 0 30px;
}

// .user-section-black-line {
//   //   position: absolute;
//   //   left: 0;
//   margin-top: 60px;
// }
</style>
