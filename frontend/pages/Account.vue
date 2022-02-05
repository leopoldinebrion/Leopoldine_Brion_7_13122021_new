<template>
    <v-container class="fill-height d-flex justify-center mt-11 text-xs-center">
      <v-card elevation="3" class="px-16 py-5">
        <div class="profile">
        <v-card-title>
			    <h2>Vos informations</h2>
        </v-card-title>

        <v-card-subtitle class="pt-4">
          <v-avatar color="primary" size="105">
            <img v-if="user.profilImage" :src="user.profilImage" class="img" alt="Photo de profil" style="object-fit:cover" />
            <v-icon v-else dark medium>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-card-subtitle>

        <v-card-text class="mt-5">		
				  <div class="profile__info">
					  <p class="font-weight-bold">Nom</p>
            <v-text-field v-model="user.firstname" readonly></v-text-field>
            <p class="font-weight-bold">Prénom</p>
            <v-text-field v-model="user.lastname" readonly></v-text-field>
            <p class="font-weight-bold">Email</p>
            <v-text-field v-model="user.email" readonly></v-text-field>
				  </div>
        </v-card-text>		
			  <EditProfileModale />
        <DeleteAccountModale />
        </div>
		</v-card>
  </v-container>
</template>

<script>

export default {
  layout: 'navbarWall-layout',

  data() {
    return {
      profilImage: true,
    }
},

  computed: {
    user() {
        return this.$store.getters.user;
      },
  },
}
</script>

<style>

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
};

.img {
  object-fit: cover;
};

</style>