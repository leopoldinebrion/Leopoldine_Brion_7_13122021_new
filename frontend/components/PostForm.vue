<template>
    <v-card class="elevation-2 pa-6" width="600" max-width="620">
        <v-form enctype="multipart/form-data">
        <v-textarea
            v-model="content"
                        outlined
                        rows="3"
                        row-height="15"
                        label="Que souhaitez-vous partager ?"
                        :rules="[rules.required]"
                        auto-grow
                ></v-textarea>
                <div class="d-flex justify-space-between">
                        <input
                        type="file"
                        name=" file"
                        @change="selectFile">
                    <v-btn color=primary @click.prevent="createPost">Publier
                        <v-icon small right>mdi-send </v-icon>
                    </v-btn>
                </div>
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
          rules: {
              required: (value) => !!value || "Vous ne pouvez pas publier un message vide.",
          },
          sendForm: false
      }
  },

  computed: {
      ...mapGetters(['user'])
  },

  methods: {
    
    takeContent() {
      this.$refs.file.$children[0].$el.click();
    },

    selectFile(e) {
        this.imageUrl = e.target.files[0] || e.dataTransfer.files;
    },

    createPost() {
        const formData = new FormData();
        formData.append("content", this.content);
        formData.append("image", this.imageUrl);

        this.$store.dispatch("createPost", formData);
    },
  }
}
</script>