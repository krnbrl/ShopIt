var app = angular.module("aplicacion", []);

app.controller("productosCtrl", function($scope, $http) {

	$scope.productos = [];
	$scope.productosCarro = [];

	$scope.inicializar = function() {
		$scope.producto = {
			id: document.getElementById('id-prod').value,
			nombre: document.getElementById('id-nombre').value,
			descripcion: document.getElementById('id-descripcion').value,
			foto: document.getElementById('id-foto').value,
			precio: document.getElementById('id-precio').value,
			cantidad: 0
		};
		$scope.stock = document.getElementById('id-stock').value;
	}
	
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

	$scope.agregar = function(status) {
		if (status) {
			if($scope.producto.cantidad < $scope.stock) {
				$scope.producto.cantidad++;
			} 
		} else {
			if ( $scope.producto.cantidad > 0 ) {
				$scope.producto.cantidad--;
			}
		}
	}

	$scope.agregarAlCarro= function(){
		if ($scope.producto.cantidad > 0){	
			$http({
				method: 'POST',
				url: '/AgregarAlCarro',
				params: $scope.producto
			}).then(
				function success(data) {
					alert("Se agrego al carrito!");
					location.reload();
				},
				function error(err){
					alert("No se agrego nada, krnl.");
				}
			);	
		}
	}

	$scope.mostrarCarro = function() {
		$http({
			method: 'GET',
			url: '/MostrarCarro'
		}).then(
			function success(data) {
				$scope.productosCarro = data.data;
			},
			function error(err){
				console.log('Hubo un error al obtener el carrito');
			}
		);
	}

	$scope.getTotal = function() {
		var total = 0;
		var carrito = $scope.productosCarro;
		for ( var i = 0; i < carrito.length ; i++ ) {
			total = total + (carrito[i].precio * carrito[i].cantidad);
		}
		return total;
	}

	$scope.confirmarCompra = function() {
		$http({
			method: 'POST',
			url: '/ConfirmarCompra',
			params: {
				compra: $scope.productosCarro
			}
		}).then(
			function success(data) {
				alert("La compra se realizo con éxito!")
				location.reload();
			},
			function error(err){
				console.log('Hubo un error al obtener el carrito');
			}
		);	
	}

})