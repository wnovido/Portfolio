'use strict';
/**
 * Add your other routes below.
 * Each model might have a file that declares its
 * routes, such as the References model.
 *
 * @param server
 */
exports.init = function(server) {
  console.log('Loading routes');

  require('./references')(server);
  require('./portfolio')(server);
};
