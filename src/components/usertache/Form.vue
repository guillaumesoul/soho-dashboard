<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.user"
            :items="userSelectItems"
            :error-messages="userErrors"
            :no-data-text="$t('No results')"
            :label="$t('user')"
            item-text="name"
            item-value="@id"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.tache"
            :items="tacheSelectItems"
            :error-messages="tacheErrors"
            :no-data-text="$t('No results')"
            :label="$t('tache')"
            item-text="name"
            item-value="@id"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.date"
            :label="$t('date')"
            :error-messages="dateErrors"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.duration"
            :error-messages="durationErrors"
            :label="$t('duration')"
            @input="$v.item.duration.$touch()"
            @blur="$v.item.duration.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.comment"
            :error-messages="commentErrors"
            :label="$t('comment')"
            @input="$v.item.comment.$touch()"
            @blur="$v.item.comment.$touch()"
          />
        </v-col>
      
        <v-col cols="12"></v-col>
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
  name: 'UserTacheForm',
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
      this.userGetSelectItems();
      this.tacheGetSelectItems();
  },
  data() {
    return {
        user: null,
        tache: null,
        date: null,
        duration: null,
        comment: null,
    };
  },
  computed: {
      ...mapFields('user', {
        userSelectItems: 'selectItems'
      }),
      ...mapFields('tache', {
        tacheSelectItems: 'selectItems'
      }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    userErrors() {
      const errors = [];

      if (!this.$v.item.user.$dirty) return errors;

      has(this.violations, 'user') && errors.push(this.violations.user);


      return errors;
    },
    tacheErrors() {
      const errors = [];

      if (!this.$v.item.tache.$dirty) return errors;

      has(this.violations, 'tache') && errors.push(this.violations.tache);


      return errors;
    },
    dateErrors() {
      const errors = [];

      if (!this.$v.item.date.$dirty) return errors;

      has(this.violations, 'date') && errors.push(this.violations.date);


      return errors;
    },
    durationErrors() {
      const errors = [];

      if (!this.$v.item.duration.$dirty) return errors;

      has(this.violations, 'duration') && errors.push(this.violations.duration);


      return errors;
    },
    commentErrors() {
      const errors = [];

      if (!this.$v.item.comment.$dirty) return errors;

      has(this.violations, 'comment') && errors.push(this.violations.comment);


      return errors;
    },

    violations() {
      return this.errors || {};
    }
  },
  methods: {
      ...mapActions({
        userGetSelectItems: 'user/fetchSelectItems'
      }),
      ...mapActions({
        tacheGetSelectItems: 'tache/fetchSelectItems'
      }),
  },
  validations: {
    item: {
      user: {
      },
      tache: {
      },
      date: {
        date,
      },
      duration: {
      },
      comment: {
      },
    }
  }
};
</script>
