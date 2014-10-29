/*!
 * test/applyRight.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'applyRight'
], function (assert, applyRight) {


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var root = this;
root['test'] = 'val';

var obj = {
  'test': 'val',
  method: function (assertType, prop) {
    assert[assertType](obj[prop], this[prop]);
  }
};


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('applyRight.js', function () {

  it('Should partially apply function using obj as context.', function () {
    var prtlApplied = applyRight(obj, function (assertType, prop) {
      assert[assertType](obj[prop], this[prop]);
    })(['test']);

    prtlApplied('equal');
  });

  it('Should partially apply function using root as context.', function () {
    var prtlApplied = applyRight(function (assertType, prop) {
      assert[assertType](root[prop], this[prop]);
    })(['test']);

    prtlApplied('equal');
  });

  it('Should partially apply method using obj as context.', function () {
    var prtlApplied = applyRight(obj, 'method')(['test']);

    prtlApplied('equal');
  });

  it('Should return result.', function () {
    var prtlApplied = applyRight(obj, function (prop) {
      return this[prop];
    })();

    assert.equal(prtlApplied('test'), obj['test']);
  });

});


});