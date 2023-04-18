(function () {
    'use strict';
    
    angular.module('data')
    .controller('CategoriesController', CategoriesController);
    
    
    CategoriesController.$inject = ['MenuDataService'];
    function CategoriesController(MenuDataService) {
        console.log("start categories controller");

        var $ctrl = this;

        $ctrl.$onInit = function() {
            console.log("init categories controller");

            var categoriesPromise = MenuDataService.getAllCategories();
            categoriesPromise.then(function (responseArray) {
                console.log("copying response from service into categories controller");
                $ctrl.items = responseArray;
                console.log("ctrl.items = ", $ctrl.items);
            })
            .catch(function (error) {
                console.log("*** error retrieving data for categories controller");
            })    
        }
    }
    
    })();
    