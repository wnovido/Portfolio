angular.module('app.directives.common',[]).
directive('wanLinks', function() {
	return {
		restrict: 'E',
		scope: {
			ttl: '='
		},
		replace: true,
		templateUrl: "common/wanLinks.html",
		link: function(scope, element, attrs) {
			console.log("kk");
		},
		controller: function($scope) {
			console.log("okkkkkk");
		}
	};
});

       