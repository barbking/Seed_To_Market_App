myApp.controller('PlannerController', ['$http', '$location', '$uibModal', '$log', 'seedService', function($http, $location, $uibModal, $log, seedService ) {
  var vm = this;


  // create the list of seeds
  vm.inventory = seedService.inventory;
  seedService.getSeeds();


  vm.open = function ( size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-plant-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addPlantModalContent.html',
      controller: 'addPlantModalInstanceCtrl',
      controllerAs: 'apmic',
      size: size,
      appendTo: parentElem,
      resolve: {

      }
    }); // end modalInstance
  }; // end newActivity

}]);


myApp.controller( 'addPlantModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', function ( $uibModalInstance, $uibModal, $log, seedService ) {
  var vm = this;

  vm.inventory = seedService.inventory;


  console.log ('apmic controller inventory',vm.inventory);

  vm.addPlant = function(){
    var itemToSend = {
      crop: vm.crop,
      location: vm.location,
      date_planted: vm.date_planted,
      quantity: vm.quantity,
      area_sqft: vm.area_sqft,
      notes: vm.notes,
    };
    //FILESTACK IMG URL GOES HERE
    console.log(itemToSend);

    $uibModalInstance.close();
  };//end add Item


  vm.clearPlantInputs = function (){
    vm.crop = '';
    vm.location = '';
    vm.date_planted = '';
    vm.quantity = '';
    vm.area_sqft = '';
    vm.notes = '';


    $uibModalInstance.close();
  };


  vm.clearPlantInputs();
}]);
