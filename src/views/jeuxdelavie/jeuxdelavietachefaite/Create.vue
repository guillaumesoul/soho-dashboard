<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <JeuxDeLaVieTacheFaiteForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { createHelpers } from 'vuex-map-fields';
import JeuxDeLaVieTacheFaiteForm from '../../../components/jeuxdelavietachefaite/Form';
import Loading from '../../../components/Loading';
import Toolbar from '../../../components/Toolbar';
import CreateMixin from '../../../mixins/CreateMixin';

const servicePrefix = 'JeuxDeLaVieTacheFaite';

const { mapFields } = createHelpers({
  getterType: 'jeuxdelavietachefaite/getField',
  mutationType: 'jeuxdelavietachefaite/updateField'
});

export default {
  name: 'JeuxDeLaVieTacheFaiteCreate',
  servicePrefix,
  mixins: [CreateMixin],
  components: {
    Loading,
    Toolbar,
    JeuxDeLaVieTacheFaiteForm
  },
  data() {
    return {
      item: {}
    };
  },
  computed: {
    ...mapFields(['error', 'isLoading', 'created', 'violations'])
  },
  methods: {
    ...mapActions('jeuxdelavietachefaite', ['create', 'reset'])
  }
};
</script>
