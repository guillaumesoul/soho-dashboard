<template>
  <div>
    <toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
    />
    <jeux-de-la-vie-tache-form
      ref="createForm"
      :values="item"
      :errors="violations"
    />
    <loading :visible="isLoading" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { createHelpers } from 'vuex-map-fields'
  import JeuxDeLaVieTacheForm from '../../../components/jeuxdelavie/jeuxdelavietache/Form'
  import Loading from '../../../components/Loading'
  import Toolbar from '../../../components/Toolbar'
  import CreateMixin from '../../../mixins/CreateMixin'

  const servicePrefix = 'JeuxDeLaVieTache'

  const { mapFields } = createHelpers({
    getterType: 'jeuxdelavietache/getField',
    mutationType: 'jeuxdelavietache/updateField'
  })

  export default {
    name: 'JeuxDeLaVieTacheCreate',
    servicePrefix,
    components: {
      Loading,
      Toolbar,
      JeuxDeLaVieTacheForm
    },
    mixins: [CreateMixin],
    data () {
      return {
        item: {}
      }
    },
    computed: {
      ...mapFields(['error', 'isLoading', 'created', 'violations'])
    },
    methods: {
      ...mapActions('jeuxdelavietache', ['create', 'reset'])
    }
  }
</script>
