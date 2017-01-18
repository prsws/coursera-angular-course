(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories list
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

   // items per category list
  .state('itemList', {
    url: '/items/{menuCategory}',
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: "ItemsController as itemsCtrl",
    resolve : {
        dishes: ['$stateParams','MenuDataService',
            function($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.menuCategory);
            }
        ]
    }
  });

}

})();
