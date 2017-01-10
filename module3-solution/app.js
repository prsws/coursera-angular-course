(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function NarrowItDownController (MenuSearchService) {
        var nidCtrl = this;

        nidCtrl.narrow = function (searchTerm) {
            nidCtrl.found = [];
            if (!searchTerm || searchTerm.length === 0 || !searchTerm.trim) {
                nidCtrl.errorMessage = "Nothing found";
            } else {
                var narrowPromise = MenuSearchService.getMatchedMenuItems(searchTerm);

                narrowPromise.then(function (response) {
                    if(response.length == 0) {
                        nidCtrl.found = [];
                        nidCtrl.errorMessage = "Nothing found";
                    } else {
                        nidCtrl.found = response;
                        nidCtrl.errorMessage = "";
                    }
                }).catch(function (error) {
                    console.log("ERROR!");
                });
            }
        };

        nidCtrl.removeItem = function (index) {
            nidCtrl.found.splice(index, 1);
        };
    }

    function MenuSearchService ($http, ApiBasePath) {
        var service = this;
        var foundItems = [];

        service.getMatchedMenuItems = function (searchTerm) {
            var matchedMenuItems = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                var menu = response.data.menu_items;
                service.matchMenu(menu, searchTerm);
                return foundItems;
            });

            return matchedMenuItems;
        };

        service.matchMenu = function (menu, searchTerm) {
            foundItems = [];

            for(var i = 0; i < menu.length; i++) {
                if(menu[i].description.indexOf(searchTerm) !== -1) {
                    foundItems.push(menu[i]);
                }
            }
            return foundItems;
        };
    }

    function FoundItems () {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundItemsDirective',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController () {
        var foundCtrl = this;
    }

})();