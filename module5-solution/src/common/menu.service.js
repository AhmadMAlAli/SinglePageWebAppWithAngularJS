(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', '$q', 'ApiPath'];
function MenuService($http, $q, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    var deferred = $q.defer();
    var categoryShortName = shortName.slice(0, 1);
    var menuItemNumber = shortName.slice(1);
    var url = ApiPath + '/menu_items/' + categoryShortName + '/menu_items/' + menuItemNumber + '.json';

    $http.get(url)
      .then(function (response) {
        deferred.resolve(response.data);
      })
      .catch(function (error) {
        deferred.resolve(null); // Resolve with null if item not found or error
      });

    return deferred.promise;
  };

}



})();
