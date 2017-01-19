/**
 * @description Tools for selecting/registering components based on the Vue.js version
 * @author Branden Horiuchi <bjhoriuchi@gmail.com>
 */

/**
 * VueMultiVersion class
 */
class VueMultiVersion {
  /**
   * Creates a new instance of VueMultiVersion with optional Vue passed
   * @param {Object} Vue
   */
  constructor (Vue) {
    this.Vue = Vue || require('vue')
    let [ major ] = this.Vue.version.split('.')
    this._major = major
  }

  /**
   * returns the first or second argument based on the Vue.js major version
   * @param {*} vue1
   * @param {*} vue2
   * @returns {*}
   */
  select (vue1, vue2) {
    switch (this._major) {
      case '1':
        return vue1
      case '2':
        return vue2
      default:
        throw new Error('invalid Vue.js version')
    }
  }

  /**
   * registers the compatible version of a Vue.js component
   * Vue.js v1.x should call this function in the created lifecycle hook
   * Vue.js v2.x should call this function in the beforeCreate or created lifecycle hook
   * @param {String} name - component name to register
   * @param {Vue} vm - the Vue.js component vm (this)
   * @param {Object} vue1 - Vue.js 1.x component
   * @param {Object} vue2 - Vue.js 2.x component
   */
  register (name, vm, vue1, vue2) {
    if (typeof name !== 'string') throw new Error('no component name was provided')
    if (typeof vm !== 'object' || !vm.$options) throw new Error('invalid vm was provided')
    if (typeof vue1 !== 'object') throw new Error('invalid Vue1 Component')
    if (typeof vue2 !== 'object') throw new Error('invalid Vue2 Component')

    switch (this._major) {
      case '1':
        vm.$options.components[name] = this.Vue.extend(vue1)
        break
      case '2':
        vm.$options.components[name] = this.Vue.extend(vue2)
        break
      default:
        break
    }
  }
}

/**
 * Creates a new instance of VueMultiVersion
 * @param Vue
 * @return {VueMultiVersion}
 * @constructor
 */
function Multi (Vue) {
  return new VueMultiVersion(Vue)
}

/**
 * Calls select without passing a Vue instance
 * @param vue1
 * @param vue2
 * @return {*}
 */
Multi.select = function select (vue1, vue2) {
  return new VueMultiVersion().select(vue1, vue2)
}

/**
 * Calls register without passing a Vue instance
 * @param name
 * @param vm
 * @param vue1
 * @param vue2
 * @return {*}
 */
Multi.register = function register (name, vm, vue1, vue2) {
  return new VueMultiVersion().register(name, vm, vue1, vue2)
}

/**
 * Exports the main module
 */
export default Multi