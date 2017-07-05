myApp.controller('PlannerController', ['$http', '$location', '$uibModal', '$log', 'seedService', 'plantService', 'harvestService', 'sellService', function($http, $location, $uibModal, $log, seedService, plantService, harvestService, sellService ) {
  var vm = this;

  vm.sortType     = 'crop'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSeeds   = '';     // set the default search/filter term

  // create the list of seeds
  vm.inventory = seedService.inventory;
  seedService.getSeeds();

  //create list of planted seeds
  vm.planted = plantService.plantsAndSeeds;
  plantService.getPlantsAndSeeds();

  //create list of harvested crops
  vm.harvested = harvestService.harvest;
  // harvestService.getHarvest();
  harvestService.getHarvestAndCrop();

  //create list of sold crops
  vm.sold = sellService.sold;
  sellService.getSold();

  //show/hide inventory table
  vm.isVisible = false;
  vm.showHide = function () {
   //If DIV is visible it will be hidden and vice versa.
   vm.isVisible = vm.isVisible ? false : true;
  };

  //open plant modal
  vm.open = function ( seed, size, parentSelector ) {
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
        seed: function() {
          return seed;
        }
      }
    }); // end modalInstance
  }; // end newActivity

  //open harvest modal
  vm.openHarvest = function ( plant, size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-harvest-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addHarvestModalContent.html',
      controller: 'addHarvestModalInstanceCtrl',
      controllerAs: 'ahmic',
      size: size,
      appendTo: parentElem,
      resolve: {
        plant: function() {
          return plant;
        }
      }
    }); // end modalInstance
  }; // end newActivity

  //open sold modal
  vm.openSold = function ( harvest, size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-sold-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addSoldModalContent.html',
      controller: 'addSoldModalInstanceCtrl',
      controllerAs: 'asmic',
      size: size,
      appendTo: parentElem,
      resolve: {
        harvest: function() {
          return harvest;
        }
      }
    }); // end modalInstance
  }; // end newActivity

}]);//end of PlannerController

//controller for PLANT modal
myApp.controller( 'addPlantModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', 'plantService', 'seed', function ( $uibModalInstance, $uibModal, $log, seedService, plantService, seed) {
  var vm = this;

  vm.inventory = seedService.inventory;
  vm.crop = seed.crop;
  vm.variety = seed.variety;

  console.log( 'seed_id in modal:', seed.seed_id );
  console.log ('apmic controller inventory',vm.inventory);

  vm.addPlant = function(){
    if ( !vm.quantity || !vm.date_planted || !vm.location || !vm.area_sqft ) {
      swal({
        title: "Empty Fields!",
        text: "Please enter all fields!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      var itemToSend = {
        seed_id: seed.seed_id,
        location: vm.location,
        date_planted: vm.date_planted,
        quantity: vm.quantity,
        area_sqft: vm.area_sqft,
        notes: vm.notes,
        out_of_stock: vm.out_of_stock
      }; // end itemToSend
      plantService.addPlant(itemToSend);
      console.log(itemToSend);
      //if check last seed checkbox in modal, update seeds table out_of_stock to true
      if (vm.out_of_stock === true) {
        var seedToUpdate = {
          seed_id: seed.seed_id,
          out_of_stock: true,
        }; // end seedToUpdate
        console.log('seedToUpdate-->', seedToUpdate);
        seedService.updateSeedStock(seedToUpdate);
      } // end if out_of_stock
      $uibModalInstance.close();
      swal({
        title: "Seeds Planted!",
        type: "success",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } // end if empty
  };//end add Item


  vm.clearPlantInputs = function (){
    vm.location = '';
    vm.date_planted = '';
    vm.quantity = '';
    vm.area_sqft = '';
    vm.notes = '';

    $uibModalInstance.close();
  }; // end clearPlantInputs

  vm.clearPlantInputs();
}]);//end of addPlantModalInstanceCtrl controller

//conroller for HARVEST modal
myApp.controller( 'addHarvestModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', 'plantService', 'harvestService', 'plant', function ( $uibModalInstance, $uibModal, $log, seedService, plantService, harvestService, plant) {
  var vm = this;

  vm.planted = plantService.plantsAndSeeds;
  vm.crop = plant.crop;
  vm.variety = plant.variety;
  vm.location = plant.location;

  console.log ('ahmic controller plant', vm.planted);
  console.log( 'plant_id in modal:', plant.planted_id );

  vm.addHarvest = function(){
    if ( !vm.yield || !vm.date_harvested || !vm.area_sqft ) {
      swal({
        title: "Empty Fields!",
        text: "Please enter all fields!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      var itemToSend = {
        plant_id: plant.planted_id,
        location: vm.location,
        area_sqft: vm.area_sqft,
        date_harvested: vm.date_harvested,
        yield: vm.yield,
        notes: vm.notes
      }; // itemToSend
      harvestService.addHarvest(itemToSend);
      console.log('addHarvest object to send-->',itemToSend);
      //update plant table if last harvest
      if (vm.harvest_complete === true) {
        var plantToUpdate = {
          planted_id: plant.planted_id,
          harvest_complete: true,
          harvest_complet_date: vm.date_harvested
        }; // plantToUpdate
        console.log('plantToUpdate-->', plantToUpdate);
        plantService.updatePlanted(plantToUpdate);
      } // end if harvest_complete
      $uibModalInstance.close();
      swal({
        title: "Crop Harvested!",
        type: "success",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } // end if empty
  };//end add Item


  vm.clearHarvestInputs = function (){
    vm.area_sqft = '';
    vm.date_harvested = '';
    vm.yield = '';
    vm.notes = '';
    vm.harvest_complete = false;

    $uibModalInstance.close();
  };

  vm.clearHarvestInputs();
}]);//end of addHarvestModalInstanceCtrl controller

//conroller for Sold modal
myApp.controller( 'addSoldModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', 'plantService', 'harvestService', 'sellService', 'harvest', function ( $uibModalInstance, $uibModal, $log, seedService, plantService, harvestService, sellService, harvest) {
  var vm = this;

  console.log ('asmic controller inventory');

  vm.harvested = harvestService.harvest;
  vm.crop = harvest.crop;
  vm.variety = harvest.variety;
  vm.date_harvested = harvest.date_harvested;

  vm.addSold = function(){
    if ( !vm.weight_sold || !vm.date_sold || !vm.sold_to ) {
      swal({
        title: "Empty Fields!",
        text: "Please enter all fields!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      var itemToSend = {
        harvested_id: harvest.harvested_id,
        date_sold: vm.date_sold,
        weight_sold: vm.weight_sold,
        sold_to: vm.sold_to,
        notes: vm.notes,
        sold_out: vm.sold_out
      };

      sellService.addSale(itemToSend);
      console.log('addSale object to send-->',itemToSend);

      //update harvest table if harvest sold out
      if (vm.sold_out === true) {
        var harvestToUpdate = {
          harvest_id: harvest.harvested_id,
          sold_out: true,
        };
        console.log('harvestToUpdate-->', harvestToUpdate);
        harvestService.updateHarvest(harvestToUpdate);
      }//end if
      $uibModalInstance.close();
      swal({
        title: "Harvest Sold!",
        type: "success",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } // end if empty
  };//end addSold

  vm.clearSoldInputs = function (){
    vm.date_sold = '';
    vm.weight_sold = '';
    vm.sold_to = '';
    vm.notes = '';
    vm.sold_out = false;

    $uibModalInstance.close();
  };

  vm.clearSoldInputs();
}]);//end of addSoldModalInstanceCtrl controller
