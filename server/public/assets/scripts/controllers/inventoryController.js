myApp.controller('InventoryController', ['$http', '$location','seedService' function($http, $location, seedService) {
  var vm = this;


  vm.addNewSeed = function(){
        var itemToSend = {
          crop: vm.crop,
          variety: vm.variety,
          purchase_date: vm.purchasedate,
          lot_number: vm.lotnum,
          quantity: vm.quantity,
          item_code: vm.itemcode,
          organic: vm.organic,
          untreated:vm.untreated,
          NonGMO: vm.nongmo,
          seed_check: vm.seedcheck
          };
          console.log(itemToSend);
      };//end add Item

}]);
