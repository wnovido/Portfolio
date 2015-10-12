'use strict';


//// Controller Function
(function() {
function ContactMeControllerFunction (ContactMeService, $loading, $timeout, $q, $alert) {
    var this_contactme = this;

    ContactMeService.query().$promise
    .then(function getWork(response) {
            this_contactme.contactme = response;
            this_contactme.displayedWorks = [].concat(this_contactme.contactme);
        })
    .catch(function errWork(fallback) {
            console.log(fallback.toUpperCase())
        });

    this_contactme.itemsByPage = 15;
}


angular.module('myApp.contactme', ['ui.router'])


// Router
.config(function configWork($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('contactme', {
            url: "/contactme",
            templateUrl: "contactme/contactme.html",
            controller: 'ContactMeController as ctc'
        })
})


// Controller
.controller('ContactMeController', ['ContactMeService', '$loading', '$timeout', '$q', '$alert', ContactMeControllerFunction]);

})();
