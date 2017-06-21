myApp.controller('SuppliersController', ['$http', '$location', function($http, $location) {
  var vm = this;




  vm.sortType     = 'name'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSuppliers   = '';     // set the default search/filter term

  // create the list of suppliers
  // vm.suppliers = supplierService.supplier; //<------Check With Barb-Ben if this is right code?



}]);
