<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn depressed v-bind="attrs" v-on="on">
        <span>Modifier</span>
        <v-icon right>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Modifier mon profil</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Prénom*"
                v-model="body.firstname"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Nom*"
                v-model="body.lastname"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                  v-model="body.email"
                  label="Email"
                  required
                  disabled
                ></v-text-field>
              </v-col>
          </v-row>
        </v-container>
        <small>*champs obligatoires</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success darken-1" depressed @click="editProfile">
          Enregistrer
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapState } from "vuex"

  export default {
    data () {
      return {
        dialog: false,
        body: {
          firstname: this.$store.state.user.firstname,
          lastname: this.$store.state.user.lastname,
          email: this.$store.state.user.email
        },
        file: ""
      }
    },

    computed: {
      ...mapState(["user"]),
    },

    methods: {
      editProfile() {        
        const formData = new FormData();
        formData.append("firstname", this.body.firstname);
        formData.append("lastname", this.body.lastname);

        if (this.file !== null) {
        formData.append("image", this.file);
        }
        this.$store.dispatch("updateAccount", formData);
        this.dialog = false;
      }
    }
  }
</script>