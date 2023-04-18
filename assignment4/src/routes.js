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
        templateUrl: 'src/data/templates/home.template.html'
      })
    
      // List of Categories page
      .state('listOfCategories', {
        url: '/list-of-categories',
        templateUrl: 'src/data/templates/main-listofcategories.template.html',
        controller: 'MainListOfCategoriesController as mainList',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
    
      .state('listOfCategories.category', {
        url: '/category/{categoryShortName}',
        templateUrl: 'src/data/templates/category-listing.template.html',
        controller: "CategoryContentController as catListing"
      });
    
    }
    
    })();
    