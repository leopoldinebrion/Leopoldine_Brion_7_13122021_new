<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template #activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-avatar>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Modifier la publication</v-list-item-title>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Modifier ma publication</span>
      </v-card-title>
      <v-card-text class="mt-2">
            <v-textarea
              v-model="content"
              outlined
              rows="3"
              row-height="10"
            ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn onclick="document.getElementById('file').click()" class="ma-2" v-if="post.imageUrl != null">Modifier l'image</v-btn>
        <v-btn onclick="document.getElementById('file').click()" class="ma-2" v-if="post.imageUrl == null">Ajouter une image</v-btn>
        <input type="file" name=" file" id="file" style="visibility:hidden;" @change="selectFile">
      </v-card-actions>
    <v-divider></v-divider>
        <v-card-actions>
         <v-btn color="success darken-1" depressed @click="editPost" >
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

export default {
  props: ['post'],
    data () {
      return {
        dialog: false,
        content: this.post.content,
        file: null,
      }
    },

    methods: {

      selectFile(e) {
        this.file = e.target.files[0] || e.dataTransfer.files;
      },
      
      editPost() {
        const postId = this.post.id;
        const formData = new FormData();
        formData.append("content", this.content)
        if (this.file !== null) {
        formData.append("image", this.file);
        }

        this.$store.dispatch('updatePost', {postId, formData});
        this.dialog = false;
      }
    }
}
</script>