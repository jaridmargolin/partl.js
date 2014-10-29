/*!
 * test/_amd.js
 * 
 * Copyright (c) 2014
 */

define([
  'proclaim',
  'partl/partl'
], function (assert, partl) {


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

describe('amd - partl.js', function () {

  it('Should proxy to left.', function () {
    var prtlApplied = partl(obj, 'method')('test');
    prtlApplied('equal');
  });

});


});