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
    signUpCtrl.favoriteItemValid = true;

    signUpCtrl.validateFavorite = function () {
      var favorite = signUpCtrl.user.favorite;
      if (favorite) {
        MenuService.getMenuItem(favorite)
          .then(function (response) {
            if (response) {
              signUpCtrl.signUpForm.favorite.$setValidity('noSuchItem', true);
              signUpCtrl.favoriteItemError = "";
              signUpCtrl.favoriteItemValid = true;
            } else {
              signUpCtrl.signUpForm.favorite.$setValidity('noSuchItem', false);
              signUpCtrl.favoriteItemError = "No such menu number exists.";
              signUpCtrl.favoriteItemValid = false;
            }
          })
          .catch(function (error) {
            console.error("Error checking menu item:", error);
            signUpCtrl.signUpForm.favorite.$setValidity('noSuchItem', false);
            signUpCtrl.favoriteItemError = "Error checking menu item.";
            signUpCtrl.favoriteItemValid = false;
          });
      } else {
        signUpCtrl.signUpForm.favorite.$setValidity('noSuchItem', true); // Clear error if field is empty
        signUpCtrl.favoriteItemError = "";
        signUpCtrl.favoriteItemValid = true;
      }
    };

    signUpCtrl.submitForm = function () {
      signUpCtrl.validateFavorite(); // Ensure validation runs before submit
      if (signUpCtrl.signUpForm.$valid && signUpCtrl.favoriteItemValid) {
        UserService.saveUserInfo(signUpCtrl.user);
        signUpCtrl.registrationComplete = true;
        signUpCtrl.signUpForm.$setPristine();
        signUpCtrl.signUpForm.$setUntouched();
        signUpCtrl.user = {}; // Clear the form
      }
    };
  }

})();