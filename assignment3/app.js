(function () {
    'use strict';

    console.log("start app");

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiURLofRestaurant', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        console.log("start UI controller");

        ctrl.narrowDown = function() {
            console.log("clicked on Narrow Down button, with search term: ", ctrl.searchTerm);
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
    }

    MenuSearchService.$inject = ['$http', 'ApiURLofRestaurant'];
    function MenuSearchService($http, ApiURLofRestaurant) {
        var service = this;
        console.log("start menu search service");

        service.getMatchedMenuItems = function(searchTerm) {
            console.log("requesting menu from restaurant website");
            var httpRequestPromise = $http(
                {
                    method: "GET",
                    url: ApiURLofRestaurant
                }
            );

            var listOfItemsPromise = httpRequestPromise.then(function(httpResult) {
                var menuObj = httpResult.data;
                //console.log("Menu is : ", menuObj);

                var menuItems = [];
                for(var category in menuObj)
                {
                    //console.log(category)
                    menuItems = menuItems.concat(menuObj[category].menu_items);
                    //console.log("total number of menu items is now ", menuItems.length);
                }
                console.log("total number of menu items is ", menuItems.length);

                if (searchTerm === undefined || searchTerm.length === 0) {
                    console.log("search term undefined or empty, returning full list");
                    return menuItems;
                }

                var lowercaseSearchTerm = searchTerm.toLowerCase();
                console.log("searching for <", lowercaseSearchTerm, ">");
                var filteredList = menuItems.filter(x => {
                    //console.log("x.description is ", x.description);
                    //console.log("found ? ", x.description.toLowerCase().indexOf(lowercaseSearchTerm));
                    var found = x.description.toLowerCase().indexOf(lowercaseSearchTerm) > -1;
                    return found; 
                }
                );
                console.log("total number of menu items containing the search term is ", filteredList.length);
                return filteredList;
            });

            return listOfItemsPromise;
        }
    }

})();
