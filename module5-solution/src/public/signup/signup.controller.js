(function () {
    "use strict";
  
    angular.module('restaurant.public')
    .controller('SignUpController', SignUpController);
  
    SignUpController.$inject = ['MenuService', 'UserService'];
    function SignUpController(MenuService, UserService) {
      var signUpCtrl = this;
      signUpCtrl.user = {};
      signUpCtrl.registrationComplete = false;
      signUpCtrl.favoriteItemError = "";
  
      signUpCtrl.submitForm = function () {
        signUpCtrl.favoriteItemError = ""; // Reset error message
        MenuService.getMenuItem(signUpCtrl.user.favorite)
          .then(function (response) {
            if (response) {
              UserService.saveUserInfo(signUpCtrl.user);
              signUpCtrl.registrationComplete = true;
              signUpCtrl.signUpForm.$setPristine();
              signUpCtrl.signUpForm.$setUntouched();
              signUpCtrl.user = {}; // Clear the form
            } else {
              signUpCtrl.favoriteItemError = "No such menu number exists.";
            }
          })
          .catch(function (error) {
            console.error("Error checking menu item:", error);
            signUpCtrl.favoriteItemError = "Error checking menu item.";
          });
      };
    }
  
  })();