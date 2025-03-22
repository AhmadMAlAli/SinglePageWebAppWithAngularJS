// categories.component.js
(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            template: '<h3>Categories</h3>' +
                '<div ng-repeat="category in $ctrl.categories" class="category-item">' +
                '<a ui-sref="items({categoryShortName: category.short_name})">{{category.name}}</a>' +
                '</div>',
            bindings: {
                categories: '<'
            }
        });

})();