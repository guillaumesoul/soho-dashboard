<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.email"
            :error-messages="emailErrors"
            :label="$t('email')"
            @input="$v.item.email.$touch()"
            @blur="$v.item.email.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.roles"
            :error-messages="rolesErrors"
            :label="$t('roles')"
            @input="$v.item.roles.$touch()"
            @blur="$v.item.roles.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.password"
            :error-messages="passwordErrors"
            :label="$t('password')"
            @input="$v.item.password.$touch()"
            @blur="$v.item.password.$touch()"
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

export default {
  name: 'UserForm',
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
  mounted() {
      this.userTachesGetSelectItems();
  },
  data() {
    return {
        email: null,
        roles: null,
        password: null,
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

    emailErrors() {
      const errors = [];

      if (!this.$v.item.email.$dirty) return errors;

      has(this.violations, 'email') && errors.push(this.violations.email);


      return errors;
    },
    rolesErrors() {
      const errors = [];

      if (!this.$v.item.roles.$dirty) return errors;

      has(this.violations, 'roles') && errors.push(this.violations.roles);


      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.item.password.$dirty) return errors;

      has(this.violations, 'password') && errors.push(this.violations.password);


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
      email: {
      },
      roles: {
      },
      password: {
      },
      userTaches: {
      },
    }
  }
};
</script>
