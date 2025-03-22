(function(){
    'use strict';
    
    angular.module('MenuApp')
    .component('categories', {
        templateUrl:'src/categories/templates/categories.template.html',
        bindings: {
            categories: '<'
        }
    });
})();