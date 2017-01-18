(function () {
    'use strict';
    angular.module('data')
        .controller('ItemsController',ItemsController);

    ItemsController.$inject = ['dishes'];

    function ItemsController(dishes) {
        var itemsCtrl = this;
        itemsCtrl.dishes = dishes;
    }

})();
