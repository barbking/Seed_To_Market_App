myApp.controller('ReportsController', ['$http', '$location', 'reportsService', function($http, $location, reportsService) {
  var vm = this;

  console.log ('in ReportsController');

  vm.reports = reportsService.reports;
  reportsService.getReports();

  console.log('ReportsController reports-->',vm.reports);

}]);
