<template>
    <v-card class="elevation-2 pa-6" width="600"> 
       <v-form enctype="multipart/form-data">
            <v-textarea
                v-model="content"
                outlined
                rows="3"
                row-height="15"
                label="Que souhaitez-vous partager ?"
                auto-grow
            ></v-textarea>
            <div class="d-flex justify-space-between">
                <v-btn onclick="document.getElementById('files').click()">Ajouter une image</v-btn>
                <input id="files" style="visibility:hidden;" type="file" @change="selectFile">
                <v-btn color=primary @click.prevent="createPost">Publier
                    <v-icon small right>mdi-send </v-icon>
                </v-btn>
            </div>
            <template v-if="preview">
                <v-img :src="preview" class="mt-2" width="50" />
            </template>
        </v-form>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "PostForm",

  data() {
      return {
          content: "",
          imageUrl: null,
          preview: null,
      }
  },

  computed: {
      ...mapGetters(['user']),
  },

  methods: {

    selectFile(event) {
        const input = event.target;
            if (input.files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                this.preview = e.target.result;
            }
        this.imageUrl=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    createPost() {
        const formData = new FormData();
        formData.append("content", this.content);
        formData.append("image", this.imageUrl);

        this.$store.dispatch("createPost", formData);
        this.content = "";
        this.imageUrl = null;
        this.preview = null;
    },
  }
}
</script>