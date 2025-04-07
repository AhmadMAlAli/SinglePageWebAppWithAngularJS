(function () {
    "use strict";
  
    angular.module('restaurant.public')
    .controller('MyInfoController', MyInfoController);
  
    MyInfoController.$inject = ['UserService', 'MenuService'];
    function MyInfoController(UserService, MenuService) {
      var myInfoCtrl = this;
      myInfoCtrl.userInfo = UserService.getUserInfo();
      myInfoCtrl.favoriteMenuItem = null;
  
      if (myInfoCtrl.userInfo && myInfoCtrl.userInfo.favorite) {
        MenuService.getMenuItem(myInfoCtrl.userInfo.favorite)
          .then(function (response) {
            myInfoCtrl.favoriteMenuItem = response;
          })
          .catch(function (error) {
            console.error("Error fetching favorite menu item:", error);
          });
      }
    }
  
  })();