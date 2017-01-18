(function () {
    'use strict';

    angular.module('data')
        .component('items', {
            templateUrl: 'src/menuapp/templates/itemslist.template.html',
            bindings: {
                dishes: '<'
            }
        });

})();