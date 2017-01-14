# vue-multi-version

selects or registers Vue.js 1.x or 2.x based on the current Vue.js major version

### About

This library can be used to support components that are compatible with Vue.js 1.x and 2.x. The library checks the required Vue.js version and returns or registers an appropriate component

Requires that `Vue.js` `1.x` or `2.x` is included in your project

### Example Register (webpack + es6)

```js
<template>
  <div>
    <my-component></my-component>
  </div>
</template>

<script type='text/babel'>
  import multi from 'vue-multi-version'
  import MyComponentVue1x from './MyComponentVue1x.vue'
  import MyComponentVue2x from './MyComponentVue2x.vue'

  export default {
    created () {
      multi.register('MyComponent', this, MyComponentVue1x, MyComponentVue2x)
    }
  }
</script>
```

### API

---

#### VueMultiVersion ( `Vue1Value`, `Vue2Value` )

Returns the first argument if `1.x` and the second if `2.x`

**Parameters**

* `Vue1Value` { `*` } - any value that requires Vue.js 1.x
* `Vue2Value` { `*` } - any value that requires Vue.js 2.x

*Returns* { * } - the first or second argument

---

#### VueMultiVersion.register ( `name`, `vm`, `Vue1Component`, `Vue2Component` )

Registers `Vue1Component` or `Vue2Component` based on the Vue.js version

**Parameters**

* `name` { `String` } - name to use for component registration
* `vm` { `Object` } - the current Vue.js component instance
* `Vue1Component` { `Object` } - Vue.js 1.x component
* `Vue2Component` { `Object` } - Vue.js 2.x component
