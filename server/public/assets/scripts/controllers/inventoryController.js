myApp.controller('InventoryController', ['$http', '$location','seedService', function($http, $location, seedService) {
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
    };

}]);
