<template>
  <div id="app">
    <h1>Webzip</h1>
    <p class="error">{{ error }}</p>
    <FilePicker :onSelect="onFileSelected"></FilePicker>
  </div>
</template>

<script>
import FilePicker from '@/components/FilePicker.vue'
import FileEncoder from '@/services/FileEncoder.js'

export default {
  name: 'app',
  components: {
    FilePicker 
  },
  data() {
    return {
      error: ''
    }
  },
  methods: {
    onFileSelected(file) {
      FileEncoder.encodeFile(file).then(encodedFile => {
        console.log('encoded file', encodedFile)
      }).catch(error => {
        this.error = error.message
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .error {
  color: rgb(185, 33, 33);
}
</style>
