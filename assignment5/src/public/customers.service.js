(function () {
    'use strict';

    console.log("code for CustomersService service");

    angular.module('public')
    .service('CustomersService', CustomersService)

    function CustomersService() {
        var service = this;
        console.log("start Customers service");

        var customerInfoEntryInMockDatabase = null;
        service.saveCustomerInformation = function(customerinfo) {
            console.log("saved customer information: ", customerinfo);
            customerInfoEntryInMockDatabase = JSON.parse(JSON.stringify(customerinfo)); // force a CLONE and not copy of ref...
        }
        service.getCustomerInformation = function() {
            console.log("reading customer information: ", customerInfoEntryInMockDatabase);
            return customerInfoEntryInMockDatabase;
        }

    }

})();

