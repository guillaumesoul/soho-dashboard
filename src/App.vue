<template>
  <v-app>
    <core-app-bar v-if="isAuthenticated"/>

    <core-drawer v-if="isAuthenticated"/>

    <core-view />

    <core-footer v-if="isAuthenticated"/>
  </v-app>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View')
    },
    computed: {
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>
