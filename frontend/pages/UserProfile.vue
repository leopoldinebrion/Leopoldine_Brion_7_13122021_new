<template>
    <v-container class="fill-height d-flex justify-center align-start mt-11 text-xs-center">
        <v-card elevation="3" class="px-16 py-5">
            <p class="font-weight-bold">Nom</p>
            <p class="font-weight-bold">Prénom</p>
            <v-text-field v-model="userProfile.lastname" readonly></v-text-field>
        </v-card>
    </v-container>
</template>

<script>
import axios from "axios"
export default {
    layout: 'navbarWall-layout',
    data() {
        return {
            userProfile: {}  
        }
    },

    mounted() {
        const data = axios.get(`http://localhost:4200/api/user/account/${this.$route.params.id}/`)
        console.log(data)
        this.userProfile = data.data;
    }
}

</script>