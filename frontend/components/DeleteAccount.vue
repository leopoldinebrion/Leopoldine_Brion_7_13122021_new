<template>
  <v-row justify="center">
    <v-btn
      class="mt-6"
      color="error"
      @click.stop="dialog = true"
    >
      Supprimer mon compte
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
            Êtes-vous sûr(e) de vouloir supprimer votre compte ?
        </v-card-title>

        <v-card-text>
          Cette action est irréversible.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            @click="deleteAccount"
          >
            Supprimer
          </v-btn>

          <v-btn
            text
            @click="dialog = false"
          >
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

  export default {
    data () {
      return {
        dialog: false,
      }
    },

    methods: {
        deleteAccount() {
            const userId = this.$store.state.user.id;
            const userToken = localStorage.getItem("token");
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            axios
                .delete(`http://localhost:4200/api/user/account/${userId}`, configHeaders)
                .then(() => {
                    this.$router.push("/Login-Page");
                })
                .catch((error) => console.log(error));
        }
    }
  }
</script>