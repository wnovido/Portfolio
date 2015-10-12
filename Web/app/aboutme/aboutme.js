'use strict';

angular.module('myApp.aboutme', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('aboutme', {
            url: "/aboutme",
            templateUrl: "aboutme/aboutme.html",
              controller: 'AboutmeController'
        })
})

.controller('AboutmeController', ['$scope', function($scope) {
	$scope.things = ["A", "Set", "Of", "Things"];
}]);