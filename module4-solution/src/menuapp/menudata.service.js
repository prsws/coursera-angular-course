(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function () {
        var allCategories = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        }).then(function (response) {
            return response.data;
        });
        return allCategories;
    };

    service.getItemsForCategory = function (categoryShortName) {
        var itemsForCategory = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
        }).then(function (response) {
            return response.data.menu_items;
        });
        return itemsForCategory;
    };
}
})();
