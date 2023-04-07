(function () {
'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', glcControl); 

    glcControl.$inject = ['$scope'];
    function glcControl($scope) {

        $scope.checkDishes = function() {
            $scope.lunchMessage = analyseLunch($scope.lunchList) ;
        }
    }

    function analyseLunch(listOfDishes) {
        if ((listOfDishes!=null) && (listOfDishes.length > 0))
        {
            var arrayOfDishes = listOfDishes.split(',');
            //console.log(arrayOfDishes);

            var nbOfDishes = arrayOfDishes.length;
            if (nbOfDishes > 3)
                return "Too much!";
            else if (nbOfDishes > 0)
                return "Enjoy!";    
        }
        return "Please enter data first";
    }

})();


