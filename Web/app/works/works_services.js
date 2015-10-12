'use strict';

angular.module('myApp.works_services',[])

.factory('WorkService', function ($resource) {
	return $resource('http://localhost:8801/portfolio/:id', {
            id: "@id"
        }
	);

});
