myApp.controller('FarmController', ['$http', '$filter', '$location', function($http, $filter, $location) {
  var vm = this;

    vm.farm = {
      id: 1,
      name: 'Family Farm',
      address: '1111 Farm Street',
      city: 'St. Paul',
      state: 'Mn',
      zip:  55104,
      owner1: 'owner 1',
      owner2: 'owner 2',
      phone1: '555-555-5555',
      phone2: '555-555-5555',
      email1: 'test@gmail.com',
      email2: 'test@gmail.com',
      certifier: 'xxxx',
      certifierId: 'xxxx',
      certifierEmail: 'certifier@gmail.com'
    };

    vm.loadGroups = function() {
      console.log('in loadGroups');
      return vm.groups.length ? null : $http.get('/groups').success(function(data) {
        vm.groups = data;
      });
    };

    vm.showGroup = function() {
      console.log('in showGroup');
      if(vm.groups.length) {
        var selected = $filter('filter')(vm.groups, {id: vm.farm.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return vm.farm.groupName;
      }
    };

    vm.savefarm = function() {
      console.log('in savefarm');
      // vm.farm already updated!
      return $http.post('/savefarm', vm.farm).error(function(err) {
        if(err.field && err.msg) {
          // err like {field: "name", msg: "Server-side error for this farmname!"}
          vm.editableForm.$setError(err.field, err.msg);
        } else {
          // unknown error
          vm.editableForm.$setError('name', 'Unknown error!');
        }
      });
    };

}]);//end FarmController
