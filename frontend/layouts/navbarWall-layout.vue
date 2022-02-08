<template>
 <div id="app">
  <v-app>
    <div>
      <v-app-bar
        color= white
        dense
        dark
        app
      >
  
        <NuxtLink to="/Wall"><LogoBlack /></NuxtLink>
  
        <v-spacer></v-spacer>
      
          <NuxtLink to="/Account">
            <v-btn class="btn-resize" color="primary" small><v-icon left>mdi-account</v-icon>{{ user.lastname }} {{ user.firstname }}</v-btn>
          </NuxtLink>

          <v-btn class="primary--text white ml-1 btn-resize" small @click="logout">Se déconnecter</v-btn>      

      </v-app-bar>
    </div>
     <Nuxt />
  </v-app>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoBlack from "../components/GroupomaniaLogo"

export default {
  name: 'NavbarWallLayout',
  
  components: {
    LogoBlack
},

  data: () => ({
    items: [
      { title: 'Mon profil', router: '/Account' },
      { title: 'Se déconnecter', router: '/Login-Page' },
    ],
  }),

computed: {
  ...mapGetters(['user']),
},

methods: {
  logout() {
    this.$store.dispatch('logout');
    this.$router.push("/Login-Page");
  },
},

}
</script>

<style scoped>
.v-application {
  background-color: #f5f7f7;
}

@media screen and (max-width: 480px) {
  .btn-resize {
    width: 100px;
    font-size: 10px;
  }
} 

</style>
