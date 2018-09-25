require.config({
    //urlArgs: "bust=" + new Date().getTime(),
    
    //waitSeconds: 0,

	paths: {

        /** load firebase **/
        firebase: 'libs/js/firebase/4.1.3/firebase',

		/** load angular **/
		angular: 'libs/js/angularjs/1.5.6/angular.min',

        /** load angular fire **/
        angular_fire: 'libs/js/angularfire/2.3.0/angularfire.min',

		/** angular route **/
        angular_route: 'libs/js/angularjs/1.5.6/angular-route.min',

        /** angular mocks **/
        angular_mocks: 'libs/js/angularjs/1.5.6/angular-mocks',

        /** angular mocks **/
        angular_cookies: 'libs/js/angularjs/1.5.6/angular-cookies.min',

        /** angular sanitize **/
        angular_sanitize: 'libs/js/angularjs/1.5.6/angular-sanitize.min',

        /** load resource **/
        angular_resource: 'libs/js/angularjs/1.5.6/angular-resource',

        /** angular localization **/
        angular_localization: 'libs/js/angular-localization/1.2.1/angular-localization',

		/** load ocLazyLoad **/
		angular_ocLazyLoad: 'libs/js/oclazyload/1.1.0/ocLazyLoad.min',

        /** load ui_bootstrap **/
        angular_ui_bootstrap: 'libs/js/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min',


        /********* Auth Module *****************/
        authController: 'components/auth/controllers/auth-controller',
        authService: 'components/auth/services/auth-service',
        authDirective: 'components/auth/directives/auth-directive',
       

        /********* About Module *****************/
        aboutController: 'components/about/controllers/about-controller',
        

        /********* Profile Module *****************/
        profileController: 'components/profile/controllers/profile-controller',
        userDataController: 'components/profile/controllers/userdata-controller',
        loginDataController: 'components/profile/controllers/logindata-controller',
        


        /********* Shared Module *****************/
        sharedDirective: 'components/shared/directives/shared-directive',
        sharedService: 'components/shared/services/shared-service',
        geoService: 'components/shared/services/geo-service',
        

	},

	 // Mention the dependencies
    shim: {

        angular: {
            exports: 'angular'
        },

    	/** deps to angular_route **/
    	angular_route: {
            deps: ['angular']
        },

        /** deps to angular_mocks **/
        angular_mocks: {
            deps: ['angular'],
			exports: 'angular_mocks'
        },

        /** deps to angular_cookies **/
        angular_cookies: {
            deps: ['angular']
        },

        /** deps to angular_sanitize **/
        angular_sanitize: {
            deps: ['angular']
        },

        /** deps to angular_localization **/
        angular_localization: {
            deps: ['angular']
        },

        /** deps to angular_ocLazyLoad **/
        angular_ocLazyLoad: {
            deps: ['angular']
        },

        /** deps to angular_ui_bootstrap **/
        angular_ui_bootstrap: {
            deps: ['angular']
        },

        angular_resource: {
            deps: ['angular']
        },

        angular_fire: {
            deps: ['angular','firebase']
            ,exports: 'angular_fire'
        },

        sharedDirective: {
            deps: ['angular']
        },

        authService: {
            deps: ['angular_fire']
        },

        sharedService: {
            deps: ['angular']
        },

        authDirective: {
            deps: ['angular']
        },

        geoService: {
            deps: ['angular','angular_resource']
        },
        


        /** deps to app **/
        app: {
        	deps: [
                     'angular'
                    ,'angular_route'
                    ,'angular_mocks'
                    ,'angular_sanitize'
                    ,'angular_localization'
                    ,'angular_cookies'
                    ,'angular_resource'
                    ,'angular_ui_bootstrap'
                    ,'angular_ocLazyLoad' 
                    ,'angular_fire'
                    ,'firebase'
                    ,'sharedDirective'
                    ,'authService'
                    ,'authController'
                    ,'profileController'
                    ]
        },

        authController: {
            deps: ['authService','sharedService','authDirective']
        },

        profileController: {
            deps: ['angular_resource','authService','sharedService','geoService']
        },

        userDataController :{
            deps: ['angular_resource','authService','sharedService','geoService']
        },
        
        loginDataController :{
            deps: ['angular_resource','authService','sharedService']
        }


    },

    priority: [
		'angular'
	],

    deps:['app']


});


require(['app'], function () {
        angular.bootstrap(document, ['avaliape']);
});

