<template>
  <v-container fluid class="mt-13">
    <v-row class=" d-flex flex-column justify-center align-center">
      <v-col sm="12" md="6" class="mx-auto">
    <PostForm />
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" />
    </div>
      </v-col>
    </v-row>
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

<style scoped>

.container {
  width: 65%
}

.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top : 60px;
}

@media screen and (max-width: 480px) {
  .container {
    width: 100%;
    height: auto;
  }
}

</style>