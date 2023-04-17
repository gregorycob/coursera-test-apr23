(function () {
    'use strict';

    console.log("start app");

    angular.module('NarrowItDownApp', ['data'])
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', FoundItems)

    function FoundItems() {
        var ddo = {
            templateUrl: '/src/foundItems.html',
            scope: {
                items: '<found',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var dirCtrl = this;

        dirCtrl.nothingFound = function() {                
            console.log("directive controller method called");
            //console.log(dirCtrl);

            if (dirCtrl.items === undefined)
                return true;

            return (dirCtrl.items.length == 0);
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        console.log("start UI controller");

        ctrl.narrowDown = function() {
            console.log("clicked on Narrow Down button, with search term: ", ctrl.searchTerm);

            var dummy = MenuSearchService.getAllCategories();
            var dummy2 = MenuSearchService.getItemsForCategory("DK");
            var dummy3 = MenuSearchService.getItemsForCategory("V");

            var menuItemsPromise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
            menuItemsPromise.then(function (responseArray) {
                console.log("copying response from service into UI controller");
                ctrl.menuItems = responseArray;
                //console.log(responseArray);
            })
            .catch(function (error) {
                console.log("*** error processing menu items by controller");
            })
        }

        ctrl.removeItem = function(index) {
            console.log("controller receives request to remove item ", index);
            var dumpIt = ctrl.menuItems.splice(index, 1);
        }
    }

})();

