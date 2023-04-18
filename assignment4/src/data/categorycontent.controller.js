(function () {
    'use strict';
    
    angular.module('data')
    .controller('CategoryContentController', CategoryContentController);
    
    CategoryContentController.$inject = ['$stateParams', 'MenuDataService'];
    function CategoryContentController($stateParams, MenuDataService) {
        console.log("start Category Content Controller with category shortname parameter: ", $stateParams.categoryShortName);
        
        var $ctrl = this;

        var menuItemsPromise = MenuDataService.getItemsForCategory($stateParams.categoryShortName);

        menuItemsPromise.then(function (responseArray) {
            console.log("copying response from service into category content controller: ", responseArray);
            $ctrl.items = responseArray.menu_items;
            console.log("ctrl.items = ", $ctrl.items);
        })
        .catch(function (error) {
            console.log("*** error retrieving data for categories controller");
        })    
    }
    
    })();
    