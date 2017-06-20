myApp.controller('InventoryController', ['$http', '$location','seedService', '$uibModal', '$log', function($http, $location, seedService, $uibModal, $log) {
  var vm = this;




  vm.sortType     = 'crop'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSeeds   = '';     // set the default search/filter term

  // create the list of seeds
  vm.inventory = [
  { crop: 'Beans', variety: 'Green', quanity: 100, date:'4/1', supplier:'seedbank' },
  { crop: 'Onions', variety: 'red', quanity: 20, date:'4/2', supplier:'seedbank2' },
  { crop: 'Cucumber', variety: 'large', quanity: 200, date:'4/10', supplier:'seedbank3' },
  { crop: 'tomato', variety: 'russian', quanity: 2, date:'4/15', supplier:'seedbank4' }

  ];







  vm.open = function ( size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-seed-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addSeedModalContent.html',
      controller: 'addSeedModalInstanceCtrl',
      controllerAs: 'asmic',
      size: size,
      appendTo: parentElem,
      resolve: {

      }
    }); // end modalInstance
  }; // end newActivity
}]);


myApp.controller( 'addSeedModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', function ( $uibModalInstance, $uibModal, $log ) {
  var vm = this;

  vm.addNewSeed = function(supplierId){
    var itemToSend = {
      crop: vm.crop,
      variety: vm.variety,
      purchase_date: vm.purchasedate,
      lot_number: vm.lotnum,
      quantity: vm.quantity,
      item_code: vm.itemcode,
      supplier_id: supplierId,
      organic: vm.organic,
      untreated:vm.untreated,
      non_gmo: vm.nongmo,
      seed_check_sources: vm.seedcheck,
      //receipt_url:
    };
    //FILESTACK IMG URL GOES HERE
    console.log(itemToSend);

    $uibModalInstance.close();
  };//end add Item

  vm.clearSeedInputs = function (){
    vm.crop = "";
    vm.variety = "";
    vm.purchasedate = "";
    vm.lotnum = "";
    vm.quantity = "";
    vm.itemcode = "";
    vm.organic = false;
    vm.untreated = false;
    vm.nongmo= false;
    vm.seedcheck= "";

    $uibModalInstance.close();
  };

  vm.clearSeedInputs();
}]);
