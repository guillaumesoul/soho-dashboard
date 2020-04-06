<template>
  <v-form
    ref="form"
    v-model="valid"
  >
    <v-text-field
      v-model="email"
      label="Email"
      :rules="[
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail non valide',
      ]"
      required
    />
    <v-text-field
      v-model="password"
      label="Password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      :rules="[v => !!v || 'Password obligatoire']"
      required
      @click:append="show1 = !show1"
    />
    <v-btn
      :disabled="!valid"
      @click="login"
    >
      Valider
    </v-btn>
  </v-form>
</template>

<script>

  const AUTH_REQUEST = 'AUTH_REQUEST'

  export default {
    name: 'Login',
    data () {
      return {
        valid: true,
        email: '',
        password: '',
        show1: false
      }
    },
    methods: {
      login () {
        const { email, password } = this
        this.$store.dispatch('AUTH_REQUEST', { email, password }).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style scoped>

</style>
