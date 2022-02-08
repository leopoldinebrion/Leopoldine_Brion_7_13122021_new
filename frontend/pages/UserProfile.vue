<template>
    <v-container class="fill-height d-flex justify-center mt-11 text-xs-center">
        <v-card elevation="3" class="px-16 py-5">
            <v-card-subtitle class="pt-4 d-flex justify-center">
            <v-avatar color="primary" size="105">
                <img v-if="userProfile.profilImage" :src="userProfile.profilImage" class="img" alt="Photo de profil" style="object-fit:cover" />
                <v-icon v-else dark size="50">
                mdi-account-circle
                </v-icon>
            </v-avatar>
            </v-card-subtitle>
            <p class="font-weight-bold mt-0">Nom</p>
            <v-text-field v-model="userProfile.firstname" readonly></v-text-field>
            <p class="font-weight-bold mt-0 mb-0">Prénom</p>
            <v-text-field class="pt-0" v-model="userProfile.lastname" readonly></v-text-field> 
            <p class="font-weight-bold mt-0">Email</p>
            <v-text-field v-model="userProfile.email" readonly></v-text-field>
   
            <v-card-actions v-if="user.isAdmin == true">
                <v-row justify="center">
                    <v-btn
                    class="mt-6"
                    color="error"
                    @click.stop="dialog = true"
                    >
                        Supprimer le compte
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
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"

export default {
    layout: 'navbarWall-layout',
    data() {
        return {
            dialog: false,
        }
    },

    mounted() {
        const paramsId = this.$route.params.id;
        this.$store.dispatch('getUser', paramsId);
    },

    computed: {
        ...mapState(["userProfile"]),
        ...mapState(["user"])
    },

    methods: {
        deleteAccount() {
            const userToken = localStorage.getItem("token");
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            axios
                .delete(`http://localhost:4200/api/user/account/${this.userProfile.id}`, configHeaders)
                .then(() => {
                    this.$router.push("/Wall");
                })
                .catch((error) => console.log(error));
        }
    }
}

</script>