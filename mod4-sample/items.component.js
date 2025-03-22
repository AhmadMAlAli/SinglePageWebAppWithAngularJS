// items.component.js
(function () {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            template: '<h3>Items for {{ $ctrl.categoryShortName }}</h3>' +
                '<div ng-repeat="item in $ctrl.items" class="item-item">' +
                '<h4>{{item.name}}</h4>' +
                '<p>{{item.description}}</p>' +
                '</div>',
            bindings: {
                items: '<',
                categoryShortName: '<'
            }
        });

})();