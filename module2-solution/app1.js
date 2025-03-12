// app.js
(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.boughtItem = function(itemIndex) {
            ShoppingListCheckOffService.boughtItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            { name: "cookies", quantity: 10 },
            { name: "chips", quantity: 5 },
            { name: "milk", quantity: 2 },
            { name: "bread", quantity: 1 },
            { name: "apples", quantity: 6 }
        ];
        var boughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.boughtItem = function(itemIndex) {
            var item = toBuyItems[itemIndex];
            boughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        };
    }

})();