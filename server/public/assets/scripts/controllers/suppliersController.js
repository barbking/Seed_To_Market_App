myApp.controller('SuppliersController', ['$http','$location','$uibModal','$log','supplierService', function ($http, $location,$uibModal,$log,supplierService) {
  var vm = this;
  vm.suppliers = supplierService.suppliers;
  supplierService.getSuppliers();

  vm.sortType     = 'name'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSuppliers   = '';     // set the default search/filter term
  vm.editMode = false;

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
  }; // end open

  //Edit button from HTML
  vm.showEdit = function(supplier) {
    console.log('in edit supplier');
    // vm.sortType = null;
    supplier.editMode = true;
    vm.editMode = true;
  }; // end showEdit


  //Cancel button from HTML
  vm.cancel = function(supplier) {
    console.log('in cancel');
    supplierService.getSuppliers();
    supplier.editMode = false;
    vm.editMode = false;
  }; // end cancel

  //Update button from HTML
  vm.updateSupplier = function (supplier, supplierID){
    console.log('In saveEditSupplier');
    console.log('supplier update:', supplier);
    supplierService.editSupplier(supplier, supplierID);
    supplier.editMode = false;
    vm.editMode = false;
    swal({
      title: "Supplier Updated!",
      type: "success",
      timer: 3500,
      confirmButtonText: "Ok"
    }); // end sweetalert
  }; // end updateSupplier

  vm.deleteSupplier = function (supplierID){
    console.log('supplier id', supplierID);
    swal({
      title: "Remove Supplier?",
      text: "Are you sure you want to remove this supplier? It will remain in the database for reporting but will not be visible",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Remove",
      closeOnConfirm: false
    },
    function(){
      supplierService.removeSupplier(supplierID);
      vm.suppliers = supplierService.suppliers;
      supplierService.getSuppliers();
      swal({
        title: "Supplier Removed!",
        type: "success",
        timer: 3500
      }); // end 'removed' sweetalert
    }); // end 'remove' sweetalert
  }; // end deleteSupplier

}]); // end SuppliersController

// add a supplier modal controller
myApp.controller( 'addSupplierModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'supplierService', function ( $uibModalInstance, $uibModal, $log, supplierService) {
  var vm = this;

  vm.states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL","GA", "HI", "ID", "IL", "IN", "IA","KS","KY","LA","ME","MD","MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM","NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN","TX","UT","VT","VA","WA","WV","WI","WY"];

  vm.addNewSupplier = function(){
    // check for empty fields
    if ( !vm.name || !vm.website || !vm.phone_number || !vm.address || !vm.city || !vm.state || !vm.zip || !vm.description ) {
      swal({
        title: "Empty Fields!",
        text: "Please enter all fields!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      var itemToSend = {
        name: vm.name,
        website: vm.website,
        phone_number: vm.phone_number,
        address: vm.address,
        city: vm.city,
        state: vm.state,
        zip: vm.zip,
        description: vm.description
      }; // end itemToSend
      console.log(itemToSend);
      supplierService.addSupplier(itemToSend);
      $uibModalInstance.close();
      swal({
        title: "Supplier Added!",
        type: "success",
        confirmButtonText: "Ok"
      }); // end sweetalert
    } // end if else
  }; //end add Item

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
  }; // end clearSupplierInputs

}]); // end addSupplierModalInstanceCtrl
