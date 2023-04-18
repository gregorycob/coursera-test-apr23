(function () {
    'use strict';
    
    angular.module('data')
    .controller('CategoryContentController', CategoryContentController);
    
    CategoryContentController.$inject = ['$stateParams'];
    function CategoryContentController($stateParams) {
        console.log("start Category Content Controller with category shortname parameter: ", $stateParams.categoryShortName);
    //   var itemDetail = this;
    //   var item = items[$stateParams.itemId];
    //   itemDetail.name = item.name;
    //   itemDetail.quantity = item.quantity;
    //   itemDetail.description = item.description;
    }
    
    })();
    