(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
    var service = this;

    // list of categories
    //var categories = [];
    // List of items per category
    var items = [];

    service.getAllCategories = function () {
        var allCategories = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        }).then(function (response) {
            var categories = response.data;
            return categories;
        });
        return allCategories;
    };

    service.getItemsForCategory(categoryShortName) = function (categoryShortName) {
        var itemsForCategory = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then(function (response) {
            var menu = response.data.menu_items;
            return menu;
        });

        return itemsForCategory;
    };
}

})();
