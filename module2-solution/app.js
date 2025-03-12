(function()
{
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService)
    {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.boughtItem = function(itemIndex){
            ShoppingListCheckOffService.boughtItem(itemIndex);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService)
    {
        var AlreadyBought = this;

        AlreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
    };

    function ShoppingListCheckOffService()
    {
        var service = this;

        var toBuyItems = [
            {name: "Cookies", quantity: 10},
            {name: "Bread", quantity: 5},
            {name: "Milk", quantity: 1},
            {name: "Chocolate", quantity: 4},
            {name: "Bananas", quantity: 15},
            {name: "Apples", quantity: 3},
            {name: "Oranges", quantity: 7},
        ];

        var boughtItems = [];

        service.getToBuyItems = function(){
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.boughtItem = function(itemIndex)
        {
            var item = toBuyItems[itemIndex];
            boughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };
    };
})();