myApp.service('csvService', ['$http', '$location', function($http, $location) {
  var self = this;



self.seedsCsv = function (startDate, endDate){
  $http({
    method:'GET',
    url: "/csv/exportSeeds/"+ startDate +"/"+ endDate
  }).then(function success (response){
    window.open ('/csv/exportSeeds/'+ startDate +'/'+ endDate);
  });
};


}]);
