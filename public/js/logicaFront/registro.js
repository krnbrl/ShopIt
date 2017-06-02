var app = angular.module("aplicacion", []);

app.controller("registroCtrl", function($scope, $http) {
	
	$scope.nombre = "";
	$scope.apellidos = "";
	$scope.mail = "";
	$scope.telefono = "";
	$scope.direccion = "";
	$scope.contra = "";
	$scope.contra2 = "";
	$scope.error = "";

	$scope.registrar = function(){
		var aux = {
			nombre: $scope.nombre,
			apellidos: $scope.apellidos,
			mail: $scope.mail,
			telefono: $scope.telefono,
			direccion: $scope.direccion,
			contra: $scope.contra,
			contra2: $scope.contra2
		}

		if ($scope.contra === $scope.contra2) {
			$http({
				method: 'POST',
				url: '/registrar',
				params: {
					nombre: $scope.nombre,
					apellido: $scope.apellidos,
					mail: $scope.mail,
					telefono: $scope.telefono,
					direccion: $scope.direccion,
					contra: $scope.contra
				}
			}).then(
				function success(data){

					alert('Felicidades! Haz sido registrado');
					location.href = '/';

				},
				function error(err){

					alert('Hubo un error mijo');

				}
			)
		} else {
			$scope.error = 'Las contraseñas no coinciden prro :v';
		}
	}
})