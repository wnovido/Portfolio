'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',    
  'myApp.version',
  'ngResource',  
  'ngSanitize',
  'ngAnimate',
  'ngQuantum',
  'ui.bootstrap',
  'smart-table',
  'app.directives.common',
  'myApp.aboutme',
  'myApp.home',
  'myApp.home_services',
  'myApp.works',
  'myApp.works_services',
  'myApp.contactme',
  'myApp.contactme_services'
])

.run(['$templateCache', '$cacheFactory', '$rootScope',
  function ($templateCache, $cacheFactory, $rootScope) {
    $templateCache = false;
  }])
.config(function($stateProvider, $urlRouterProvider) {
      // For any unmatched url, send to /login
      $urlRouterProvider.otherwise("/home")
})
;
