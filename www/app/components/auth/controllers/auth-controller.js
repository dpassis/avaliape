var app = angular.module('avaliape.authController', [
													 'avaliape.sharedService'
													,'avaliape.authDirective']);

			app.controller('AuthController',
											[
											'$scope'
											,'$route'
											,'$location'
											,'locale'
											,'Auth'
											,'ErrorMessage'
											,'$rootScope'
								, function (
											$scope
											,$route
											,$location
											,locale
											,Auth
											,ErrorMessage
											,$rootScope
											)
											{

			$scope.name = "auth";
			$scope.auth = Auth;
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.setLocale = locale.setLocale;
			$scope.errorMessage = ErrorMessage;


			//$scope.successMessageTitle = 'Daniel';
			//$scope.successMessage = 'você é foda!';


			$scope.form = {
				title: 'auth.createAccount',
				buttonText: 'auth.createAccount',
				messageTitle : "auth.unknownError",
			};

			
			$scope.messageTitle = "má";
			$scope.message = "oi";
			$scope.success = false;


			/**
			 * @author dpassis
			 * @description Create new User based in e-mail and password
			 * 
			 */
			$scope.createUser = function () {
				$scope.error = null;
				$scope.messageTitle = null;
				$scope.message = null;

			
				

				if ($scope.password == $scope.confPassword) {

					$scope.auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
						.then(function (firebaseUser) {

							$scope.messageTitle = "baajfjkafjlasdjfads";
							$scope.message = "fkasdffdajifadsfdaslk";


							firebaseUser.sendEmailVerification().then(function () {
								$scope.$location.path("/auth/successCreateUser");
								if (!$scope.$$phase) {
									$scope.$apply();
									$scope.auth.$signOut();
									$scope.success = true;
								}
							}).catch(function (erro) {
								$scope.error = $scope.errorMessage.getErrorMessageAuthCreate('auth/send-mail-error');
							});

						}).catch(function (erro) {
							$scope.error = $scope.errorMessage.getErrorMessageAuthCreate(erro.code);
						});

				} else {

					$scope.error = $scope.errorMessage.getErrorMessageAuthCreate('auth/diff-password');
				}

			};

			/**
		   * @author dpassis
		   * @description  Delete Current User
		   * 
		   */
			$scope.deleteUser = function () {
				$scope.message = null;

				$scope.auth.$deleteUser().then(function () {
					$scope.message = "User deleted";
				}).catch(function (error) {
					$scope.error = error;
				});
			};

			/**
		   * @author dpassis
		   * @description Signin User with e-mail and password
		   * 
		   */
			$scope.signIn = function () {
				$scope.error = null;

				$scope.auth.$signInWithEmailAndPassword($scope.email, $scope.password)
					.then(function (authData) {

						if (!authData.emailVerified) {
							$scope.error = $scope.errorMessage.getErrorMessageAuth("auth/email-not-verified");
						} else {
							$location.path("timeline");
						}

					}).catch(function (erro) {
						$scope.error = $scope.errorMessage.getErrorMessageAuth(erro.code);
					});
			};


			/**
			 * @author dpassis
			 * @description Signin User with e-mail and password
			 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendPasswordResetEmail
			 */
			$scope.recoveryPassword = function () {

				$scope.error = null;

				var emailAddress = $scope.email;

				$scope.auth.$languageCode = locale.getLocale();

				$scope.auth.$sendPasswordResetEmail(emailAddress).then(function () {
					$scope.$location.path("/auth/successForgotPswd")
					if (!$scope.$$phase) {
						$scope.$apply();
					}
					$scope.message = "E-mail sent";
					console.log($scope.message);
				}).catch(function (erro) {
					$scope.error = $scope.errorMessage.getErrorMessagePswdReset(erro.code);
				});

			}

		}]);


app.config([
			'$routeProvider'
			,'$locationProvider', 
	function (
			$routeProvider
			,$locationProvider
		){
	
	$routeProvider
		.when('/auth', 
		{
			templateUrl: 'app/components/auth/views/authView.html',
			controller: 'AuthController',
			resolve: 
			{
				langs: function (locale) 
				{
					return locale.ready('auth');
				}
			}
		})

		.when('/auth/create', 
		{
			templateUrl: 'app/components/auth/views/createView.html',
			controller: 'AuthController',
			resolve: 
			{
				langs: function (locale) 
				{
					return locale.ready('auth');
				}
			}
		})

		.when('/auth/forgotPass', 
		{
			templateUrl: 'app/components/auth/views/forgotPassView.html',
			controller: 'AuthController',
			resolve: 
			{
				langs: function (locale) 
				{
					return locale.ready('auth');
				}
			}

		})

		.when('/auth/successCreateUser', 
		{
			templateUrl: 'app/components/auth/views/createSuccessView.html',
			resolve: 
			{
				langs: function (locale) 
				{
					return locale.ready('auth');
				}
			}
		})

		.when('/auth/successForgotPswd', 
		{
			templateUrl: 'app/components/auth/views/forgotPassSuccessView.html',
			resolve: 
			{
				langs: function (locale) 
				{
					return locale.ready('auth');
				}
			}
		})


	   $locationProvider.html5Mode(true);
}]);




