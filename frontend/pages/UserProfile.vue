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
   
            <v-card-actions v-if="userProfile.isAdmin == true">
                <DeleteAccountModale />
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from "vuex"

export default {
    layout: 'navbarWall-layout',
    data() {
        return {
        }
    },

    mounted() {
        const paramsId = this.$route.params.id;
        this.$store.dispatch('getUser', paramsId);
    },

    computed: {
        ...mapState(["userProfile"])
    }
}

</script>