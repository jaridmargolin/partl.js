/*!
 * test/right.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'right'
], function (assert, right) {


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

describe('right.js', function () {

  it('Should partially apply function using obj as context.', function () {
    var prtlApplied = right(obj, function (assertType, prop) {
      assert[assertType](obj[prop], this[prop]);
    })('test');

    prtlApplied('equal');
  });

  it('Should partially apply function using root as context.', function () {
    var prtlApplied = right(function (assertType, prop) {
      assert[assertType](root[prop], this[prop]);
    })('test');

    prtlApplied('equal');
  });

  it('Should partially apply method using obj as context.', function () {
    var prtlApplied = right(obj, 'method')('test');

    prtlApplied('equal');
  });

});


});