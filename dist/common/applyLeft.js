/*!
 * applyLeft.js
 * 
 * Copyright (c) 2014
 */

var _ = require('./utils');


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
module.exports = function () {
  var params = _.normalize(arguments);

  return _.applyWrap(function (args1, args2) {
    params.fn.apply(params.context, args1.concat(args2));
  });
};


