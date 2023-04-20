(function () {
    'use strict';

    console.log("code for CustomersService service");

    angular.module('public')
    .service('CustomersService', CustomersService)
    .constant('ApiURLofAllCategories', "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
    .constant('ApiURLofRestaurant', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
    .constant('ApiBaseURLforCategoryItems', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/")


    CustomersService.$inject = ['$http', 'ApiURLofRestaurant', 'ApiURLofAllCategories', 'ApiBaseURLforCategoryItems'];
    function CustomersService($http, ApiURLofRestaurant, ApiURLofAllCategories, ApiBaseURLforCategoryItems) {
        var service = this;
        console.log("start menu search service");

        service.getAllCategories = function() {
            console.log("get all categories");

            var httpRequestPromise = $http(
                {
                    method: "GET",
                    url: ApiURLofAllCategories
                }
            );

            var listOfCategoriesPromise = httpRequestPromise.then(function(httpResult) {
                console.log("cats : ", httpResult);

                return httpResult.data;
            })

            return listOfCategoriesPromise;
        }

        service.getItemsForCategory = function(categoryShortname) {
            console.log("get item for category: ", categoryShortname);

            var targetUrl = (ApiBaseURLforCategoryItems + categoryShortname + ".json");
            console.log("target url will be: ", targetUrl);

            var httpRequestPromise = $http(
                {
                    method: "GET",
                    url: targetUrl
                }
            );

            var listOfCategoriesPromise = httpRequestPromise.then(function(httpResult) {
                console.log("items: ", httpResult);

                return httpResult.data;
            })
            return listOfCategoriesPromise;
        }

        var customerInfoEntryInMockDatabase = null;
        service.saveCustomerInformation = function(customerinfo) {
            console.log("saved customer information: ", customerinfo);
            customerInfoEntryInMockDatabase = customerinfo;
        }

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
                    console.log("search term undefined or empty");
                    return [];
                    //return menuItems;
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

