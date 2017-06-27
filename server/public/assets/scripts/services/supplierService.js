// Supplier Service
myApp.service( 'supplierService', [ '$http', '$location', function ( $http, $location ){
  var self = this;

  self.suppliers = { list: [] };
  // get all suppliers from database
  self.getSuppliers = function (){
    console.log( 'in get all suppliers' );
    $http.get( '/suppliers/getAll' ).then( function success(response) {
      console.log( 'suppliers getAll resp:', response.data );
      self.suppliers.list = response.data;
    }, function error ( response ){
      console.log( 'Error in getSuppliers:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end GET getAll from suppliers
  }; // end getSuppliers

  // add a supplier to the database
  self.addSupplier = function ( supplierObject ) {
    console.log( 'in add a supplier' );
    $http.post( '/suppliers/addSupplier', supplierObject ).then( function success( response ) {
      console.log( 'add supplier successfull:', response );
      self.getSuppliers();
    }, function error ( response ){
      console.log( 'Error in addSupplier:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST addSupplier to suppliers
  }; // end addSupplier

  //Edit supplier PUT
    self.editSupplier = function(supplier, supplierID){
      console.log('in editsupplier service with supplierToSend triggered by Update Button-->', supplier);
      return $http({
        method:'PUT',
        url:'/suppliers/editSupplier',
        params: {

          name: supplier.name,
          website: supplier.website,
          phone_number: supplier.phone_number,
          address: supplier.address,
          city: supplier.city,
          state: supplier.state,
          zip: supplier.zip,
          description: supplier.description,
          supplier_id: supplierID

        }//end params

      }).then(function( response ) {
        console.log('in service for editSupplier with response-->', response );

        return response;
      }, function error (response){
        console.log('error in update supplier', response);
        if (response.status === 403) {
          $location.path('/');
        }
      });//end error
    };//end edit supplier PUT


  self.removeSupplier = function (supplierId) {
    console.log( 'in remove supplier service');
    $http({
      method: 'PUT',
      url: '/suppliers/removeSupplier',
      params: {
        supplier_id: supplierId
      }
    }).then(function(response) {
      console.log('in removeSupplier service, back from db with -->', response);
    }, function error ( response ){
      console.log( 'Error in removeSupplier:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end PUT '/suppliers/removeSupplier'
    self.getSuppliers();
  }; // end removeSupplier


  self.getSuppliers();

}]); // end supplierService
