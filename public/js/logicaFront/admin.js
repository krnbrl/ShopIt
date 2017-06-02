var app = angular.module("aplicacion", []);

app.controller("adminCtrl", function($scope, $http) {

	$scope.productoEditar = {};
	$scope.productos = [];
	
	$scope.mostrarProductos = function() {

		$http({
			method: 'GET',
			url: '/ObtenerProductos'
		}).then(
			function success(data) {
				console.log(data);
				$scope.productos = data.data;

			},
			function error(err){

				alert('Hubo un error al obtener los productos mijo');

			}
		);
	}

	$scope.editarProducto = function(producto) {
		$scope.productoEditar = producto;
	}
})