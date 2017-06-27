myApp.service('reportsService', ['$http', '$location', function($http, $location) {
  var self = this;

  self.reports = { list: [] };

  self.getReports = function () {
    console.log('in getSold service');
    $http ({
      method: 'GET',
      url: '/planner/reports',
    }).then( function (response) {
      console.log( 'getReports resp:', response.data );
      self.reports.list = response.data;
    }, function error ( response ){
      console.log( 'Error in getReports:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end getPlants
  };//end getPlant GET

  self.getReports();

  }]);
