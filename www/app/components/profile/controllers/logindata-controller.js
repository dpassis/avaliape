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
			
			$scope.form = {
				title: 'pfl.loginDataForm.loginDataFormTitle',
				buttonText: 'pfl.loginDataForm.changeEmailOrPassword',
				function: 'writeUserData()',
				successMessage: ''
			};

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
		$scope.writeLoginData = function () {

			$scope.succesWriteUserData = false;

			var userFinal = {

					email: 		currentUser.email,
				
			};

			var ref = firebase.database().ref('users/' + currentUser.uid);
	
			ref.set(userFinal,
				function (error) {
					if (error) {
						$scope.error = 	$scope.error = $scope.errorMessage.getErrorMessageAuth('auth.unknownError');
					  } else{
						currentUser.updateProfile({
							displayName: userFinal.firstName+' '+userFinal.lastName,
						  }).then(function() {
							  console.log("cadastrado com sucesso");
							  $scope.$location.path("/profile/successUserData");
									$scope.$apply();
						  }).catch(function(error) {
							$scope.succesWriteUserData = false;
							$scope.error = 	$scope.error = $scope.errorMessage.getErrorMessageAuth('auth.unknownError');
						  });
	
					  }
				}
			);
		};


}]);




