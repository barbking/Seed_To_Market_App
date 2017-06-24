myApp.controller('InventoryController', ['$http', '$location','seedService', 'supplierService', '$uibModal', '$log', function($http, $location, seedService, supplierService, $uibModal, $log) {
  var vm = this;


  vm.sortType     = 'crop'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSeeds   = '';     // set the default search/filter term

  // create the list of seeds
  vm.inventory = seedService.inventory;
  seedService.getSeeds();

  vm.addSeed = function ( size, parentSelector ) {
    supplierService.getSuppliers();
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-seed-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
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
}]);// end InventoryController





myApp.controller( 'addSeedModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', 'supplierService',function ( $uibModalInstance, $uibModal, $log, seedService, supplierService ) {
  var vm = this;
  vm.organic = false;
  vm.untreated = false;
  vm.nongmo= false;

  supplierService.getSuppliers();
  vm.suppliers = supplierService.suppliers.list;

  vm.addNewSeed = function(){
    if ( !vm.crop || !vm.variety || !vm.purchasedate || !vm.lotnum || !vm.quantity || !vm.itemcode || !vm.selectedSupplier || !vm.seedcheck || !vm.file.url ) {
      console.log('inputs empty');
      swal({
        title: "Empty Fields!",
        text: "Please enter all fields!",
        type: "error",
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      var itemToSend = {
        crop: vm.crop,
        variety: vm.variety,
        purchase_date: vm.purchasedate,
        lot_number: vm.lotnum,
        quantity: vm.quantity,
        item_code: vm.itemcode,
        supplier_id: vm.selectedSupplier,
        organic: vm.organic,
        untreated:vm.untreated,
        non_gmo: vm.nongmo,
        seed_check_sources: vm.seedcheck,
        // receipt_url: vm.file.url
      };
      //FILESTACK IMG URL GOES HERE
      // console.log(itemToSend);
      seedService.addSeed(itemToSend);
      swal({
        title: "Seed Added!",
        text: "New seed added to inventory!",
        type: "success",
        confirmButtonText: "Ok"
      }); // end sweetalert
      $uibModalInstance.close();
    } // end if else
  }; //end add Item


  vm.cancel = function (){
    $uibModalInstance.close();
  }; // end cancel

  vm.showPicker = function(){
    var client = filestack.init('ANxEyrmJzQsSnoC7PFCcXz');
    client.pick({
      accept: 'image/*',
      maxFiles: 1,
      storeTo: {
        location: 's3'
      }
    }).then(function(result) {
      console.log(result.filesUploaded[0]);
      vm.file = result.filesUploaded[0];
      console.log(vm.file.url);
      //console.log("result.filesUploaded", JSON.stringify(result.filesUploaded));
    });
  };

  // vm.clearSeedInputs();
}]);
