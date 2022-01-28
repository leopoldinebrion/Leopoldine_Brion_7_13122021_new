<template>
 <div id="app">
  <v-app>
    <div>
      <v-app-bar
        color= white
        dense
        dark
      >
  
        <LogoBlack />
  
        <v-spacer></v-spacer>
  
         <v-btn class="red--text text--lighten-1" plain><NuxtLink class="redirection-login" to="/Login-form">Se connecter</NuxtLink></v-btn>
         <v-btn plain><NuxtLink class="redirection-signup" to="/Signup-form">S'inscrire</NuxtLink></v-btn>

      </v-app-bar>
    </div>
     <Nuxt />
  </v-app>
</div>
</template>

<script>

import LogoBlack from "../components/GroupomaniaLogo"
  
export default {
  name: 'NavbarLayout',

  components: {
    LogoBlack
},

}
</script>

<style>

a {
  text-decoration: none;
}

.main-header {
    .v-btn {
      @media only screen and (max-width: 599px) {
        padding: 0 0 0 10px;
      }
    }
}
</style>
