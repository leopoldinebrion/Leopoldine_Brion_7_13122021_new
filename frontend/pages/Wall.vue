<template>
  <v-container class="fluid mt-5 mr-0 ml-0">
    <PostForm />
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" class="d-flex flex-column justify-center" />
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: "Wall",
    layout: 'navbarWall-layout',

    data() {
      return {
        posts: [],
        dialog: false,
      };
    },

    beforeMount() {
      axios
        .get("http://localhost:4200/api/post/")
        .then((response) => {
          this.posts = response.data;
          console.log("liste posts : ", this.posts);
          this.$store.dispatch('getPosts', response.data);
        })
        .catch((error) => console.log(error));
    },
}
</script>