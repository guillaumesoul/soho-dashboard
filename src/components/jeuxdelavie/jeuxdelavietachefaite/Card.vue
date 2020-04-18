<template>
    <v-card
      class="col-lg-3 col-md-6 col-sm-12"
    >
      <v-card-title>{{tache.name}}</v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-btn text>Cancel</v-btn>
        <v-btn text>Plus</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
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
