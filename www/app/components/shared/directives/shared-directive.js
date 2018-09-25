angular.module('avaliape.sharedDirective',[])

.directive('menuBar', function () {

	//directive definition object
	var ddo = {} ;

	//A = Atribut E = Element
	ddo.restrict = "AE";

	ddo.templateUrl =  'app/components/shared/views/menu.html';

	return ddo;
})


.directive('navBar', function () {

	//directive definition object
	var ddo = {} ;

	//A = Atribut E = Element
	ddo.restrict = "AE";

	ddo.templateUrl =  'app/components/shared/views/navbar.html';

	return ddo;
})


.directive('footerBar', function () {
	
		//directive definition object
		var ddo = {} ;
	
		//A = Atribut E = Element
		ddo.restrict = "AE";
	
		ddo.templateUrl =  'app/components/shared/views/footer.html';
	
		return ddo;
	})

.directive('saveDataButton', function () {
		var ddo = {};
	
		ddo.restrict = "AE";
	
		ddo.scope = {
			nome: '@', //@ é uma string, sempre uma copia de valor
			acao: '&'//,//& avalia expressão dentro do contexto do controller
		};
	
		ddo.template = '<button type="submit" ng-click="acao()" class="btn btn-common log-btn">{{nome}}</button>';
	
		return ddo;
})

//init select plugin
.directive('row', function(){
   return {
       restrict: 'C',
       link: function(scope, elem, attrs){
			$('.selectpicker').selectpicker({
				style: 'btn-select',
				size: 4
			});
			//WOW Scroll Spy
			var wow = new WOW({
			    //disabled for mobile
			    mobile: false
			});
			wow.init();
			//loader
			$('#loader').fadeOut();
			// Back Top Link
			var offset = 200;
			var duration = 500;
			$(window).scroll(function() {
			    if ($(this).scrollTop() > offset) {
			      $('.back-to-top').fadeIn(400);
			    } else {
			      $('.back-to-top').fadeOut(400);
			    }
			});
       }
   }
})
