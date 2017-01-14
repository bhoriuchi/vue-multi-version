<template>
  <div>
    <h4>Vue2Component {{version}}</h4>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  export default {
    created () {
      this.version = Vue.version
    },
    data () {
      return {
        version: '?'
      }
    }
  }
</script>
