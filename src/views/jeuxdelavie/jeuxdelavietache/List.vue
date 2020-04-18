<template>
  <div class="jeuxdelavietache-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>JeuxDeLaVieTache List</h1>
        </v-flex>
        <v-flex lg12>
          <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <JeuxDeLaVieTacheFilterForm
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
                <template slot="item.difficulty" slot-scope="{ item }">
                  {{ $n(item['difficulty']) }}
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
import ListMixin from '../../../mixins/ListMixin';
import ActionCell from '../../../components/ActionCell';
import JeuxDeLaVieTacheFilterForm from '../../../components/jeuxdelavie/jeuxdelavietache/Filter';
import DataFilter from '../../../components/DataFilter';
import Toolbar from '../../../components/Toolbar';

export default {
  name: 'JeuxDeLaVieTacheList',
  servicePrefix: 'JeuxDeLaVieTache',
  mixins: [ListMixin],
  components: {
    Toolbar,
    ActionCell,
    JeuxDeLaVieTacheFilterForm,
    DataFilter
  },
  data() {
    return {
      headers: [
        { text: 'name', value: 'name' },
        { text: 'dateCreation', value: 'dateCreation' },
        { text: 'difficulty', value: 'difficulty' },
        { text: 'description', value: 'description' },
        { text: 'category', value: 'category' },
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
    ...mapGetters('jeuxdelavietache', {
      items: 'list'
    }),
    ...mapFields('jeuxdelavietache', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    })
  },
  methods: {
    ...mapActions('jeuxdelavietache', {
      getPage: 'fetchAll',
      deleteItem: 'del'
    })
  }
};
</script>
