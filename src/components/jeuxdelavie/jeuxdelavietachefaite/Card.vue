<template>
    <v-card
      class="col-lg-3 col-md-6 col-sm-12"
    >
      <v-card-title>{{tache.name}}</v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions>
        <router-link :to="{ name: 'JeuxDeLaVieTacheFaiteCreate'}">
          <v-btn color="success"><v-icon>mdi-check-circle</v-icon></v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
</template>

<script>
  import mdiCheckCircle from '@mdi/js'
  export default {
    name: 'Card',
    props: {
      tache: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
