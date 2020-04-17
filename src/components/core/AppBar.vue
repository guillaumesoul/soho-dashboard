<template>
  <v-app-bar
    id="core-app-bar"
    absolute
    app
    color="transparent"
    flat
    height="88"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="toggleDrawer()"
    >
      <v-icon v-if="true">
        mdi-menu
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-spacer />

    <v-toolbar-items>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-text-field
          class="mr-4 purple-input"
          color="purple"
          label="Search..."
          hide-details
        />

        <v-menu
          bottom
          left
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              class="toolbar-items"
              icon
              to="/notifications"
              v-bind="attrs"
              v-on="on"
            >
              <v-badge
                color="error"
                overlap
              >
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-icon color="tertiary">
                  mdi-bell
                </v-icon>
              </v-badge>
            </v-btn>
          </template>

        </v-menu>

        <v-menu
          left
          bottom
          :open-on-hover="true"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon color="tertiary">
                mdi-account
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              :key="1"
              @click="() => {}"
            >
              <v-list-item-title>Profile </v-list-item-title>
            </v-list-item>
            <v-list-item
              :key="2"
              @click="logout"
            >
              <v-list-item-title>Déconnexion </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  // Utilities
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data: () => ({
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
      title: 'titre',
      responsive: false
    }),

    watch: {
      '$route' (val) {
        this.title = val.name
      }
    },

    mounted () {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },

    computed: {
      ...mapState('dashboard', ['drawer'])
      /*drawer: {
        get () {
          return this.$store.state.dashboard.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }*/
    },

    methods: {
      ...mapMutations('dashboard', ['setDrawer', 'toggleDrawer', 'allez']),
      onResponsiveInverted () {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      },
      ...mapMutations({
        logout: 'AUTH_LOGOUT' // map `this.add()` to `this.$store.commit('increment')`
      })
    }
  }
</script>

<style>
  /* Fix coming in v2.0.8 */
  #core-app-bar {
    width: auto;
  }

  #core-app-bar a {
    text-decoration: none;
  }
</style>
