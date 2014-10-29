(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['partl'] = factory();
  }
}(this, function () {

/*!
 * utils.js
 * 
 * Copyright (c) 2014
 */
var utils, left, right, applyLeft, applyRight, partl;
utils = function () {
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
        onCall.call(this, args1, args2);
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
  return _;
}();
/*!
 * left.js
 * 
 * Copyright (c) 2014
 */
left = function (_) {
  /* -----------------------------------------------------------------------------
   * left
   * ---------------------------------------------------------------------------*/
  /**
   * Append partially applied arguments. Arguments are passed as individual
   * paramaters.
   *
   * @public
   *
   * @example
   * partl.left(fn)(arg1, arg2);
   * partl.left(context, fn)(arg1, arg2);
   * partl.left(obj, 'methodName')(arg1, arg2);
   *
   * @param {object} [context] - Context in which to execute fn. If no context
   *   is passed the root context will be used (winodw in browser).
   * @param {function|string} fn - Function in which to apply arguments to. If
   *   a string is passed, it is assumed to be a method of the passed context.
   *
   * @returns {function} Function that accepts parameters to partially apply
   *   to fn.
   */
  return function (context, fn) {
    var params = _.normalize(arguments);
    return _.callWrap(function (args1, args2) {
      params.fn.apply(params.context, args1.concat(args2));
    });
  };
}(utils);
/*!
 * right.js
 * 
 * Copyright (c) 2014
 */
right = function (_) {
  /* -----------------------------------------------------------------------------
   * right
   * ---------------------------------------------------------------------------*/
  /**
   * Prepend partially applied arguments. Arguments are passed as individual
   * paramaters.
   *
   * @public
   *
   * @example
   * partl.right(fn)(arg1, arg2);
   * partl.right(context, fn)(arg1, arg2);
   * partl.right(obj, 'methodName')(arg1, arg2);
   *
   * @param {object} [context] - Context in which to execute fn. If no context
   *   is passed the root context will be used (winodw in browser).
   * @param {function|string} fn - Function in which to apply arguments to. If
   *   a string is passed, it is assumed to be a method of the passed context.
   *
   * @returns {function} Function that accepts parameters to partially apply
   *   to fn.
   */
  return function () {
    var params = _.normalize(arguments);
    return _.callWrap(function (args1, args2) {
      params.fn.apply(params.context, args2.concat(args1));
    });
  };
}(utils);
/*!
 * applyLeft.js
 * 
 * Copyright (c) 2014
 */
applyLeft = function (_) {
  /* -----------------------------------------------------------------------------
   * applyLeft
   * ---------------------------------------------------------------------------*/
  /**
   * Append partially applied arguments. Arguments are passed as array.
   *
   * @public
   *
   * @example
   * partl.applyLeft(fn)(arg1, arg2);
   * partl.applyLeft(context, fn)(arg1, arg2);
   * partl.applyLeft(obj, 'methodName')(arg1, arg2);
   *
   * @param {object} [context] - Context in which to execute fn. If no context
   *   is passed the root context will be used (winodw in browser).
   * @param {function|string} fn - Function in which to apply arguments to. If
   *   a string is passed, it is assumed to be a method of the passed context.
   *
   * @returns {function} Function that accepts parameters to partially apply
   *   to fn.
   */
  return function () {
    var params = _.normalize(arguments);
    return _.applyWrap(function (args1, args2) {
      params.fn.apply(params.context, args1.concat(args2));
    });
  };
}(utils);
/*!
 * applyRight.js
 * 
 * Copyright (c) 2014
 */
applyRight = function (_) {
  /* -----------------------------------------------------------------------------
   * applyRight
   * ---------------------------------------------------------------------------*/
  /**
   * Prepend partially applied arguments. Arguments are passed as array.
   *
   * @public
   *
   * @example
   * partl.applyRight(fn)(arg1, arg2);
   * partl.applyRight(context, fn)(arg1, arg2);
   * partl.applyRight(obj, 'methodName')(arg1, arg2);
   *
   * @param {object} [context] - Context in which to execute fn. If no context
   *   is passed the root context will be used (winodw in browser).
   * @param {function|string} fn - Function in which to apply arguments to. If
   *   a string is passed, it is assumed to be a method of the passed context.
   *
   * @returns {function} Function that accepts parameters to partially apply
   *   to fn.
   */
  return function () {
    var params = _.normalize(arguments);
    return _.applyWrap(function (args1, args2) {
      params.fn.apply(params.context, args2.concat(args1));
    });
  };
}(utils);
/*!
 * partl.js
 * 
 * Copyright (c) 2014
 */
partl = function (left, right, applyLeft, applyRight) {
  /* -----------------------------------------------------------------------------
   * partl
   * ---------------------------------------------------------------------------*/
  /**
   * Proxy to partl.left. Exposed as root method for quick access.
   *
   * @public
   *
   * @example
   * partl(fn)(arg1, arg2);
   * partl(context, fn)(arg1, arg2);
   * partl(obj, 'methodName')(arg1, arg2);
   *
   * @param {object} [context] - Context in which to execute fn. If no context
   *   is passed the root context will be used (winodw in browser).
   * @param {function|string} fn - Function in which to apply arguments to. If
   *   a string is passed, it is assumed to be a method of the passed context.
   *
   * @returns {function} Function that accepts parameters to partially apply
   *   to fn.
   */
  var p = function () {
    return left.apply(this, arguments);
  };
  // Attach variations as static methods
  p.left = left;
  p.right = right;
  p.applyLeft = applyLeft;
  p.applyRight = applyRight;
  /* -----------------------------------------------------------------------------
   * export
   * ---------------------------------------------------------------------------*/
  return p;
}(left, right, applyLeft, applyRight);

return partl;


}));