'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























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

/**
 * VueMultiVersion class
 */
var VueMultiVersion = function () {
  /**
   * Creates a new instance of VueMultiVersion with optional Vue passed
   * @param {Object} Vue
   */
  function VueMultiVersion(Vue) {
    classCallCheck(this, VueMultiVersion);

    this.Vue = Vue || require('vue');

    var _Vue$version$split = this.Vue.version.split('.'),
        _Vue$version$split2 = slicedToArray(_Vue$version$split, 1),
        major = _Vue$version$split2[0];

    this._major = major;
  }

  /**
   * returns the first or second argument based on the Vue.js major version
   * @param {*} vue1
   * @param {*} vue2
   * @returns {*}
   */


  createClass(VueMultiVersion, [{
    key: 'select',
    value: function select(vue1, vue2) {
      switch (this._major) {
        case '1':
          return vue1;
        case '2':
          return vue2;
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
     * @param {Object} vue1 - Vue.js 1.x component
     * @param {Object} vue2 - Vue.js 2.x component
     */

  }, {
    key: 'register',
    value: function register(name, vm, vue1, vue2) {
      if (typeof name !== 'string') throw new Error('no component name was provided');
      if ((typeof vm === 'undefined' ? 'undefined' : _typeof(vm)) !== 'object' || !vm.$options) throw new Error('invalid vm was provided');
      if ((typeof vue1 === 'undefined' ? 'undefined' : _typeof(vue1)) !== 'object') throw new Error('invalid Vue1 Component');
      if ((typeof vue2 === 'undefined' ? 'undefined' : _typeof(vue2)) !== 'object') throw new Error('invalid Vue2 Component');

      switch (this._major) {
        case '1':
          vm.$options.components[name] = this.Vue.extend(vue1);
          break;
        case '2':
          vm.$options.components[name] = this.Vue.extend(vue2);
          break;
        default:
          break;
      }
    }
  }]);
  return VueMultiVersion;
}();

/**
 * Creates a new instance of VueMultiVersion
 * @param Vue
 * @return {VueMultiVersion}
 * @constructor
 */


function Multi(Vue) {
  return new VueMultiVersion(Vue);
}

/**
 * Calls select without passing a Vue instance
 * @param vue1
 * @param vue2
 * @return {*}
 */
Multi.select = function select(vue1, vue2) {
  return new VueMultiVersion().select(vue1, vue2);
};

/**
 * Calls register without passing a Vue instance
 * @param name
 * @param vm
 * @param vue1
 * @param vue2
 * @return {*}
 */
Multi.register = function register(name, vm, vue1, vue2) {
  return new VueMultiVersion().register(name, vm, vue1, vue2);
};

module.exports = Multi;
