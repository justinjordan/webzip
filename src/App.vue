<template>
  <v-app dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>WebZip</v-toolbar-title>
      <v-spacer></v-spacer>

      <FilePicker :onSelect="onFileSelected"></FilePicker>

    </v-toolbar>
    <v-content>
      <v-container fluid>

        <ProcessList :processes="processes"></ProcessList>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  VApp,
  VContainer,
  VContent,
  VSpacer,
  VToolbar,
  VToolbarTitle,
  // VToolbarSideIcon,
} from 'vuetify/lib'
import FilePicker from '@/components/FilePicker.vue'
import ProcessList from '@/components/ProcessList.vue'
import FileEncoder from '@/services/FileEncoder.js'

export default {
  name: 'app',
  components: {
    ProcessList,
    FilePicker,
    VApp,
    VContainer,
    VContent,
    VSpacer,
    VToolbar,
    VToolbarTitle,
    // VToolbarSideIcon,
  },
  data() {
    return {
      error: '',
      processes: [],
      alert: true,
    }
  },
  methods: {
    onFileSelected(files) {
      const encoder = new FileEncoder()
      encoder.encodeFiles(files).then(response => {

      })
      this.processes.unshift(encoder)
    }
  }
}
</script>

<style>
</style>
