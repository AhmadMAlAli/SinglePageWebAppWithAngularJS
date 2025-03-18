(function()
{
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService)
    {
        var narrow = this;

        narrow.searchTerm = "";
        narrow.found = [];
        narrow.message = "";

        narrow.narrowItDown = function(){
            if(!narrow.searchTerm)
            {
                narrow.found = [];
                narrow.message = "Nothing found";
                return;
            }

            MenuSearchService.getMatchedMenuItems(narrow.searchTerm).then(function(foundItems){
                narrow.found = foundItems;
                if(narrow.found.length === 0)
                {
                    narrow.message = "Nothing found";
                }
                else
                {
                    narrow.message = "";
                }
            })
            .catch(function(error){
                console.log(error);
                narrow.message = "An error occurred."
            });
        };

        narrow.removeItem = function(index)
        {
            narrow.found.splice(index, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http)
    {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm)
        {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json",
            }).then(function (result){
                var foundItems = [];
                var categories = result.data;
                var menuItems;

                for (var categoryKey in categories)
                {
                    console.log(categoryKey);
                    if (categories.hasOwnProperty(categoryKey))
                    {
                        var category = categories[categoryKey];
                        menuItems = category.menu_items;
                
                        // You can now loop through the menuItems array if needed
                        for (var i = 0; i < menuItems.length; i++)
                        {
                            var description = menuItems[i].description.toLowerCase();
                            if(description.indexOf(searchTerm.toLowerCase()) !== -1)
                            {
                                foundItems.push(menuItems[i]);
                            }
                        }
                    }
                }

                return foundItems;
            });
        };
    }

    function foundItemsDirective()
    {
        var ddo = {
            template: '<div><ol><li ng-repeat="item in list.found"><b>{{ item.name }}</b>, {{ item.short_name }}, {{ item.description }} <button ng-click="list.onRemove({index: $index});">Don\'t want this one!</button></li></ol></div>',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: foundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function foundItemsDirectiveController()
    {
        var list = this;
    }
})();