(function () {
    'use strict';
    
    console.log("code for categories component");

    angular.module('data')
    .component('categories', {
      templateUrl: 'src/data/templates/components/categories.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();
    