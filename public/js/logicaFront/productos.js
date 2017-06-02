var app = angular.module("aplicacion", []);

app.controller("productosCtrl", function($scope, $http) {

	$scope.productos = [];
	$scope.productosAgregados = [];
	
	$scope.mostrarProductos = function() {

		$http({
			method: 'GET',
			url: '/ObtenerProductos'
		}).then(
			function success(data) {
				for( var i = 0; i < data.data.length; i++ ) {
					data.data[i].agregados = 0;
				}
				$scope.productos = data.data;
			},
			function error(err){

				alert('Hubo un error al obtener los productos mijo');

			}
		);
	}

	$scope.agregar = function(status, index) {
		if (status) {
			if($scope.productos[index].agregados < $scope.productos[index].cantidad) {
				$scope.productos[index].agregados++;
				$scope.productosAgregados.push($scope.productos[index]);
			} 
		} else {
			if ( $scope.productos[index].agregados > 0 ) {
				$scope.productos[index].agregados--;
			}
		}
	}

})