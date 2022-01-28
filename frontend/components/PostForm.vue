<template>
    <v-card class="elevation-2 pa-6" max-width="620">
        <v-textarea
            v-model="content"
                        outlined
                        rows="3"
                        row-height="15"
                        label="Que voulez-vous partager ?"
                        :rules="[rules.required]"
                        auto-grow
                ></v-textarea>
                <div class="d-flex justify-space-between">
                    <input
                        ref="file"
                        type="file"
                        accept="image/png, image/jpeg,
                                image/bmp, image/gif"
                        name=" charger une image"
                        class="input-group--focused"
                        @change="selectFile"
                    />    
                    <v-btn color=primary @click.prevent="createPost">Publier
                        <v-icon small right>mdi-send </v-icon>
                    </v-btn>
                </div>
            </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "PostForm",

  data() {
      return {
          content: "",
          file: "",
          rules: {
              required: (value) => !!value || "Vous ne pouvez pas publier un message vide.",
          },
      }
  },

  computed: {
      ...mapGetters(['user'])
  },

  methods: {
    selectFile() {
        this.file = this.$refs.file.files[0];
    },

    createPost() {
        const formData = new FormData();
        formData.append("content", this.content);
        formData.append("file", this.file);

        console.log(formData.get("content"));

        this.$store.dispatch("createPost", formData);
        window.location.reload();
    },
  }
}
</script>