<template>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 mb-4 primary--text">Inscription</h1>
                  <p>Vous avez déjà un compte ?</p>
                  <NuxtLink class="redirection-login font-weight-medium" to="/Login-Page"><p>Connectez-vous.</p></NuxtLink>
                </div>
                <form>
                  <v-text-field v-model="firstname" name="firstname" label="Nom" type="text"></v-text-field>
                  <v-text-field v-model="lastname" name="lastname" label="Prénom" type="text"></v-text-field>
                  <v-text-field v-model="email" name="email" label="Email" type="email"></v-text-field>                 
                  <v-text-field id="password" v-model="password" name="password" label="Mot de passe" type="password"></v-text-field>
                </form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="createAccount">Inscription</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
</template>

<script>

import axios from 'axios'

export default {
  layout: 'navbarLogin-layout',

  data() {
    return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    }
  },
   methods: {
      
      createAccount() {
        if (this.firstname.trim().lenght === 0 || this.lastname.trim().lenght === 0 || this.email === "" || this.password.trim().lenght === 0) {
          alert("Veuillez remplir tous les champs.")
        } else {
        axios.post('http://localhost:4200/api/user/signup', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            alert("Inscription réussie avec succès. Vous allez être redirigé vers la page de connexion.")
            this.$router.push("/Login-Page")
          })
          .catch(error => {
            console.log(error)
          })
        }
    }
  }
};
</script>