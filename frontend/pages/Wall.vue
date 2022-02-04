<template>
  <div class="center-container">
    <PostForm />
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" class="d-flex flex-column"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Wall",
  layout: 'navbarWall-layout',

  computed: {
    ...mapState(["posts"])
  },

  mounted(){
    this.getPosts();
  },

  methods: {
    ...mapActions(["getPosts"])
  }
}
</script>

<style>

.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top : 15px;
}

</style>