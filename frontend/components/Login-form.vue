<template>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 red--text text--lighten-2">Connexion</h1>
                  <p>Pas encore de compte ?<NuxtLink class="redirection-login font-weight-medium" to="/Signup-Page"> Inscrivez-vous.</NuxtLink></p>
                </div>
                <v-form id="formulaire">
                  <v-text-field v-model="email" name="login" label="Email" type="text"></v-text-field>
                  <v-text-field id="password" v-model="password" name="password" label="Mot de passe" type="password"></v-text-field>
                </v-form>
              <p class="font-weight-medium red--text">{{ errMsg }}</p>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="red lighten-1 white--text" block type="submit" @click.prevent="login">Connexion</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
</template>

 <script>
import axios from "axios";
export default {
  name: "Login",
  layout: 'navbarLogin-layout',
  data() {
    return {
      email: "",
      password: "",
      errMsg: null,
    }
  },
  methods: {
    login() {
        axios.post("http://localhost:4200/api/user/login", {
              email: this.email,
              password: this.password
            })
            .then((res) => {
              console.log("Connexion réussie !", res);
              this.$store.dispatch('setUser', res.data);
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('userId', res.data.userId);
              this.$router.push("/Wall")
            })
            .catch(() => { 
              this.errMsg = "⚠ Identifiants incorrects."
            });
          }
        }
  };
</script>