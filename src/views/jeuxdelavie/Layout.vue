<template>
  <v-container
    fluid
    fill-heights
  >
    <v-app-bar
      dense
      dark
      class="mb-2"
    >
      <router-link :to="{ name: 'jeux_de_la_vie' }">
        <v-btn
          icon
        >
          <v-icon>mdi-one-up</v-icon>
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'jeux_de_la_vie_taches' }">
        <v-btn
          icon
        >
          <v-icon>mdi-format-list-checks</v-icon>
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'jeux_de_la_vie_categories' }">
        <v-btn icon>
          <v-icon>mdi-shape-outline</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <router-view></router-view>

  </v-container>

</template>

<script>
  import { mdiFormatListChecks } from '@mdi/js';
  export default {
    name: 'home'
  }
</script>

<style scoped>

</style>
