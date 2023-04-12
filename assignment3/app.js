(function () {
    'use strict';

    console.log("start app");

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiURLofRestaurant', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        console.log("start UI controller");

        this.narrowDown = function() {
            console.log("clicked on Narrow Down button, with search term: ", this.searchTerm);
            var foo = MenuSearchService.getMatchedMenuItems(this.searchTerm);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiURLofRestaurant'];
    function MenuSearchService($http, ApiURLofRestaurant) {
        console.log("start menu search service");
    
        this.getMatchedMenuItems = function(searchTerm) {
            console.log("requesting menu from restaurant website");
            var httpRequestPromise = $http(
                {
                    method: "GET",
                    url: ApiURLofRestaurant
                }
            );

            var x = httpRequestPromise.then(function(httpResult) {
                var menuObj = httpResult.data;
                console.log("Menu is : ", menuObj);

                var menuItems = [];
                for(var category in menuObj)
                {
                    //console.log(category)
                    menuItems = menuItems.concat(menuObj[category].menu_items);
                    //console.log("total number of menu items is now ", menuItems.length);
                }
                console.log("total number of menu items is ", menuItems.length);

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
            });
            return x;
        }
    }

})();

