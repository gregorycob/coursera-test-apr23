(function () {
    'use strict';
    
    console.log("code for routes");
    
    angular.module('data')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
        console.log("start RoutesConfig");

      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/data/templates/views/home.template.html'
      })
    
      // List of Categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/data/templates/views/main-listofcategories.template.html',
        controller: 'MainListOfCategoriesController as mainList',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
    
      .state('categories.category', {
        url: '/category/{categoryShortName}/items',
        templateUrl: 'src/data/templates/views/category-listing.template.html',
        controller: "CategoryContentController as catListing"
      });
    
    }
    
    })();
    