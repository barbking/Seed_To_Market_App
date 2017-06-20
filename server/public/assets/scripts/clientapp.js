var myApp = angular.module('myApp', ['ngRoute','xeditable','ui.bootstrap']);
/// Routes ///

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

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
      templateUrl: '/views/planner.html',
      controller: "PlannerController as pc"
    })
    .when('/reports', {
      templateUrl: '/views/reports.html',
      controller: "ReportsController as rc"
    })
    .when('/suppliers', {
      templateUrl: '/views/suppliers.html',
      controller: "SuppliersController as sc"
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
