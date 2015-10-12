'use strict';

angular.module('myApp.home_services',[])

.factory('PortfolioService', function ($resource) {
	return $resource('http://localhost:8801/portfolio/:id', {
            id: "@id"
        }
	);

});
