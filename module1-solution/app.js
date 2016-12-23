/**
 * Created by Pepe on 12/23/2016.
 */
(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.dishes = "";
        $scope.message = "";

        $scope.checkTooMuch = function () {

            if ($scope.dishes == "") {
                $scope.message = "Please enter data first";
            } else {
                var dishesArray = $scope.dishes.split(",");
                var numDishes = dishesArray.length;
                for (var i = 0; i < numDishes; i++) {
                    if (dishesArray[i] === "") {
                        numDishes--;
                    }
                }
                //$scope.message = dishesArray + "-" + numDishes;
                if (numDishes > 0 && numDishes< 4) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }
            }
        };

    }

})();
