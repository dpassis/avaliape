angular.module('avaliape.authDirective',[])

.directive('messageSuccess', function () {
		var ddo = {};
	
		ddo.restrict = "AE";
	
		ddo.scope = {
			messageTitle: '@', //@ é uma string, sempre uma copia de valor
			message: '@' //@ é uma string, sempre uma copia de valor
		};


		ddo.template = '<h3>{{messageTitle}}</h3>'+
							'<h4>{{message}}</h4>';
	
		return ddo;
})