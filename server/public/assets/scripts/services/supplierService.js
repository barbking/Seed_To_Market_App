// Supplier Service
myApp.service( 'supplierService', [ '$http', '$location', function ( $http, $location ){
  var self = this;

  self.getSuppliers = function (){
    console.log( 'in get all suppliers' );
    return $http.get( '/suppliers/getAll' ).then( function success(response) {
      console.log( 'suppliers getAll resp:', response );
      return response.data;
    }); // end GET getAll from suppliers
  }; // end getSuppliers

  self.addSupplier = function ( supplierObject ) {
    console.log( 'in add a supplier' );
    return $http.post( '/suppliers/addSupplier', supplierObject ).then( function success( response ) {
      console.log( 'add supplier successfull:', response );
    }, function error ( err ){
      console.log( 'error:', err );

    }); // end POST addSupplier to suppliers
  }; // end addSupplier

}]); // end supplierService
