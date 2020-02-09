<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.name"
            :error-messages="nameErrors"
            :label="$t('name')"
            @input="$v.item.name.$touch()"
            @blur="$v.item.name.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.description"
            :error-messages="descriptionErrors"
            :label="$t('description')"
            @input="$v.item.description.$touch()"
            @blur="$v.item.description.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.dateCreation"
            :label="$t('dateCreation')"
            :error-messages="dateCreationErrors"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.userTaches"
            :items="userTachesSelectItems"
            :error-messages="userTachesErrors"
            :no-data-text="$t('No results')"
            :label="$t('userTaches')"
            multiple
            item-text="name"
            item-value="@id"
            chips
          />
        </v-col>
      </v-row>
      
    </v-container>
  </v-form>
</template>

<script>
import has from 'lodash/has';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import InputDate from '../InputDate';
import { date } from '../../validators/date';

export default {
  name: 'TacheForm',
  mixins: [validationMixin],
  components: {
    InputDate,
  },
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
  mounted() {
      this.userTachesGetSelectItems();
  },
  data() {
    return {
        name: null,
        description: null,
        dateCreation: null,
        userTaches: null,
    };
  },
  computed: {
      ...mapFields('usertache', {
        userTachesSelectItems: 'selectItems'
      }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    nameErrors() {
      const errors = [];

      if (!this.$v.item.name.$dirty) return errors;

      has(this.violations, 'name') && errors.push(this.violations.name);


      return errors;
    },
    descriptionErrors() {
      const errors = [];

      if (!this.$v.item.description.$dirty) return errors;

      has(this.violations, 'description') && errors.push(this.violations.description);


      return errors;
    },
    dateCreationErrors() {
      const errors = [];

      if (!this.$v.item.dateCreation.$dirty) return errors;

      has(this.violations, 'dateCreation') && errors.push(this.violations.dateCreation);


      return errors;
    },
    userTachesErrors() {
      const errors = [];

      if (!this.$v.item.userTaches.$dirty) return errors;

      has(this.violations, 'userTaches') && errors.push(this.violations.userTaches);


      return errors;
    },

    violations() {
      return this.errors || {};
    }
  },
  methods: {
      ...mapActions({
        userTachesGetSelectItems: 'usertache/fetchSelectItems'
      }),
  },
  validations: {
    item: {
      name: {
      },
      description: {
      },
      dateCreation: {
        date,
      },
      userTaches: {
      },
    }
  }
};
</script>
