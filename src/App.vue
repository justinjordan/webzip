<template>
  <v-app dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>WebZip</v-toolbar-title>
      <v-spacer></v-spacer>

      <FilePicker
        :onSelect="onFileSelected"
        :loading="compressing"
        :progress="progress"
      ></FilePicker>

    </v-toolbar>
    <v-content>
      <v-container fluid>

        <FileList :files="files"></FileList>

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
  VToolbarSideIcon,
} from 'vuetify/lib'
import FilePicker from '@/components/FilePicker.vue'
import FileList from '@/components/FileList.vue'
import FileEncoder from '@/services/FileEncoder.js'

export default {
  name: 'app',
  components: {
    FileList,
    FilePicker,
    VApp,
    VContainer,
    VContent,
    VSpacer,
    VToolbar,
    VToolbarTitle,
    VToolbarSideIcon,
  },
  data() {
    return {
      error: '',
      files: [],
      alert: true,
      compressing: false,
      progress: 0,
    }
  },
  methods: {
    onFileSelected(file) {
      this.compressing = true;

      this.interval = setInterval(() => {
        this.progress += 20
        
        if (this.progress >= 100) {
          clearInterval(this.interval)

          setTimeout(() => {
            this.compressing = false
            this.progress = 0
          }, 1000)
        }
      }, 1000)

      FileEncoder.encodeFile(file).then(encodedFile => {
        this.files.push({
          name: 'Somefile',
          success: true,
        })
        console.log('encoded file', encodedFile)
      }).catch(error => {
        this.error = error.message
      })
    }
  }
}
</script>

<style>
</style>
