(function () {

    angular.module('public')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['CustomersService']
    function MyInfoController(CustomersService) {
      var infoCtrl = this;
      infoCtrl.user = CustomersService.getCustomerInformation();
    }

    })();
