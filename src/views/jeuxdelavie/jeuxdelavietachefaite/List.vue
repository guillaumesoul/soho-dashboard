<template>
  <div class="jeuxdelavietachefaite-list">
    <toolbar :handle-add="addHandler" />

    <v-container
      grid-list-xl
      fluid
    >
      <v-layout
        row
        wrap
      >
        <v-flex sm12>
          <h1>JeuxDeLaVieTacheFaite List</h1>
        </v-flex>
        <v-flex lg12>
          <data-filter
            :handle-filter="onSendFilter"
            :handle-reset="resetFilter"
          >
            <jeux-de-la-vie-tache-faite-filter-form
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
          </data-filter>

          <br>

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :items-per-page.sync="options.itemsPerPage"
            :loading="isLoading"
            :loading-text="$t('Loading...')"
            :options.sync="options"
            :server-items-length="totalItems"
            class="elevation-1"
            item-key="@id"
            show-select
            @update:options="onUpdateOptions"
          >
            <template
              slot="item.duration"
              slot-scope="{ item }"
            >
              {{ $n(item['duration']) }}
            </template>
            <template
              slot="item.dateEnregistrement"
              slot-scope="{ item }"
            >
              {{ formatDateTime(item['dateEnregistrement'], 'long') }}
            </template>
            <template
              slot="item.dateRealisationTache"
              slot-scope="{ item }"
            >
              {{ formatDateTime(item['dateRealisationTache'], 'long') }}
            </template>

            <action-cell
              slot="item.action"
              slot-scope="props"
              :handle-show="() => showHandler(props.item)"
              :handle-edit="() => editHandler(props.item)"
              :handle-delete="() => deleteHandler(props.item)"
            />
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { mapFields } from 'vuex-map-fields'
  import ListMixin from '../../../mixins/ListMixin'
  import ActionCell from '../../../components/ActionCell'
  import JeuxDeLaVieTacheFaiteFilterForm from '../../../components/jeuxdelavie/jeuxdelavietachefaite/Filter'
  import DataFilter from '../../../components/DataFilter'
  import Toolbar from '../../../components/Toolbar'

  export default {
    name: 'JeuxDeLaVieTacheFaiteList',
    servicePrefix: 'JeuxDeLaVieTacheFaite',
    components: {
      Toolbar,
      ActionCell,
      JeuxDeLaVieTacheFaiteFilterForm,
      DataFilter
    },
    mixins: [ListMixin],
    data () {
      return {
        headers: [
          { text: 'tache', value: 'tache' },
          { text: 'user', value: 'user' },
          { text: 'duration', value: 'duration' },
          { text: 'dateEnregistrement', value: 'dateEnregistrement' },
          { text: 'dateRealisationTache', value: 'dateRealisationTache' },
          { text: 'observation', value: 'observation' },
          {
            text: 'Actions',
            value: 'action',
            sortable: false
          }
        ],
        selected: []
      }
    },
    computed: {
      ...mapGetters('jeuxdelavietachefaite', {
        items: 'list'
      }),
      ...mapFields('jeuxdelavietachefaite', {
        deletedItem: 'deleted',
        error: 'error',
        isLoading: 'isLoading',
        resetList: 'resetList',
        totalItems: 'totalItems',
        view: 'view'
      })
    },
    methods: {
      ...mapActions('jeuxdelavietachefaite', {
        getPage: 'fetchAll',
        deleteItem: 'del'
      })
    }
  }
</script>
