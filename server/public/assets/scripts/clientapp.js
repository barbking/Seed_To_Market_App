var myApp = angular.module('myApp', ['ngRoute']);
/// Routes ///

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController as lc"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController as lc"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController as uc"
    })
    .when('/farm', {
      templateUrl: '/views/farm.html',
      controller: "FarmController as fc"
    })
    .when('/inventory', {
      templateUrl: '/views/inventory.html',
      controller: "InventoryController as ic"
    })
    .when('/planner', {
      templateUrl: '/views/inventory.html',
      controller: "PlannerController as pc"
    })
    .when('/reports', {
      templateUrl: '/views/reports.html',
      controller: "ReportsController as rc"
    })
    .when('/suppliers', {
      templateUrl: '/views/reports.html',
      controller: "SuppliersController as sc"
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
