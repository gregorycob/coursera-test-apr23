(function () {
    'use strict';
    
    console.log("code for CategoryContent component");

    angular.module('data')
    .component('categorycontent', {
      templateUrl: 'src/data/templates/components/category-items.template.html',
      bindings: {
        items: '<'
      }
    });
    
    })();
    