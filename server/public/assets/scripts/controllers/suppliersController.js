myApp.controller('SuppliersController', ['$http','$location','$uibModal','$log', function ($http, $location,$uibModal,$log) {
  var vm = this;


  vm.open = function ( size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-supplier-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addSupplierModalContent.html',
      controller: 'addSupplierModalInstanceCtrl',
      controllerAs: 'asmc',
      size: size,
      appendTo: parentElem,
      resolve: {
      }
    }); // end modalInstance
  }; // end newActivity
}]);


myApp.controller( 'addSupplierModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', function ( $uibModalInstance, $uibModal, $log) {
  var vm = this;

  vm.addNewSupplier = function(){
    var itemToSend = {
      name: vm.name,
      website: vm.website,
      phone_number: vm.phone_number,
      address: vm.address,
      city: vm.city,
      state: vm.state,
      zip: vm.zip,
      description: vm.description
    };

    console.log(itemToSend);
    seedService.addSeed(itemToSend);

    $uibModalInstance.close();
  };//end add Item


  vm.clearSupplierInputs = function (){
    vm.name = '';
    vm.website = '';
    vm.phone_number = '';
    vm.address = '';
    vm.city = '';
    vm.state = '';
    vm.zip = '';
    vm.description = '';

    $uibModalInstance.close();
  };

  vm.clearSupplierInputs();
}]);
