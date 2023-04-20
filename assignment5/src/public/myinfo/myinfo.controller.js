(function () {

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['CustomersService', 'MenuService']
    function MyInfoController(CustomersService, MenuService) {
      var infoCtrl = this;
      infoCtrl.user = CustomersService.getCustomerInformation();

      if (infoCtrl.user === null) {
        return;
      }

      var itemRef = MenuService.getItemReferenceFromMenuNumber(infoCtrl.user.menunumber);
      if (itemRef === null)
      {
          formCtrl.invalidmenu = true;
          return;
      }

      var promiseMenuItem = MenuService.getMenuItem(itemRef.category, itemRef.index);
      promiseMenuItem.then(function(response) {
        console.log("menu item response: ", response);
        infoCtrl.category = itemRef.category;
        infoCtrl.menuItem = response;
      });
      
    }

    })();
