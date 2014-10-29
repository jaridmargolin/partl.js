/*!
 * utils.js
 * 
 * Copyright (c) 2014
 */




/* -----------------------------------------------------------------------------
 * scope
 * ---------------------------------------------------------------------------*/

var root = this;


/* -----------------------------------------------------------------------------
 * utils
 * ---------------------------------------------------------------------------*/

var _ = {

  /**
   * Normalize passed args by returning an object with context
   * and function to execute.
   *
   * @public
   *
   * @param {array} args - Original arguments passed to method.
   */
  normalize: function (args) {
    // no fn passed
    if (!args[1]) {
      args[1] = args[0];
      args[0] = root;
    }

    // fn is a methodName
    if (typeof args[1] === 'string') {
      args[1] = args[0][args[1]];
    }

    return {
      context: args[0],
      fn: args[1]
    };
  },

  /**
   * Wrapper used on all partial calls. Accepts individually passed
   * arguments.
   *
   * @public
   *
   * @param {function} onCall - Fn to wrap.
   * @param {...*} args - Any argument you would like to be partially applied.
   */
  callWrap: function (onCall) {
    return function () {
      return _.wrap(arguments, onCall);
    };
  },

  /**
   * Wrapper used on all apply calls. Accepts array of arguments.
   *
   * @public
   *
   * @param {function} onCall - Fn to wrap.
   * @param {...*} args - Any argument you would like to be partially applied.
   */
  applyWrap: function (onCall) {
    return function (args) {
      return _.wrap(args, onCall);
    };
  },

  /**
   * Returns a function that will return a function with captured
   * arguments. The second returned function will execute the passed
   * callback when called, passing the first set of arguments as the first
   * parameter, and the second set of arguments as the second paramter. Used
   * interally by all methods to allow `partl(context, method)(argsToApply)`.
   *
   * @private
   *
   * @param {function} onCall - Function to call with args1, and args2 on
   * execution.
   */
  wrap: function (args, onCall) {
    var args1 = _.toArray(args);
    return function () {
      var args2 = _.toArray(arguments);
      return onCall.call(this, args1, args2);
    };
  },

  /**
   * Convert fake arguments array to real array.
   *
   * @public
   *
   * @param {array} args - Fake array to convert.
   */
  toArray: function (args) {
    return Array.prototype.slice.call(args, 0);
  }

};


/* -----------------------------------------------------------------------------
 * export
 * ---------------------------------------------------------------------------*/

module.exports = _;


