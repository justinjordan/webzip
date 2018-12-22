<template>
  <div>
    <input
      type="file"
      style="display: none;"
      @change="onFileSelect"
      ref="fileInput"
      multiple
      webkitdirectory
      directory
    >
    <v-btn
      :loading="loading"
      @click="chooseFile"
      color="primary"
    >
      <v-icon left>archive</v-icon> Compress File
      <span slot="loader">
        <v-progress-circular
          :indeterminate="!progress"
          :value="progress"
          size="25"
        ></v-progress-circular>
      </span>
    </v-btn>
  </div>
</template>

<script>
import {
  VBtn,
  VIcon,
  VProgressCircular,
} from 'vuetify/lib'

export default {
  components: {
    VBtn,
    VIcon,
    VProgressCircular,
  },
  data() {
    return {
      filename: ''
    }
  },
  props: [
    'onSelect',
    'loading',
    'progress',
  ],
  methods: {
    chooseFile() {
      this.$refs.fileInput.click()
    },
    onFileSelect(e) {
      this.onSelect(e.target.files)
    }
  }
}
</script>

<style>

</style>
