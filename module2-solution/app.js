(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyCtrlFunction)
.controller('AlreadyBoughtController', AlreadyBoughtCtrlFunction)
.service('ShoppingListCheckOffService', ShoppingListCheckOffSvcFunction);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyCtrlFunction(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.list = ShoppingListCheckOffService.itemsToBuy;
    toBuy.showMessage = false;

    toBuy.buyItem = function(itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
        if (toBuy.list.length <= 0) {
            toBuy.showMessage = true;
        }
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtCtrlFunction(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.list = ShoppingListCheckOffService.getBoughtItems();

    alreadyBought.showMessage = function() {
        var result = true;
        if ( ShoppingListCheckOffService.itemsBought.length > 0) {
            result = false;
        }
        return result;
    }
}


function ShoppingListCheckOffSvcFunction() {
    var service = this;

    service.itemsToBuy = [
        {
            name:"Cookies",
            quantity:10
        },
        {
            name:"Chips",
            quantity:"1 bag"
        },
        {
            name:"Milk",
            quantity:"1 gallon"
        },
        {
            name:"Pepto Bismol",
            quantity:1
        },
        {
            name:"Napkins",
            quantity:"1 pack"
        }
    ];
    service.itemsBought = [];

    service.getBoughtItems = function() {
        return service.itemsBought;
    }

    service.addItem = function(item){
        itemsBought.push(item);
    }

    service.buyItem = function(itemIndex) {
        var itemBought = service.itemsToBuy.splice(itemIndex,1);
        service.itemsBought.push(itemBought[0]);
    }

    service.getItemCount = function() {
        return itemsToBuy.length;
    }


}

})();
