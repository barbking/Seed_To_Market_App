myApp.controller('NavbarController', ['$http', '$location', function($http, $location) {
  var vm = this;

  vm.logout = function() {
    swal({
      title: "Log Out?",
      text: "Are you sure you want to log out?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Log Out",
      closeOnConfirm: false
    },
    function(){
      $http.get('/user/logout').then(function(response) {
        console.log('logged out');
        $location.path("/home");
      });
      swal({
        title: "Logged Out!",
        text: "See you soon!",
        type: "success",
        timer: 1500
      });
    }); // end sweetalert
  };//end of logout

}]); // end NavbarController
