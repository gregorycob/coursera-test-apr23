(function () {
'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', glcControl); 

    var numberArray = [ 5, 4, 3, 1, 7, 8, 4, 3];
    console.log(numberArray);

    function plusGrandQue(value, reference) {
        return (value > reference);
    }

    var filteredArray = numberArray.filter(plusGrandQue, 3);
    console.log(filteredArray);

    var parent = {
        speed: 1,
        method: "toto",
       getMethod : function() {
        return this.method;
       },
       walk : function () {
            console.log("parent walking at speed ", this.speed);
            console.log("with method", this.getMethod());
        } 
    };

    var child = Object.create(parent);
    child.speed = 2;
    child.getMethod = function() {
        return "child method: " + this.method;
    };
    child.walk(); // il y a bien la notion de methode virtuelle puisque l'on appelle "walk" sur parent, et finallement le "getMethod" du child est appelé

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


