<template>
  <v-app>
    <snackbar></snackbar>
    <core-app-bar v-if="isAuthenticated"/>

    <core-drawer v-if="isAuthenticated"/>

    <core-view />
  </v-app>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
      Snackbar: () => import('@/components/Snackbar')
    },
    computed: {
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>
