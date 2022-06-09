/*Страница пользователя */
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
            <div class="user-section-error" v-if="errorTextForPosts">
              {{ errorTextForPosts }}
            </div>
          </div>
          <a
            href="#"
            class="user-section-link"
            v-if="posts.length && !isLoading && !allPostsAreShown"
            v-on:click.prevent="handleClickOnlink"
          >
            Развернуть &rarr;</a
          >
          <a
            href="#"
            class="user-section-link user-section-link_up"
            v-if="posts.length && !isLoading && allPostsAreShown"
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
    this.$store.dispatch("getChosenProfilePosts");
  },

  computed: {
    //ошибка при загрузке
    errorTextForPosts() {
      return this.$store.getters.errorTextForPosts;
    },

    posts() {
      return this.$store.getters.posts;
    },

    //первые три поста
    firstPosts() {
      return this.$store.getters.firstPosts;
    },

    //состояние для сохранения выбранного пользователя
    chosenProfile() {
      const chosenProfile = this.checkCosenPerson();
      return chosenProfile;
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

    checkCosenPerson() {
      let chosenPerson;
      if (this.$store.getters.chosenProfile === null) {
        chosenPerson = JSON.parse(sessionStorage.getItem("chosenPerson"));
      } else {
        chosenPerson = this.$store.getters.chosenProfile;
      }

      return chosenPerson;
    },
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/vars.scss";

.user-section {
  margin-top: 36px;

  border: 1px solid black;

  min-height: calc(100vh - 100px);
}

.black-line {
  width: 100vw;
  height: 1px;
  background-color: black;
}

.user-section-data {
  max-width: 1116px;
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

  @media screen and (max-width: 1116px) {
    max-width: 800px;
    margin: 0 auto;
    padding: 11px 0px 13px;
  }
  @media screen and (max-width: 900px) {
    text-align: center;
  }
}

.user-data {
  max-width: 1116px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 1116px) {
    max-width: 800px;

    border-right: 1px solid #000;

    div:nth-last-child(-n + 2) {
      width: 50%;
      border-top: 1px solid #000;
    }
  }

  @media screen and (max-width: 670px) {
    max-width: 500px;

    border-right: 1px solid #000;

    div:nth-last-child(-n + 2) {
      width: 100%;
      border-top: 1px solid #000;
    }

    div:nth-child(-n + 2) {
      border-bottom: 1px solid #000;
    }
  }

  div {
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
    justify-content: center;

    @media screen and (max-width: 670px) {
      width: 100%;
    }
  }
  div:last-child {
    border-right: 1px solid #000;

    @media screen and (max-width: 1116px) {
      border-right: none;
    }
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

  &:hover {
    @media screen and (min-width: 579px) {
      background: rgba(0, 0, 0, 0);
      color: $almostBlack;
      box-shadow: inset 0 0 0 3px $almostBlack;

      font-weight: 700;
      font-family: "OpenSans-Bold", sans-serif;
    }
  }
}

.user-section-button-container {
  margin: 70px 0 30px;

  display: flex;
  justify-content: center;
}

.user-section-posts {
  margin-top: 25px;
}

.posts-container {
  max-width: 1116px;
  margin: 0 auto;

  position: relative;
}

.posts-preview {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 1116px) {
    padding: 0px 20px;
  }

  @media screen and (max-width: 920px) {
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
  }

  @media screen and (max-width: 920px) {
    justify-content: center;
    max-width: 800px;
    margin: 0 auto;
  }

  @media screen and (max-width: 630px) {
    max-width: 500px;
  }
  a {
    margin-bottom: 20px;
    min-width: 280px;
    max-width: 350px;
    width: 30%;
  }

  a {
    margin-right: 12px;

    @media screen and (max-width: 602px) {
      margin-right: 0px;
    }
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

  @media screen and (max-width: 1116px) {
    padding: 16px 20px;
  }

  @media screen and (max-width: 920px) {
    text-align: center;
  }
}

.loader-container_small {
  min-height: 143px;
}

.user-section-link {
  position: absolute;
  right: 20px;
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

  @media screen and (max-width: 1116px) {
    right: 7%;
  }
  @media screen and (max-width: 920px) {
    right: 18%;
  }

  @media screen and (max-width: 630px) {
    right: unset;
    width: 100%;
    text-align: center;
  }
}

.user-section-link_up {
  margin: -30px 0 30px;

  @media screen and (max-width: 920px) {
    margin: 0px 0px 30px;
  }
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
}
</style>
