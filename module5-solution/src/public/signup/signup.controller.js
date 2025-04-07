(function () {
  "use strict";

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$scope', 'MenuService', 'UserService']; // Inject $scope
  function SignUpController($scope, MenuService, UserService) { // Add $scope parameter
    var signUpCtrl = this;
    signUpCtrl.user = {};
    signUpCtrl.registrationComplete = false;
    signUpCtrl.favoriteItemError = "";
    signUpCtrl.favoriteItemValid = true;

    console.log('$scope.signUpForm at controller load:', $scope.signUpForm); // Check at load

    signUpCtrl.validateFavorite = function () {
      var favorite = signUpCtrl.user.favorite;
      if (favorite) {
        MenuService.getMenuItem(favorite)
          .then(function (response) {
            if (response) {
              if ($scope.signUpForm && $scope.signUpForm.favorite) { // Check if $scope.signUpForm exists
                $scope.signUpForm.favorite.$setValidity('noSuchItem', true);
              }
              signUpCtrl.favoriteItemError = "";
              signUpCtrl.favoriteItemValid = true;
            } else {
              if ($scope.signUpForm && $scope.signUpForm.favorite) { // Check if $scope.signUpForm exists
                $scope.signUpForm.favorite.$setValidity('noSuchItem', false);
              }
              signUpCtrl.favoriteItemError = "No such menu number exists.";
              signUpCtrl.favoriteItemValid = false;
            }
          })
          .catch(function (error) {
            console.error("Error checking menu item:", error);
            if ($scope.signUpForm && $scope.signUpForm.favorite) { // Check if $scope.signUpForm exists
              $scope.signUpForm.favorite.$setValidity('noSuchItem', false);
            }
            signUpCtrl.favoriteItemError = "Error checking menu item.";
            signUpCtrl.favoriteItemValid = false;
          });
      } else {
        if ($scope.signUpForm && $scope.signUpForm.favorite) { // Check if $scope.signUpForm exists
          $scope.signUpForm.favorite.$setValidity('noSuchItem', true);
        }
        signUpCtrl.favoriteItemError = "";
        signUpCtrl.favoriteItemValid = true;
      }
    };

    signUpCtrl.submitForm = function () {
      console.log('$scope.signUpForm at submit:', $scope.signUpForm); // Check at submit
      signUpCtrl.validateFavorite();
      if ($scope.signUpForm && $scope.signUpForm.$valid && signUpCtrl.favoriteItemValid) { // Use $scope.signUpForm
        UserService.saveUserInfo(signUpCtrl.user);
        signUpCtrl.registrationComplete = true;
        $scope.signUpForm.$setPristine(); // Use $scope.signUpForm
        $scope.signUpForm.$setUntouched(); // Use $scope.signUpForm
        signUpCtrl.user = {}; // Clear the form
      }
    };
  }

})();