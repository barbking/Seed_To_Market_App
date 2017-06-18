myApp.controller('LoginController', ['$http', '$location', function($http, $location) {
  var vm = this;
    vm.user = {
      email: '',
      name: '',
      phone: '',
      password: '',
      newfarm: false
    };
    vm.message = '';

    vm.login = function() {
      if(vm.user.email === '' || vm.user.password === '')  {
        vm.message = "Enter an e-mail and password!";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.email) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/user');
          } else {
            console.log('failure: ', response);
            vm.message = "Wrong!!";
          }
        });
      }
    };

    vm.registerUser = function() {
      if(vm.user.email === '' || vm.user.name === '' || vm.user.phone === '' || vm.user.password === '' ){
        vm.message = "No fields can be blank, try again.";
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          vm.message = "Please try again.";
        });
      }
    };
}]);
