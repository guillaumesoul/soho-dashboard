<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-combobox
            v-model="item.tache"
            :items="tacheSelectItems"
            :error-messages="tacheErrors"
            :no-data-text="$t('No results')"
            :label="$t('tache')"
            required
            item-text="name"
            item-value="@id"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-combobox
            v-model="item.user"
            :items="userSelectItems"
            :error-messages="userErrors"
            :no-data-text="$t('No results')"
            :label="$t('user')"
            required
            item-text="name"
            item-value="@id"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model.number="item.duration"
            :error-messages="durationErrors"
            :label="$t('duration')"
            @input="$v.item.duration.$touch()"
            @blur="$v.item.duration.$touch()"
          />
        </v-col>

        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <input-date
            v-model="item.dateRealisationTache"
            :label="$t('dateRealisationTache')"
            :error-messages="dateRealisationTacheErrors"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model="item.observation"
            :error-messages="observationErrors"
            :label="$t('observation')"
            @input="$v.item.observation.$touch()"
            @blur="$v.item.observation.$touch()"
          />
        </v-col>

        <v-col cols="12" />
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import has from 'lodash/has'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  import InputDate from '../../InputDate'
  import { date } from '../../../validators/date'

  export default {
    name: 'JeuxDeLaVieTacheFaiteForm',
    components: {
      InputDate
    },
    mixins: [validationMixin],
    props: {
      values: {
        type: Object,
        required: true
      },

      errors: {
        type: Object,
        default: () => {}
      },

      initialValues: {
        type: Object,
        default: () => {}
      },

    },
    data () {
      return {
        tache: null,
        user: null,
        duration: null,
        dateRealisationTache: null,
        observation: null
      }
    },
    mounted () {
      this.tacheGetSelectItems()
      this.userGetSelectItems()
    },
    computed: {
      ...mapFields('jeuxdelavietache', {
        tacheSelectItems: 'selectItems'
      }),
      ...mapFields('user', {
        userSelectItems: 'selectItems'
      }),

      // eslint-disable-next-line
      item() {
        return this.initialValues || this.values
      },

      tacheErrors () {
        const errors = []

        if (!this.$v.item.tache.$dirty) return errors

        has(this.violations, 'tache') && errors.push(this.violations.tache)

        !this.$v.item.tache.required && errors.push(this.$t('Field is required'))

        return errors
      },
      userErrors () {
        const errors = []

        if (!this.$v.item.user.$dirty) return errors

        has(this.violations, 'user') && errors.push(this.violations.user)

        !this.$v.item.user.required && errors.push(this.$t('Field is required'))

        return errors
      },
      durationErrors () {
        const errors = []

        if (!this.$v.item.duration.$dirty) return errors

        has(this.violations, 'duration') && errors.push(this.violations.duration)

        return errors
      },
      dateRealisationTacheErrors () {
        const errors = []

        if (!this.$v.item.dateRealisationTache.$dirty) return errors

        has(this.violations, 'dateRealisationTache') && errors.push(this.violations.dateRealisationTache)

        return errors
      },
      observationErrors () {
        const errors = []

        if (!this.$v.item.observation.$dirty) return errors

        has(this.violations, 'observation') && errors.push(this.violations.observation)

        return errors
      },

      violations () {
        return this.errors || {}
      }
    },
    methods: {
      ...mapActions({
        tacheGetSelectItems: 'jeuxdelavietache/fetchSelectItems'
      }),
      ...mapActions({
        userGetSelectItems: 'user/fetchSelectItems'
      })
    },
    validations: {
      item: {
        tache: {
          required
        },
        user: {
          required
        },
        duration: {
        },
        dateRealisationTache: {
          date
        },
        observation: {
        }
      }
    }
  }
</script>
