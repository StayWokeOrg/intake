/* eslint-disable */
// WIP
(function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory(root);
    }
}(this, function (exports) {

  exports.issues = {
    'cabinet_nominations': {
      description: 'Senate confirmations of cabinet members',
    },
    'aca': {
      description: 'Senate confirmations of cabinet members',
    },
  }


}));
