/*!
 * test/left.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'left'
], function (assert, left) {


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

describe('left.js', function () {

  it('Should partially apply function using obj as context.', function () {
    var prtlApplied = left(obj, function (prop, assertType) {
      assert[assertType](obj[prop], this[prop]);
    })('test');

    prtlApplied('equal');
  });

  it('Should partially apply function using root as context.', function () {
    var prtlApplied = left(function (prop, assertType) {
      assert[assertType](root[prop], this[prop]);
    })('test');

    prtlApplied('equal');
  });

  it('Should partially apply method using obj as context.', function () {
    var prtlApplied = left(obj, 'method')('test');

    prtlApplied('equal');
  });

});


});