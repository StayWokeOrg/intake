/* eslint-disable */

// this file is shared with client and server
// hence, the UMD wrapper
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

  exports.issues = [
    {
      id: 'cabinet_nominations',
      description: 'Senate confirmations of cabinet members',
    },
    {
      id: 'aca',
      description: 'The Affordable Care Act (Obamacare)',
    },
    {
      id: 'policing',
      description: 'Policing',
    },
    {
      id: 'immigration',
      description: 'Immigration',
    },
  ]

}));
