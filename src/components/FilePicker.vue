<template>
  <div>
    <input type="file" @change="onFileSelect">
  </div>
</template>

<script>
export default {
  data() {
    return {
      filename: ''
    }
  },
  props: ['onSelect'],
  methods: {
    onFileSelect(e) {
      this.onSelect(e.target.files[0])
    }
  }
}
</script>

<style>

</style>
