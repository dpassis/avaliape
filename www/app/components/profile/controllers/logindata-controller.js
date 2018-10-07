var app = angular.module('avaliape.loginDataController',
													[
													 'avaliape.sharedService'
													,'avaliape.geoService'
													,'avaliape.sharedDirective'
												   ]);



app.controller('LoginDataController',
									[
									 '$scope'
									,'$route'
									,'$location' 
									,'locale'
									,'Auth'
									,'ErrorMessage'
									,'$firebaseArray'
									,function (
												$scope
												,$route
												,$location
												,locale
												,Auth
												,ErrorMessage
												,firebaseArray
											){



			$scope.name = "loginData";
			$scope.auth = Auth;
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.setLocale = locale.setLocale;
			$scope.errorMessage = ErrorMessage;

			var currentUser  = $scope.auth.$getAuth();
			
			$scope.loginData = {
				email: currentUser.email,
				newEmail: '',
				newPaswword: ''

			}


		/**
		 * @author dpassis
		 * @description Save userData based on the $scope Data get by form
		 * Data are saved in the Firebase Database and the user Display Name is update
		 * in Firebase Authentication
		 * 
		 */
		$scope.updateUserEmail = function () {

			$scope.succesWriteUserData = false;

			$scope.auth.$signInWithEmailAndPassword($scope.loginData.email,$scope.loginData.oldPassword)
			.then(function (user) {
				user.updateEmail($scope.loginData.newEmail).then(function() {
					user.sendEmailVerification().then(function() {
						// Success
					  }).catch(function(error) {
						$scope.error = $scope.errorMessage.getErrorMessageAuth(erro.code);
					  });
				  }).catch(function(error) {
					$scope.error = $scope.errorMessage.getErrorMessageAuth(erro.code);
				  });

			}).catch(function (erro) {
				$scope.error = $scope.errorMessage.getErrorMessageAuth(erro.code);
			});
		
		};

		$scope.updateUserPswd = function(){
			$scope.succesWriteUserData = false;


			if ($scope.loginData.newPassword == $scope.loginData.confNewPassword) {

				$scope.auth.$signInWithEmailAndPassword(currentUser.email,$scope.loginData.oldPassword)
				.then(function (user) {
					user.updatePassword($scope.loginData.newPassword).then(function() {
						
					}).catch(function(error) {
						$scope.error = $scope.errorMessage.getErrorMessageAuth(erro.code);
					});

				}).catch(function (erro) {
					$scope.error = $scope.errorMessage.getErrorMessageAuth(erro.code);
				});
		 }else{
			$scope.error = $scope.errorMessage.getErrorMessageAuthCreate('auth/diff-password');
		 }

		};


}]);




