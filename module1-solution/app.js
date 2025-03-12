(function()
{
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    //LunchCheckController.$inject = ['$scope', '$filter'];
    function LunchCheckController($scope)
    {
        $scope.lunchMenu = "";
        $scope.message = "";

        $scope.checkLunch = function(){
            if (!$scope.lunchMenu) 
            {
                $scope.sayMessage = "Enter sometimes first!";
                return;
            }

            var items = $scope.lunchMenu.split(',');
            var itemCount = items.length;
 
            if(itemCount <= 3)
            {
                $scope.sayMessage = "Enjoy!";
            }
            else
            {
                $scope.sayMessage = "Too much!"
            }
       };
    }
})();