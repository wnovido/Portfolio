'use strict';

angular.module('myApp.contactme_services',[])

.factory('ContactMeService', function ($resource) {
	return $resource('http://localhost:8801/portfolio/:id', {
            id: "@id"
        }
	);

});
