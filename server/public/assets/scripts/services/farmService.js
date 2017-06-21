myApp.service('farmService', ['$http', function($http) {

    this.updateFarm = function (farmInfo){
      return $http({
        method: 'PUT',
        url: '/farm/savefarm',
        params: {
        farm_name: farmInfo.farm_name,
        farm_address: farmInfo.farm_address,
        farm_city: farmInfo.farm_city,
        farm_state: farmInfo.farm_state,
        farm_zip: farmInfo.farm_zip
          }
      }).then(function(response) {
        console.log('in updateFarm service, back from db with -->', response);
        return response;
      });
    };

    this.getFarm = function(){
      return $http({
        method: 'GET',
        url:'/farm/farmInfo',
      }).then(function(response) {
        console.log('in getFarm service, back from db with response.data-->', response.data);
        return response.data;
      });
    };


}]);
