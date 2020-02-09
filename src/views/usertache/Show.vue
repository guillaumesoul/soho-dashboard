<template>
  <div>
    <Toolbar :handle-delete="del">
      <template slot="left">
        <v-toolbar-title v-if="item">{{
          `${$options.servicePrefix} ${item['@id']}`
        }}</v-toolbar-title>
      </template>
    </Toolbar>

    <br />

    <div v-if="item" class="table-usertache-show">
      <v-simple-table>
        <template slot="default">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>

              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>{{ $t('user') }}</strong></td>
              <td>
                                    {{ item['user'].name }}
              </td>
            
              <td><strong>{{ $t('tache') }}</strong></td>
              <td>
                                    {{ item['tache'].name }}
              </td>
            </tr>
            
            <tr>
              <td><strong>{{ $t('date') }}</strong></td>
              <td>
                {{ formatDateTime(item['date'], 'long') }}              </td>
            
              <td><strong>{{ $t('duration') }}</strong></td>
              <td>
                {{ $n(item['duration']) }}              </td>
            </tr>
            
            <tr>
              <td><strong>{{ $t('comment') }}</strong></td>
              <td>
                                    {{ item['comment'] }}
              </td>
            
              <td></td>
            </tr>
            
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import Loading from '../../components/Loading';
import ShowMixin from '../../mixins/ShowMixin';
import Toolbar from '../../components/Toolbar';

const servicePrefix = 'UserTache';

export default {
  name: 'UserTacheShow',
  servicePrefix,
  components: {
      Loading,
      Toolbar
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields('usertache', {
      isLoading: 'isLoading'
    }),
    ...mapGetters('usertache', ['find'])
  },
  methods: {
    ...mapActions('usertache', {
      deleteItem: 'del',
      reset: 'reset',
      retrieve: 'load'
    })
  }
};
</script>
