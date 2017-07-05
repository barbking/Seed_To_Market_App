myApp.controller('LoginController', ['$http', '$location', function($http, $location) {
  var vm = this;
    vm.user = {
      email: '',
      name: '',
      phone: '',
      password: '',
      newfarm: false
    }; // end vm.user

    vm.login = function() {
      if(vm.user.email === '' || vm.user.password === '')  {
        // vm.message = "Enter an e-mail and password!";
        swal({
          title: "Empty Fields!",
          text: "Please enter your email and password!",
          type: "error",
          confirmButtonText: "Ok"
        }); // end sweetalert
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.email) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/planner');
          } else {
            console.log('failure: ', response);
            // vm.message = "Wrong!!";
            swal({
              title: "Incorrect email or password!",
              type: "error",
              confirmButtonText: "Ok"
            }); // end sweetalert
          } // end if else
        }); // end POST '/'
      } // end if else
    }; // end login

    vm.register = function () {
      $location.path( '/register' );
    }; // end register

    vm.registerUser = function() {
      if(vm.user.email === '' || vm.user.user_name === '' || vm.user.phone_number === '' || vm.user.password === '' ){
        // vm.message = "No fields can be blank, try again.";
        swal({
          title: "Empty Fields!",
          text: "Please fill out all fields!",
          type: "error",
          confirmButtonText: "Ok"
        }); // end sweetalert
      } else {
        console.log('sending to server...', vm.user);
        $http.post('/register', vm.user).then(
        function(response) {
          console.log('success');
          $http.post('/', vm.user).then(function(response) {
            if(response.data.email) {
              // console.log('success: ', response.data);
              $location.path('/farm');
              swal({
                title: "Welcome!",
                text: "Thank you for registering with Seed to Market! Please take some time and create your farm information!",
                imageUrl: "/views/images/farm_welcome.png",
                confirmButtonText: "Ok"
              }); // end sweetalert
            } else {
              console.log('failure: ', response);
              // vm.message = "Wrong!!";
              swal({
                title: "An Error Occurred!",
                text: 'Please try again',
                type: "error",
                confirmButtonText: "Ok"
              }); // end sweetalert
            } // end if else
          }); // end POST '/'
        },
        function(response) {
          console.log('error');
          // vm.message = "Please try again.";
          swal({
            title: "An error occurred!",
            text: "Please try again",
            type: "error",
            confirmButtonText: "Ok"
          }); // end sweetalert
        }); // end POST '/register'
      } // end if else
    }; // end registerUser
}]); // end LoginController
