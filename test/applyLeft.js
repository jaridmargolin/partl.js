/*!
 * test/applyLeft.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'applyLeft'
], function (assert, applyLeft) {


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var root = this;
root['test'] = 'val';

var obj = {
  'test': 'val',
  method: function (prop, assertType) {
    assert[assertType](obj[prop], this[prop]);
  }
};


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('applyLeft.js', function () {

  it('Should partially apply function using obj as context.', function () {
    var prtlApplied = applyLeft(obj, function (prop, assertType) {
      assert[assertType](obj[prop], this[prop]);
    })(['test']);

    prtlApplied('equal');
  });

  it('Should partially apply function using root as context.', function () {
    var prtlApplied = applyLeft(function (prop, assertType) {
      assert[assertType](root[prop], this[prop]);
    })(['test']);

    prtlApplied('equal');
  });

  it('Should partially apply method using obj as context.', function () {
    var prtlApplied = applyLeft(obj, 'method')(['test']);

    prtlApplied('equal');
  });

  it('Should return result.', function () {
    var prtlApplied = applyLeft(obj, function (prop) {
      return this[prop];
    })();

    assert.equal(prtlApplied('test'), obj['test']);
  });

});


});