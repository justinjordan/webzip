<template>
  <div class="process-list">
    <v-alert type="info" :value="!hasProcesses()">
      No files compressed
    </v-alert>
    <v-list v-if="hasProcesses()">
      <template v-for="(process, i) in processes">
        <v-list-tile avatar :key="process.filename">

          <v-list-tile-avatar>
            <template v-if="process.complete && !process.error">
              <v-icon>check_circle</v-icon>
            </template>
            <template v-else-if="process.complete && process.error">
              <v-icon>check_circle</v-icon>
            </template>
            <template v-else>
              <v-icon>archive</v-icon>
            </template>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <span v-if="process.complete">{{ process.filename }}</span>
              <v-progress-linear
                v-model="process.progress"
                :active="!process.complete"
                :indeterminate="process.progress === null"
              ></v-progress-linear>
            </v-list-tile-title>

            <v-list-tile-sub-title>
              {{ process.status }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon v-if="process.complete">
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action v-if="process.complete">
            <v-btn icon v-if="process.complete">
              <v-icon>save_alt</v-icon>
            </v-btn>
          </v-list-tile-action>

        </v-list-tile>

        <v-divider :key="i" v-if="i < processes.length - 1"></v-divider>

      </template>

    </v-list>
  </div>
</template>

<script>
import {
  VAlert,
  VBtn,
  VDivider,
  VIcon,
  VList,
  VListTile,
  VListTileAction,
  VListTileAvatar,
  VListTileContent,
  VListTileSubTitle,
  VListTileTitle,
} from 'vuetify/lib'

export default {
  props: ['processes'],
  components: {
    VAlert,
    VBtn,
    VDivider,
    VIcon,
    VList,
    VListTile,
    VListTileAction,
    VListTileAvatar,
    VListTileContent,
    VListTileSubTitle,
    VListTileTitle,
  },
  data() {
    return {
    }
  },
  methods: {
    hasProcesses() {
      return this.processes instanceof Array && this.processes.length > 0
    }
  }
}
</script>

<style>
</style>