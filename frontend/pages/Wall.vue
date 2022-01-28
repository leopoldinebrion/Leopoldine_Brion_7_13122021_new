<template>
  <v-container class="fluid mt-5 justify-center" max-width="620">
    <PostForm />
    <div v-for="post in posts" :key="post.id">
      <Post :post="post"/>
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

    

    // editPost() {
    //   const formData = new FormData();
    //   formData.append("content", this.post.content);

    //   this.$store.dispatch("updatePost", formData);
    //               window.location.reload();

    // }s
}
</script>

<style>

  .img-post {
    object-fit: cover;
    margin: 1px;
    max-height: 400px;
    width: 100%;
    cursor: pointer;
  }
</style>