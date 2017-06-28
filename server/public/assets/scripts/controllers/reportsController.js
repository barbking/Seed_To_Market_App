myApp.controller('ReportsController', ['$http', '$location','$uibModal','$log','reportsService', function($http, $location,$uibModal,$log,reportsService) {
  var vm = this;

  console.log ('in ReportsController');

  vm.reports = reportsService.reports;
  reportsService.getReports();

  console.log('ReportsController reports-->',vm.reports);

  //open csv modal
  vm.openDownload = function ( size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.csv-download-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'csvDownloadModalContent.html',
      controller: 'csvDownloadModalInstanceCtrl',
      controllerAs: 'cdmic',
      size: size,
      appendTo: parentElem,
      resolve: {

      }
    }); // end modalInstance
  }; // end newActivity

}]);

//controller for download modal
myApp.controller( 'csvDownloadModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log','reportsService', function ( $uibModalInstance, $uibModal, $log,reportsService) {
  var vm = this;

  console.log( 'csvDownload in modal:');

  vm.sendDates = function(){
    var itemToSend = {
      date_from: vm.date_from,
      date_to: vm.date_to,
      select_all: vm.select_all
    };

    reportsService.sendDates(itemToSend);
    console.log(itemToSend);

    $uibModalInstance.close();
  };//end sendDates

  vm.clearInputs = function (){
    vm.select_all = '';
    $uibModalInstance.close();
  };

  vm.clearInputs();
  $uibModalInstance.close();

  }]);//end of addPlantModalInstanceCtrl controller
