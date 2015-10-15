'use strict';

(function() {
function SkillControllerFunction (SkillService, $loading, $timeout, $q, $alert, $stateParams) {
    var this_skills = this;
    this_skills.params = $stateParams;
    this_skills.foo = $stateParams.foo;

    SkillService.query({portfolioName: this_skills.foo}).$promise
    .then(function getSkills(response) {
            this_skills.skills = response;
        })
    .catch(function errHome(fallback) {
            console.log(fallback.toUpperCase())
        });

}


angular.module('myApp.skills', ['ui.router'])

.config(function configHome($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('skills', {
            url: "/skills/:foo",
            templateUrl: "skills/skills.html",
            controller: 'SkillController as kc'
        })
})

.controller('SkillController', ['SkillService', '$loading', '$timeout', '$q', '$alert', '$stateParams', SkillControllerFunction]);

})();
