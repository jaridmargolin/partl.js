/*!
 * test/partl.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'partl',
  'left',
  'right',
  'applyLeft',
  'applyRight'
], function (assert, partl, left, right, applyLeft, applyRight) {


/* -----------------------------------------------------------------------------
 * reusable
 * ---------------------------------------------------------------------------*/

var obj = {
  'test': 'val',
  method: function (prop, assertType) {
    assert[assertType](obj[prop], this[prop]);
  }
};


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('partl.js', function () {

  it('Should proxy to left.', function () {
    var prtlApplied = partl(obj, 'method')('test');
    prtlApplied('equal');
  });

  it('Should expose all methods.', function () {
    assert.equal(partl.left, left);
    assert.equal(partl.right, right);
    assert.equal(partl.applyLeft, applyLeft);
    assert.equal(partl.applyRight, applyRight);
  });

});


});