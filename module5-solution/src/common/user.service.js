(function () {
    "use strict";
  
    angular.module('common')
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