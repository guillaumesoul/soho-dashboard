<template>
  <div>
    <toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
    />
    <jeux-de-la-vie-tache-faite-form
      ref="createForm"
      :values="item"
      :errors="violations"
      :initial-values="initialValues"
    />
    <loading :visible="isLoading" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  import JeuxDeLaVieTacheFaiteForm from '../../../components/jeuxdelavie/jeuxdelavietachefaite/Form'
  import Loading from '../../../components/Loading'
  import Toolbar from '../../../components/Toolbar'
  import CreateMixin from '../../../mixins/CreateMixin'

  const servicePrefix = 'JeuxDeLaVieTacheFaite'

  const { mapFields } = createHelpers({
    getterType: 'jeuxdelavietachefaite/getField',
    mutationType: 'jeuxdelavietachefaite/updateField'
  })

  export default {
    name: 'JeuxDeLaVieTacheFaiteCreate',
    servicePrefix,
    components: {
      Loading,
      Toolbar,
      JeuxDeLaVieTacheFaiteForm
    },
    mixins: [CreateMixin],
    props: {
      tache: {
        required: false,
        type: Object
      }
    },
    data () {
      return {
        item: {}
      }
    },
    computed: {
      ...mapFields(['error', 'isLoading', 'created', 'violations']),
      ...mapGetters(['currentUser']),
      initialValues: function () {
        let tacheFaite = {}
        if (this.tache !== undefined) tacheFaite.tache = this.tache
        if (this.currentUser !== undefined) tacheFaite.user = this.currentUser
        return tacheFaite
      }
    },
    methods: {
      ...mapActions('jeuxdelavietachefaite', ['create', 'reset'])
    }
  }
</script>
