(function () {
    "use strict";
  
    angular.module('restaurant.common')
    .service('UserService', UserService);
  
    function UserService() {
      var userInfo = null;
  
      this.saveUserInfo = function (user) {
        userInfo = user;
      };
  
      this.getUserInfo = function () {
        return userInfo;
      };
    }
  
  })();