<template>
  <div>
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    />
    <JeuxDeLaVieTacheFaiteForm
      ref="updateForm"
      v-if="item"
      :values="item"
      :errors="violations"
    />
    <Loading :visible="isLoading || deleteLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import JeuxDeLaVieTacheFaiteForm from '../../../components/jeuxdelavietachefaite/Form.vue';
import Loading from '../../../components/Loading';
import Toolbar from '../../../components/Toolbar';
import UpdateMixin from '../../../mixins/UpdateMixin';

const servicePrefix = 'JeuxDeLaVieTacheFaite';

export default {
  name: 'JeuxDeLaVieTacheFaiteUpdate',
  servicePrefix,
  mixins: [UpdateMixin],
  components: {
    Loading,
    Toolbar,
    JeuxDeLaVieTacheFaiteForm
  },

  computed: {
    ...mapFields('jeuxdelavietachefaite', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      violations: 'violations'
    }),
    ...mapGetters('jeuxdelavietachefaite', ['find'])

  },

  methods: {
    ...mapActions('jeuxdelavietachefaite', {
      deleteItem: 'del',
      retrieve: 'load',
      update: 'update',
    })
  }
};
</script>
