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

        var itemRef = CustomersService.getItemReferenceFromMenuNumber(formCtrl.user.menunumber);
        if (itemRef === null)
        {
            formCtrl.invalidmenu = true;
            return;
        }

        console.log("category: ", itemRef.category);
        formCtrl.user.menunumber = CustomersService.getMenuNumberFromReference(itemRef);
        console.log("category: ", itemRef.category);
        
        var menuCategoryPromise = CustomersService.getItemsForCategory(itemRef.category);
        menuCategoryPromise.then(function(response) {
            console.log("response : ", response);
            if (response === undefined || response === null) {
                console.log("error : undefined or null response");
                formCtrl.invalidmenu = true;
                return;
            }

            if (response.menu_items.length <= itemRef.index) {
                console.log("in category ", itemRef.category, " there is no item ", itemRef.index);
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
