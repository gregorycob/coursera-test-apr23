(function () {

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['CustomersService', 'MenuService']
    function SignupController(CustomersService, MenuService) {
      var formCtrl = this;

      formCtrl.submit = function () {
        console.log("submitted - favorite menu is: ", formCtrl.user.menunumber);

        formCtrl.invalidmenu = false;
        formCtrl.completed = false;

        var itemRef = MenuService.getItemReferenceFromMenuNumber(formCtrl.user.menunumber);
        if (itemRef === null)
        {
            formCtrl.invalidmenu = true;
            return;
        }

        console.log("category: ", itemRef.category);
        formCtrl.user.menunumber = MenuService.getMenuNumberFromReference(itemRef);
        console.log("category: ", itemRef.category);
        
        var menuItemPromise = MenuService.getMenuItem(itemRef.category, itemRef.index);
        menuItemPromise.then(function(response) {
            console.log("response : ", response);
            if (response === undefined || response === null) {
                console.log("error : undefined or null response");
                formCtrl.invalidmenu = true;
                return;
            }

            CustomersService.saveCustomerInformation(formCtrl.user);
            formCtrl.completed = true;

        })
        .catch(function(error) {
            console.log("error : ", error);
            formCtrl.invalidmenu = true;
        })

      };
    }

    })();
