(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyControllerImpl)
    .controller('AlreadyBoughtController', AlreadyBoughtControllerImpl)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffServiceImpl)
    
    console.log("starting");

    ToBuyControllerImpl.$inject = ['ShoppingListCheckOffService'];
    function ToBuyControllerImpl(ShoppingListCheckOffService) {

        var ctrl = this;

        ctrl.items = ShoppingListCheckOffService.getBuyList();

        ctrl.alreadyBoughtAction = function(itemIndex) {
            console.log("user wants to declare item already bought :", itemIndex);
            ShoppingListCheckOffService.declareItemBought(itemIndex);
        }

        ctrl.isEmpty = function () {
            return (ctrl.items.length == 0);
        }
    }

    AlreadyBoughtControllerImpl.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtControllerImpl(ShoppingListCheckOffService) {
        var ctrl = this;

        ctrl.items = ShoppingListCheckOffService.getAlreadyBoughtList();

        ctrl.isEmpty = function () {
            return (ctrl.items.length == 0);
        }
    }

    function ShoppingListCheckOffServiceImpl() {

        var service = this;

        console.log("build service");

        var toBuyList = [];
        var alreadyBoughtList = [];

        // default initialization
        toBuyList.push({ name: 'Blue Cookies', quantity : 10});
        toBuyList.push({ name: 'Green Cookies', quantity : 20});
        toBuyList.push({ name: 'Yellow Cookies', quantity : 30});
        toBuyList.push({ name: 'White Cookies', quantity : 40});
        toBuyList.push({ name: 'Brown Cookies', quantity : 50});
        toBuyList.push({ name: 'Black Cookies', quantity : 60});
        toBuyList.push({ name: 'Red Cookies', quantity : 70});

        service.getBuyList = function () {
            return toBuyList;
        }
        service.getAlreadyBoughtList = function () {
            return alreadyBoughtList;
        }
        service.declareItemBought = function (idx) {
            console.log("mark item as bought : ", idx);

            var item = toBuyList.splice(idx,1);
            alreadyBoughtList.push(item[0]);

            console.log(alreadyBoughtList);
        }
    }

})();