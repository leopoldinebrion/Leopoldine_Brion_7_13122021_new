<template>
    <v-card class="mt-4 pt-2 rounded-lg" max-width="620" elevation="2">
        <v-card-title class="mx-3 my-1 pa-0">
           <v-avatar size="37">
              <img v-if="post.User.profilImage" :src="post.User.profilImage" alt="Photo de profil" style="object-fit:cover" />
              <v-icon v-else dark>
                mdi-account-circle
              </v-icon>
          </v-avatar>
          <v-layout column class="ml-3">
            <span class="text-body-2 font-weight-medium">{{ post.User.lastname }} {{ post.User.firstname }}</span>
            <span class="text-caption grey--text text--darken-2">
              {{
                moment(post.createdAt)
                .locale("fr")
                .fromNow()
              }}
            </span>
        </v-layout>
        <v-menu v-if="$store.state.user.id == post.User.id">
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!-- MODIFICATION POST -->
            <EditPostModal :post="post"/>
            <!-- SUPPRESSION POST -->
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-avatar>
              <v-list-item-title @click="deletePost(post.id)">Supprimer la publication</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        </v-card-title>
        <v-card-text class="pb-0 mt-3">
          <p class="font-weight-regular title black--text">
            {{ post.content }}
          </p>
        </v-card-text>
        <v-layout>
          <img class="img-post px-3 pb-3" v-bind:src="post.imageUrl" />
        </v-layout>
         <v-divider></v-divider>
            <v-card-text>
              COMMENTAIRES
            </v-card-text>
          <!-- AFFICHAGE COMMENTAIRES -->
          <v-col class="pt-1 pb-1" v-for="comment in comments" :key="comment.id">
            <div class="d-flex align-center">
              <v-avatar size="34">
                <img v-if="comment.User.profilImage" :src="post.User.profilImage" alt="Photo de profil" style="object-fit:cover" />
                <v-icon v-else dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <v-list-item-content class="ml-2">
                <span class="text-body-2 font-weight-medium">{{ comment.User.lastname }} {{ comment.User.firstname }}</span>
                <span>{{ comment.content }}</span>
              </v-list-item-content>
              <v-btn class="palegrey" x-small elevation="1" fab @click="deleteComment(comment.id)">
                <v-icon small>mdi-delete</v-icon>                     
              </v-btn>
            </div>
            <v-divider></v-divider>
          </v-col>
       <!-- POSTER UN COMMENTAIRE -->
        <v-col class="pt-1 pb-1 mt-2">      
          <div class="d-flex">
            <v-avatar class="mr-2 mt-3" size="34">
              <img v-if="user.profilImage" :src="user.profilImage" alt="Photo de profil" style="object-fit:cover" />
                <v-icon v-else dark>
                  mdi-account-circle
                </v-icon>
            </v-avatar>
            <v-text-field
              height="60px"
              outlined
              label="Inscrivez votre commentaire ici..."
              v-model="commentBody.content">
            </v-text-field>
          </div>
          <v-card-actions class="d-flex justify-end">
            <v-btn class="palegrey" text small @click="createComment(post.id)">
              Publier
            </v-btn>
          </v-card-actions>
        </v-col> 
      </v-card>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios"
const moment = require ('moment');

export default {
  props: ['post'],
  data() {
    return {
      moment,
      comments: [],
      commentBody: {
        content: ""
      }
    }
  },

    computed: {
      ...mapState(["user"])
    },

    mounted() {
      const userToken = localStorage.getItem("token");
        const configHeaders = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        axios.get(`http://localhost:4200/api/post/comment/${this.post.id}/`, configHeaders).then((res) => {
          this.comments = res.data;
        })
      },

    methods: {
        deletePost(postId) {
            const userToken = localStorage.getItem("token");
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            if (confirm('Êtes-vous sûr(e) de vouloir supprimer ce post ?')) {
            axios
            .delete(`http://localhost:4200/api/post/${postId}`, configHeaders)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => console.log(error));
            }
        },

        createComment(postId) {
          this.$store.dispatch("createComment", {
            content: this.commentBody,
            PostId: postId
          });
          this.commentBody.content = ""
          this.$router.push("/Wall")
        },

        deleteComment(commentId) {
          const userToken = localStorage.getItem("token");
            const configHeaders = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            };
            axios
            .delete(`http://localhost:4200/api/post/comment/${commentId}`, configHeaders)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
        }
    }
}

</script>

<style>

  .img-post {
    object-fit: cover;
    max-height: 400px;
    width: 100%;
    cursor: pointer;
  }
  
</style>
