(function(){
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider

        //Home Page
        .state('home', {
            url: '/',
            templateUrl: 'src/home.template.html'
        })

        //Categories page
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/categories/templates/categories1.template.html',
            controller: 'CategoriesController as catCtrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService){
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        //Items page
        .state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'src/items/template/items1.template.html',
            controller: 'ItemsController as itemCtrl',
            resolve: {
                items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }],
                categoryShortName: ['$stateParams', function($stateParams){
                    return $stateParams.categoryShortName;
                }]
            }
        });
    }
})();