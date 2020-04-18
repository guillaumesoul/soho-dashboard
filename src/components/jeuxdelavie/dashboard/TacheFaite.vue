<template>
  <div>
    <material-card color="success">
      <template v-slot:header>
        <div class="px-3">
          <div class="title font-weight-light mb-2">
            Tâches faites
          </div>
        </div>
      </template>
      <v-card-text
        class="d-flex justify-start"
      >
        <tache-card
          v-for="tache in tacheList"
          :tache="tache"
        >
        </tache-card>
      </v-card-text>
    </material-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TacheCard from './../jeuxdelavietachefaite/Card'

  export default {
    name: 'TacheFaite',
    components: {
      TacheCard
    },
    computed: {
      ...mapGetters('jeuxdelavietache', {
        tacheList: 'list'
      })
    },
    created () {
      this.fetchAll()
    },
    methods: {
      ...mapActions('jeuxdelavietache', {
        fetchAll: 'fetchAll'
      })
    }
  }
</script>

<style scoped>

</style>
