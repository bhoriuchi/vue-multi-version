<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <multicomponent></multicomponent>
  </div>
</template>

<script type="text/babel">
  import Vue1Component from '../../../src/Vue1Component'
  import Vue2Component from '../../../src/Vue2Component'
  import VueMultiVersion from '../../../src/index'
  export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      }
    },
    created () {
      VueMultiVersion.register('multicomponent', this, Vue1Component, Vue2Component)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
