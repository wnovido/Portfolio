'use strict';


//// Controller Function
(function() {
function WorkControllerFunction (WorkService, $loading, $timeout, $q, $alert) {
    var this_work = this;

    WorkService.query().$promise
    .then(function getWork(response) {
            this_work.works = response;
            this_work.displayedWorks = [].concat(this_work.works);
        })
    .catch(function errWork(fallback) {
            console.log(fallback.toUpperCase())
        });

    this_work.itemsByPage = 15;
}


angular.module('myApp.works', ['ui.router'])


// Router
.config(function configWork($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('works', {
            url: "/works",
            templateUrl: "works/works.html",
            controller: 'WorkController as wc'
        })
})


// Controller
.controller('WorkController', ['WorkService', '$loading', '$timeout', '$q', '$alert', WorkControllerFunction]);

})();
