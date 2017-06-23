myApp.controller('PlannerController', ['$http', '$location', '$uibModal', '$log', 'seedService', 'plantService', function($http, $location, $uibModal, $log, seedService, plantService ) {
  var vm = this;

  vm.sortType     = 'crop'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSeeds   = '';     // set the default search/filter term

  // create the list of seeds
  vm.inventory = seedService.inventory;
  seedService.getSeeds();

  //show/hide inventory table
  vm.isVisible = false;
  vm.showHide = function () {
   //If DIV is visible it will be hidden and vice versa.
   vm.isVisible = vm.isVisible ? false : true;
 };


  vm.open = function ( seed_id, size, parentSelector ) {
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
        seed_id: function() {
          return seed_id;
        }
      }
    }); // end modalInstance
  }; // end newActivity

}]);


myApp.controller( 'addPlantModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', 'plantService', 'seed_id',function ( $uibModalInstance, $uibModal, $log, seedService, plantService, seed_id ) {
  var vm = this;

  vm.inventory = seedService.inventory;

  console.log( 'seed_id in modal:', seed_id );
  console.log ('apmic controller inventory',vm.inventory);

  vm.addPlant = function(){
    var itemToSend = {
      seed_id: seed_id,
      location: vm.location,
      date_planted: vm.date_planted,
      quantity: vm.quantity,
      area_sqft: vm.area_sqft,
      notes: vm.notes,
    };
    plantService.addPlant(itemToSend);
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
