var app = angular.module('aplicacion', []);

app.controller('loginCtrl', function($scope, $http) {
	$scope.mail = "";
	$scope.pass = "";
	$scope.error= "";

	$scope.loguea = function(){
		$http({
			method: 'POST',
			url: '/login',
			params: {
				mail: $scope.mail,
				contra: $scope.pass
			}
		}).then(
			function success(data){
				location.href = '/';
			},
			function error(err){
				$scope.error="Usuario o contraseña incorrecta";
			}
		)
	}
})