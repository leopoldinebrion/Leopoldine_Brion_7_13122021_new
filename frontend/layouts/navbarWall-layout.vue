<template>
 <div id="app">
  <v-app>
    <div>
      <v-app-bar
        color= white
        dense
        dark
      >
  
        <NuxtLink to="/Wall"><LogoBlack /></NuxtLink>
  
        <v-spacer></v-spacer>

      <v-btn @click="logout">Se déconnecter</v-btn>      
      
      <v-menu
        open-on-hover
        top
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            small
            v-bind="attrs"
            v-on="on"
          ><v-icon left>mdi-account</v-icon>{{ user.lastname }} {{ user.firstname }}
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <NuxtLink :to="{path:item.router}">{{ item.title }}</NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>

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