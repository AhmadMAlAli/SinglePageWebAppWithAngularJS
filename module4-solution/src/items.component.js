(function(){
    'use strict';
    
    angular.module('MenuApp')
    .component('items', {
        templateUrl:'src/items/templates/items.template.html',
        bindings: {
            items: '<',
            categoryShortName: '<'
        }
    });
})();