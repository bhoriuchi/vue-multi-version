<template>
  <div>
    <h4>Vue1Component {{version}}</h4>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  export default {
    ready () {
      this.version = Vue.version
    },
    data () {
      return {
        version: '?'
      }
    }
  }
</script>
