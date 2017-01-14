'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * @description Tools for selecting/registering components based on the Vue.js version
 * @author Branden Horiuchi <bjhoriuchi@gmail.com>
 */
var Vue = require('vue');

/**
 * Gets the current major version of Vue.js running
 * @returns {String}
 */
function vueMajorVersion() {
  var _Vue$version$split = Vue.version.split('.'),
      _Vue$version$split2 = slicedToArray(_Vue$version$split, 1),
      major = _Vue$version$split2[0];

  return major;
}

/**
 * returns the first or second argument based on the Vue.js major version
 * @param {*} Vue1Value
 * @param {*} Vue2Value
 * @returns {*}
 */
function select(Vue1Value, Vue2Value) {
  var major = vueMajorVersion();

  switch (major) {
    case '1':
      return Vue1Value;
    case '2':
      return Vue2Value;
    default:
      throw new Error('invalid Vue.js version');
  }
}

/**
 * registers the compatible version of a Vue.js component
 * Vue.js v1.x should call this function in the created lifecycle hook
 * Vue.js v2.x should call this function in the beforeCreate or created lifecycle hook
 * @param {String} name - component name to register
 * @param {Vue} vm - the Vue.js component vm (this)
 * @param {Object} Vue1Component - Vue.js 1.x component
 * @param {Object} Vue2Component - Vue.js 2.x component
 */
function register(name, vm, Vue1Component, Vue2Component) {
  if (typeof name !== 'string') throw new Error('no component name was provided');
  if ((typeof vm === 'undefined' ? 'undefined' : _typeof(vm)) !== 'object' || !vm.$options) throw new Error('invalid vm was provided');
  if ((typeof Vue1Component === 'undefined' ? 'undefined' : _typeof(Vue1Component)) !== 'object') throw new Error('invalid Vue1 Component');
  if ((typeof Vue2Component === 'undefined' ? 'undefined' : _typeof(Vue2Component)) !== 'object') throw new Error('invalid Vue2 Component');

  var major = vueMajorVersion();

  switch (major) {
    case '1':
      vm.$options.components[name] = Vue.extend(Vue1Component);
      break;
    case '2':
      vm.$options.components[name] = Vue.extend(Vue2Component);
      break;
    default:
      break;
  }
}

/**
 * Defaults to select behavior
 * @param {*} Vue1Value
 * @param {*} Vue2Value
 * @returns {*}
 * @constructor
 */
var VueMultiVersion = function VueMultiVersion(Vue1Value, Vue2Value) {
  return select(Vue1Value, Vue2Value);
};

// add methods
VueMultiVersion.select = select;
VueMultiVersion.register = register;

// export the module
module.exports = VueMultiVersion;
