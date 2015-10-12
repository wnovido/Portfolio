'use strict';

describe('myApp.works module', function() {

  beforeEach(module('myApp.works'));

  describe('WorkController controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var workController = $controller('WorkController', { $scope: {} });
      expect(workController).toBeDefined();
    }));

  });
});