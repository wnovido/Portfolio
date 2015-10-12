'use strict';

describe('myApp.contactme module', function() {

  beforeEach(module('myApp.contactme'));

  describe('ContactMeController controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var contactmeController = $controller('ContactMeController', { $scope: {} });
      expect(contactmeController).toBeDefined();
    }));

  });
});