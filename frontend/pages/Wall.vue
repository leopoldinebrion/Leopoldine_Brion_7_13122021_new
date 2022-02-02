<template>
  <v-container class="fluid mt-5 mr-0 ml-0">
    <PostForm />
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" class="d-flex flex-column justify-center" />
    </div>
  </v-container>
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