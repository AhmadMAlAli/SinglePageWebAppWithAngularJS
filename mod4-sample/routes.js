// routes.js
(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<h3>Welcome to our Restaurant</h3><a ui-sref="categories">Categories</a>'
            })
            .state('categories', {
                url: '/categories',
                template: '<categories categories="$resolve.categories"></categories>',
                controller: 'CategoriesController as catCtrl',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{categoryShortName}',
                template: '<items items="$resolve.items" category-short-name="$resolve.categoryShortName"></items>',
                controller: 'ItemsController as itemCtrl',
                resolve: {
                    items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }],
                    categoryShortName: ['$stateParams', function($stateParams) {
                        return $stateParams.categoryShortName;
                    }]
                }
            });
    }

    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categories'];
    function CategoriesController(categories) {
        var catCtrl = this;
        catCtrl.categories = categories;
    }

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['items'];
    function ItemsController(items) {
        var itemCtrl = this;
        itemCtrl.items = items;
    }

})();