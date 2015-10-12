'use strict';

(function() {
function HomeControllerFunction (PortfolioService, $loading, $timeout, $q, $alert) {
    var this_home = this;

    PortfolioService.query().$promise
    .then(function getPortfolio(response) {
            this_home.portfolio = response;
        })
    .catch(function errHome(fallback) {
            console.log(fallback.toUpperCase())
        });

}


angular.module('myApp.home', ['ui.router'])

.config(function configHome($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "home/home.html",
            controller: 'HomeController as hc'
        })
})

.controller('HomeController', ['PortfolioService', '$loading', '$timeout', '$q', '$alert', HomeControllerFunction]);

})();
