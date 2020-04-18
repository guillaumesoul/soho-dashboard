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

    <div v-if="item" class="table-jeuxdelavietachefaite-show">
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
              <td><strong>{{ $t('tache') }}</strong></td>
              <td>
                                    {{ item['tache'].name }}
              </td>

              <td><strong>{{ $t('user') }}</strong></td>
              <td>
                                    {{ item['user'].name }}
              </td>
            </tr>

            <tr>
              <td><strong>{{ $t('duration') }}</strong></td>
              <td>
                {{ $n(item['duration']) }}              </td>

              <td><strong>{{ $t('dateEnregistrement') }}</strong></td>
              <td>
                {{ formatDateTime(item['dateEnregistrement'], 'long') }}              </td>
            </tr>

            <tr>
              <td><strong>{{ $t('dateRealisationTache') }}</strong></td>
              <td>
                {{ formatDateTime(item['dateRealisationTache'], 'long') }}              </td>

              <td><strong>{{ $t('observation') }}</strong></td>
              <td>
                                    {{ item['observation'] }}
              </td>
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
import Loading from '../../../components/Loading';
import ShowMixin from '../../../mixins/ShowMixin';
import Toolbar from '../../../components/Toolbar';

const servicePrefix = 'JeuxDeLaVieTacheFaite';

export default {
  name: 'JeuxDeLaVieTacheFaiteShow',
  servicePrefix,
  components: {
      Loading,
      Toolbar
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields('jeuxdelavietachefaite', {
      isLoading: 'isLoading'
    }),
    ...mapGetters('jeuxdelavietachefaite', ['find'])
  },
  methods: {
    ...mapActions('jeuxdelavietachefaite', {
      deleteItem: 'del',
      reset: 'reset',
      retrieve: 'load'
    })
  }
};
</script>
