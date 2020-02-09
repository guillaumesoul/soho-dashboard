<template>
  <div class="tache-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Tache List</h1>
        </v-flex>
        <v-flex lg12>
          <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <TacheFilterForm
              ref="filterForm"
              :values="filters"
              slot="filter"
            />
          </DataFilter>

          <br />

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
                <template slot="item.dateCreation" slot-scope="{ item }">
                  {{ formatDateTime(item['dateCreation'], 'long') }}
                </template>
                <template slot="item.userTaches" slot-scope="{ item }">
                  <ul>
                    <li v-for="_item in item['userTaches']" :key="_item.id">
                      {{ _item.id }}
                    </li>
                  </ul>
                </template>

            <ActionCell
              slot="item.action"
              slot-scope="props"
              :handle-show="() => showHandler(props.item)"
              :handle-edit="() => editHandler(props.item)"
              :handle-delete="() => deleteHandler(props.item)"
            ></ActionCell>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import ListMixin from '../../mixins/ListMixin';
import ActionCell from '../../components/ActionCell';
import TacheFilterForm from '../../components/tache/Filter';
import DataFilter from '../../components/DataFilter';
import Toolbar from '../../components/Toolbar';

export default {
  name: 'TacheList',
  servicePrefix: 'Tache',
  mixins: [ListMixin],
  components: {
    Toolbar,
    ActionCell,
    TacheFilterForm,
    DataFilter
  },
  data() {
    return {
      headers: [
        { text: 'name', value: 'name' },
        { text: 'description', value: 'description' },
        { text: 'dateCreation', value: 'dateCreation' },
        { text: 'userTaches', value: 'userTaches' },
        {
          text: 'Actions',
          value: 'action',
          sortable: false
        }
      ],
      selected: []
    };
  },
  computed: {
    ...mapGetters('tache', {
      items: 'list'
    }),
    ...mapFields('tache', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    })
  },
  methods: {
    ...mapActions('tache', {
      getPage: 'fetchAll',
      deleteItem: 'del'
    })
  }
};
</script>
