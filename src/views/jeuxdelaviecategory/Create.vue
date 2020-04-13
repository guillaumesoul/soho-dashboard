<template>
  <div>
    <toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
    />
    <jeux-de-la-vie-category-form
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
  import JeuxDeLaVieCategoryForm from '../../components/jeuxdelaviecategory/Form'
  import Loading from '../../components/Loading'
  import Toolbar from '../../components/Toolbar'
  import CreateMixin from '../../mixins/CreateMixin'

  const servicePrefix = 'JeuxDeLaVieCategory'

  const { mapFields } = createHelpers({
    getterType: 'jeuxdelaviecategory/getField',
    mutationType: 'jeuxdelaviecategory/updateField'
  })

  export default {
    name: 'JeuxDeLaVieCategoryCreate',
    servicePrefix,
    components: {
      Loading,
      Toolbar,
      JeuxDeLaVieCategoryForm
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
      ...mapActions('jeuxdelaviecategory', ['create', 'reset'])
    }
  }
</script>
