<template>
  <div class="file-list">
    <v-alert type="info" :value="files.length <= 0">
      No files compressed
    </v-alert>
    <v-expansion-panel dark>
      <v-expansion-panel-content
        v-for="(file,i) in files"
        :key="i"
        expand-icon="mdi-menu-down"
      >
        <div slot="header">{{ file.name }}</div>
        <v-card>
          <v-card-actions>
            <a class="v-btn primary">Download</a>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import {
  VAlert,
  VCard,
  VCardActions,
  VExpansionPanel,
  VExpansionPanelContent,
} from 'vuetify/lib'

export default {
  props: ['files'],
  components: {
    VAlert,
    VCard,
    VCardActions,
    VExpansionPanel,
    VExpansionPanelContent,
  },
  data() {
    return {
    }
  }
}
</script>

<style>
</style>