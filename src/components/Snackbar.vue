<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :multi-line="true"
    :timeout="timeout"
    top
  >
    {{ text }}
    <template v-if="subText">
      <p>{{ subText }}</p>
    </template>
    <v-btn
      icon
      @click="show = false"
    >
      <v-icon>
        mdi-close-circle
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapFields } from 'vuex-map-fields'

  export default {
    computed: {
      ...mapFields('notifications', ['color', 'show', 'subText', 'text', 'timeout'])
    },

    methods: {
      close () {
        this.show = false
      }
    }
  }
</script>
