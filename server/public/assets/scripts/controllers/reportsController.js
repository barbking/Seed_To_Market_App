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
myApp.controller( 'csvDownloadModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log','reportsService', 'csvService', function ( $uibModalInstance, $uibModal, $log, reportsService, csvService ) {
  var vm = this;

  console.log( 'csvDownload in modal:');

  function pgFormatDate (date) {
    /* Via http://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date */
    function zeroPad(d) {
        return ("0" + d).slice(-2)
    } 

    if (date) {
        var parsed = new Date(date)
        return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join("-");
    } else {
        return null;
    }
};

  vm.sendDates = function(){
    var startDate = pgFormatDate(vm.date_from);
    var endDate = pgFormatDate(vm.date_to);
    console.log(startDate, endDate);
    csvService.seedsCsv(startDate, endDate);

    $uibModalInstance.close();
  };//end sendDates

  vm.clearInputs = function (){
    vm.select_all = '';
    $uibModalInstance.close();
  };

  vm.clearInputs();
  $uibModalInstance.close();

  }]);//end of addPlantModalInstanceCtrl controller
