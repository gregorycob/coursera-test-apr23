(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function(category, index) {
    var urltarget = ApiPath + '/menu_items/' + category + '/menu_items/' + index + '.json';
    console.log("url target: ", urltarget);
    return $http.get(urltarget).then(function (response) {
      return response.data;
    });
  }

  service.getItemReferenceFromMenuNumber = function(menunumber) {
    var l = menunumber.toUpperCase().match(/[A-Z]+|[0-9]+/g);
    console.log(menunumber, " => ", l)

    if (l.length > 2) {
        console.log("Too many elements trying to parse menu number");
        return null;
    }
    if (l.length < 2) {
        console.log("Need 2 elements when parsing menu number");
        return null;
    }

    var response = {
        category: l[0],
        index: Number(l[1])
    };

    if (typeof response.index !== 'number' || !isFinite(response.index) || !Number.isInteger(response.index))
    {
        console.log("second part is not a valid index number: ", response.index);
        return null;
    }

    response.index = response.index - 1; // yes, DK1 is the index 0 on the array
    if (response.index < 0)
    {
        console.log("second part must be positive", response.index);
        return null;
    }

    return response;
  }

  service.getMenuNumberFromReference = function(itemRef) {
      var itemNumberInMenu = itemRef.index + 1; // yes, DK1 is the index 0 on the array
      return '' + itemRef.category + '' + itemNumberInMenu;
  }

}



})();
