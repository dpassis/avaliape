define(['app'], 
	function () {

		var app = angular.module('avaliape', [
											   'ngRoute'
											  ,'ngMockE2E'
											  ,'ngSanitize'
											  ,'ngLocalize'
											  ,'ngCookies'
											  ,'ngResource'
											  ,'oc.lazyLoad'
											  ,'firebase'
											  ,'avaliape.sharedDirective'
											  ,'avaliape.authService'
											  ,'avaliape.authController'
											  ,'avaliape.profileController'
												]
								);

		app.value('localeSupported', [
									  'en-US'
									 ,'pt-BR'
									 ,'es'
									  ]
				);

		app.controller('MainController',
										[
										  '$scope'
										 ,'$route'
										 ,'$location' 
										 ,'locale' 
										 ,'Auth'
										 ,'UserData'
										 ,'$window'
										 ,function(
													$scope
													,$route
													,$location
													,locale
													,Auth
													,UserData
													,$window
												   ) {

			$scope.auth = Auth;


		    $scope.$route = $route;
		    $scope.$location = $location;
			$scope.setLocale = locale.setLocale;
			$scope.firebaseUser = null;
			$scope.user = {
				loggedIn:  false
			};


			/**
			 * @author dpassis
			 * @description SignOut current User, remove localStorage item and redirect to HomePage
			 * 
			 */
			$scope.signOut = function () {
				$scope.auth.$signOut().then(function() {
					    $window.localStorage.removeItem("firebase:authUser:AIzaSyAWF5b41fJp4NUuu4KqiDNDJA3cASG56l0:[DEFAULT]")
						$window.location.reload(true);
						$location.path("/");
				}, function(error) {
						console.error('Erro ao sair');
				});
			};

			/**
			 * @author dpassis
			 * @description Retrieve user information when user status is changed
			 * 
			 */
			$scope.auth.$onAuthStateChanged(function(firebaseUser) {

				$scope.firebaseUser = firebaseUser;

				if ($scope.firebaseUser) {
						if(!$scope.firebaseUser.emailVerified){
							$scope.auth.$signOut();
						}else{
							$scope.user.loggedIn = true;
						}
				}else{
					$scope.user.loggedIn = false;
				}
			});

		 }]);

	
		app.config(function(
							 $routeProvider
							,$locationProvider
							,$ocLazyLoadProvider
							,$controllerProvider
							) {

								
			 	/** Initialize firebase config **/
			 	var config = {
						apiKey: "AIzaSyAWF5b41fJp4NUuu4KqiDNDJA3cASG56l0",
						authDomain: "avaliape-2b90b.firebaseapp.com",
						databaseURL: "https://avaliape-2b90b.firebaseio.com",
						projectId: "avaliape-2b90b",
						storageBucket: "avaliape-2b90b.appspot.com",
						messagingSenderId: "1020730946948"
				};

		    if(firebase.initializeApp(config)!== null)
		        	console.log('Firebase init is ok!');



			$routeProvider
			.when('/', {
				templateUrl: 'app/components/home/views/homeView.html',
				resolve: {
					deps: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load([{
								name: 'cssHomeView',
								files: ['css/cssHomeView.css']
						}]);
					}],
					langs: function (locale) {
				  		return locale.ready('shared');
					}
		    	}
			})
			


			.when('/about', {
				templateUrl: 'app/components/about/views/aboutView.html',
				resolve: {
							deps: ['$ocLazyLoad', function ($ocLazyLoad) {
								return $ocLazyLoad.load([{
										name: 'cssAboutView',
										files: ['css/cssAboutView.css']
								}]);
							}],
					    langs: function (locale) {
					      return locale.ready('shared');
			    		}
			    	}

			})

			.when('/timeline', {
				templateUrl: 'app/components/timeline/views/timelineView.html',
				resolve: {

				     	"currentAuth": ["Auth", function(Auth) {
				        	return Auth.$requireSignIn();
						}],
						"userValidate": ["UserData", function(UserData){
							return UserData.validateUser();
						}],
					    langs: function (locale) {
					      return locale.ready('shared');
			    		}
			    	}

			})

		  //.otherwise({ redirectTo: '/' });

		  $locationProvider.html5Mode(true);

		})

		/**
		 * @see http://doshprompt.github.io/angular-localization/
		 */
		app.run(function($httpBackend,$rootScope, $location) {

		    $httpBackend.whenGET('languages/en-US/')
		      .respond(angular.toJson({
		      }));
		    $httpBackend.whenGET('languages/pt-BR/')
		      .respond(angular.toJson({
		      }));
		    $httpBackend.whenGET('languages/es/')
		      .respond(angular.toJson({
		      }));
		    $httpBackend.whenGET(/.*/).passThrough();


	     $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		 
			    if (error === "AUTH_REQUIRED") {
			      $location.path("/auth");
			    }
		  });
	  });

});