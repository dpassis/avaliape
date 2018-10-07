var app = angular.module('avaliape.userDataController',
													[
													 'avaliape.sharedService'
													,'avaliape.geoService'
													,'avaliape.sharedDirective'
												   ]);



app.controller('UserDataController',
									[
									 '$scope'
									,'$route'
									,'$location' 
									,'locale'
									,'Auth'
									,'ErrorMessage'
									,'$firebaseArray'
									,'GetGeoData'
									,function (
												$scope
												,$route
												,$location
												,locale
												,Auth
												,ErrorMessage
												,firebaseArray
												,GetGeoData
											){

			$scope.name = "userData";
			$scope.auth = Auth;
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.setLocale = locale.setLocale;
			$scope.errorMessage = ErrorMessage;
			$scope.geoData = GetGeoData;

			var currentUser  = $scope.auth.$getAuth();

			$scope.countries;
			$scope.states;
			$scope.cities;
			$scope.loadingStates = true;
			$scope.loadingCities = true;

		getCountries();

		/**
		 * @author dpassis
		 * @description Get a list of Countries based in a resource by geonames API
		 * 
		 */
		function getCountries(){
			$scope.loadingCountries = false;
			var resourceCountries  = $scope.geoData.getCountry;

			resourceCountries.query(function (data) {
				$scope.countries =  data.geonames;
				($scope.countries != null ? $scope.loadingCountries = true: $scope.loadingCountries = false);
			})
		};

		/**
		 * @author dpassis
		 * @description Get a list of States based in a resource by geonames API
		 * @param countryCode geonameId passed
		 * 
		 */
		$scope.updateStates = function(countryCode){
			$scope.loadingStates = false;
			var resourceStates  = $scope.geoData.getState;
			
			if(countryCode != null){
				resourceStates.query({id:countryCode.geonameId},function (data) {

						$scope.states = data.geonames;
						($scope.states != null ? $scope.loadingStates = true: $scope.loadingStates = false);
					
				})
			}
		};


		/**
		 * @author dpassis
		 * @description Get a list of Cities based in a resource by geonames API
		 * @param stateCode geonameId passed
		 * 
		 */
		$scope.updateCities = function(stateCode){
			$scope.loadingCities = false;
			var resourceStates  = $scope.geoData.getCity;

			if(stateCode != null){
				resourceStates.query({id:stateCode.geonameId},function (data) {
								$scope.cities = data.geonames;
								($scope.cities != null ? $scope.loadingCities = true: $scope.loadingCities = false);
				})
			}
		};
		/**
		 * @author dpassis
		 * @description Save userData based on the $scope Data get by form
		 * Data are saved in the Firebase Database and the user Display Name is update
		 * in Firebase Authentication
		 * 
		 */
		$scope.writeUserData = function () {

			$scope.succesWriteUserData = false;

			var userFinal = {

					firstName : $scope.userData.firstName,
					lastName : 	$scope.userData.lastName,
					email: 		currentUser.email,
					gender : 	$scope.userData.gender,
					birthday : 	$scope.userData.birthday,
					country : 
							{
								id:		$scope.userData.country.geonameId,
								desc:	$scope.userData.country.countryName
							},
					state : 
							{
								id:		($scope.userData.state.geonameId != null ? $scope.userData.state.geonameId : "-1" ),
								desc:	($scope.userData.state.name != null ? $scope.userData.state.name : "n/a")
							},
					city :  
							{
								id:		$scope.userData.city.geonameId,
								desc:	$scope.userData.city.name
							}
			};

			var ref = firebase.database().ref('users/' + currentUser.uid);
	
			ref.set(userFinal,
				function (error) {
					if (error) {
						$scope.error = $scope.errorMessage.getErrorMessageAuth('auth.unknownError');
					  } else{
						currentUser.updateProfile({
							displayName: userFinal.firstName+' '+userFinal.lastName,
						  }).then(function() {
							  $scope.$location.path("/profile/successUserData");
									$scope.$apply();
						  }).catch(function(error) {
							$scope.succesWriteUserData = false;
							$scope.error = $scope.errorMessage.getErrorMessageAuth('auth.unknownError');
						  });
	
					  }
				}
			);
		};

}]);




