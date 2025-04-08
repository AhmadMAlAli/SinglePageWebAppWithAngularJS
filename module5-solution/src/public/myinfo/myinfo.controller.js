(function () {
    "use strict";
  
    angular.module('public')
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
            console.log('myInfoCtrl:', myInfoCtrl);
            console.log('myInfoCtrl.userInfo.favorite', myInfoCtrl.userInfo.favorite);
            console.log('myInfoCtrl.favoriteMenuItem:', myInfoCtrl.favoriteMenuItem);
          })
          .catch(function (error) {
            console.error("Error fetching favorite menu item:", error);
          });
      }
    }
  
  })();