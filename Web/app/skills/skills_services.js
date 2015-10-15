'use strict';

angular.module('myApp.skills_services',[])

.factory('SkillService', function ($resource) {
	return $resource('http://localhost:8801/skills/:id', {
            id: "@id",
            portfolioName: "@portfolioName"
        }
	);

});
