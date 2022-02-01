<template>
  <div>
    <v-card-title class="justify-center mt-5 mb-5">Bienvenue sur Groupomania, votre réseau social d'entreprise!</v-card-title>
    <Login-form />
  </div>
</template>

<script> 
export default {
  layout: 'navbarLogin-layout',

  mounted() {
    if(localStorage.getItem('token') !== null) {
      this.$router.push("/Wall");
    }
  }
}
</script>

<style>
  .my-span{
    font-style: bold;
    font-size: 36px;
  }
</style>