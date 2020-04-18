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

    <div v-if="item" class="table-jeuxdelavietache-show">
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
              <td><strong>{{ $t('name') }}</strong></td>
              <td>
                                    {{ item['name'] }}
              </td>

              <td><strong>{{ $t('dateCreation') }}</strong></td>
              <td>
                {{ formatDateTime(item['dateCreation'], 'long') }}              </td>
            </tr>

            <tr>
              <td><strong>{{ $t('difficulty') }}</strong></td>
              <td>
                {{ $n(item['difficulty']) }}              </td>

              <td><strong>{{ $t('description') }}</strong></td>
              <td>
                                    {{ item['description'] }}
              </td>
            </tr>

            <tr>
              <td><strong>{{ $t('category') }}</strong></td>
              <td>
                                    {{ item['category'].name }}
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
import Loading from '../../../components/Loading';
import ShowMixin from '../../../mixins/ShowMixin';
import Toolbar from '../../../components/Toolbar';

const servicePrefix = 'JeuxDeLaVieTache';

export default {
  name: 'JeuxDeLaVieTacheShow',
  servicePrefix,
  components: {
      Loading,
      Toolbar
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields('jeuxdelavietache', {
      isLoading: 'isLoading'
    }),
    ...mapGetters('jeuxdelavietache', ['find'])
  },
  methods: {
    ...mapActions('jeuxdelavietache', {
      deleteItem: 'del',
      reset: 'reset',
      retrieve: 'load'
    })
  }
};
</script>
