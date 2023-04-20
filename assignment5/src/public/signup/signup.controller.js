(function () {

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['CustomersService']
    function SignupController(CustomersService) {
      var formCtrl = this;

      formCtrl.submit = function () {
        console.log("submitted - favorite menu is: ", formCtrl.user.menunumber);

        formCtrl.invalidmenu = false;
        formCtrl.completed = false;

        var menuItemsPromise = CustomersService.getItemsForCategory(formCtrl.user.menunumber);
        menuItemsPromise.then(function(items) {
            console.log("response : ", items);
            if (items === undefined || items === null) {
                console.log("error : undefined or null response");
                formCtrl.invalidmenu = true;
            }
            else
            {
                CustomersService.saveCustomerInformation(formCtrl.user);
                formCtrl.completed = true;
            }
        })
        .catch(function(error) {
            console.log("error : ", error);
            formCtrl.invalidmenu = true;
        })

      };
    }

    })();
