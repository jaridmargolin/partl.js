/*!
 * partl.js
 * 
 * Copyright (c) 2014
 */

define([
  './left',
  './right',
  './applyLeft',
  './applyRight'
], function (left, right, applyLeft, applyRight) {


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


});