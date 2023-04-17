(function () {
    'use strict';
    
    console.log("code for data module");
    
    angular.module('data', []);
    
    angular.module('data')
    .config(function () {
      console.log("data module config fired.");
    }).
    run(function () {
      console.log("data module run fired.");
    });
    
})();
    