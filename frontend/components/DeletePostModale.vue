<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-avatar>
                <v-icon>mdi-delete</v-icon>
            </v-list-item-avatar>
            <v-list-item-title @click.stop="dialog = true">Supprimer la publication</v-list-item-title>
        </v-list-item>
    </template>
    <v-card>
        <v-card-title class="text-h5">
            Êtes-vous sûr(e) de vouloir supprimer ce post ?
        </v-card-title>

        <v-card-text>
          Cette action est irréversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="deletePost(post.id)"
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
</template>

<script>

export default {
    props: ['post'],
    data() {
        return {
         dialog: false
        }
    },
    
    methods: {

        deletePost(postId) {
            this.$store.dispatch('deletePost', postId);
        },
    }
}

</script>