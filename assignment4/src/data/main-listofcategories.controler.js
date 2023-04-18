(function () {
    'use strict';
    
    angular.module('data')
    .controller('MainListOfCategoriesController', MainListOfCategoriesController);
    
    MainListOfCategoriesController.$inject = ['MenuDataService', 'items'];
    function MainListOfCategoriesController(MenuDataService, items) {
      var mainlist = this;
      mainlist.items = items;
    }
    
    })();