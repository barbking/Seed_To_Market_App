myApp.controller('NavbarController', ['$http', '$location', function($http, $location) {
  var vm = this;

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logout

}]);
