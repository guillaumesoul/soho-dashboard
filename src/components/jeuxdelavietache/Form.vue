<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model="item.name"
            :error-messages="nameErrors"
            :label="$t('name')"
            required
            @input="$v.item.name.$touch()"
            @blur="$v.item.name.$touch()"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-text-field
            v-model.number="item.difficulty"
            :error-messages="difficultyErrors"
            :label="$t('difficulty')"
            required
            @input="$v.item.difficulty.$touch()"
            @blur="$v.item.difficulty.$touch()"
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
            v-model="item.description"
            :error-messages="descriptionErrors"
            :label="$t('description')"
            @input="$v.item.description.$touch()"
            @blur="$v.item.description.$touch()"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-combobox
            v-model="item.category"
            :items="categorySelectItems"
            :error-messages="categoryErrors"
            :no-data-text="$t('No results')"
            :label="$t('category')"
            item-text="name"
            item-value="@id"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import has from 'lodash/has'
  import { validationMixin } from 'vuelidate'
  import { required, numeric } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'JeuxDeLaVieTacheForm',
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
      }
    },
    data () {
      return {
        name: null,
        difficulty: null,
        description: null,
        category: null
      }
    },
    mounted () {
      this.categoryGetSelectItems()
    },
    computed: {
      ...mapFields('jeuxdelaviecategory', {
        categorySelectItems: 'selectItems'
      }),

      // eslint-disable-next-line
    item() {
        return this.initialValues || this.values
      },

      nameErrors () {
        const errors = []

        if (!this.$v.item.name.$dirty) return errors

        has(this.violations, 'name') && errors.push(this.violations.name)

        !this.$v.item.name.required && errors.push(this.$t('Field is required'))

        return errors
      },
      difficultyErrors () {
        const errors = []

        if (!this.$v.item.difficulty.$dirty) return errors

        has(this.violations, 'difficulty') && errors.push(this.violations.difficulty)

        !this.$v.item.difficulty.required && errors.push(this.$t('Field is required'))
        !this.$v.item.difficulty.numeric && errors.push(this.$t('La valeur doit etre un nombre entier'))

        return errors
      },
      descriptionErrors () {
        const errors = []

        if (!this.$v.item.description.$dirty) return errors

        has(this.violations, 'description') && errors.push(this.violations.description)

        return errors
      },
      categoryErrors () {
        const errors = []

        if (!this.$v.item.category.$dirty) return errors

        has(this.violations, 'category') && errors.push(this.violations.category)

        return errors
      },

      violations () {
        return this.errors || {}
      }
    },
    methods: {
      ...mapActions({
        categoryGetSelectItems: 'jeuxdelaviecategory/fetchSelectItems'
      })
    },
    validations: {
      item: {
        name: {
          required
        },
        difficulty: {
          required: true,
          numeric: numeric
        },
        description: {
        },
        category: {
        }
      }
    }
  }
</script>
