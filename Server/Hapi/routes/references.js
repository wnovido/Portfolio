'use strict';

var Boom    = require('boom');                                  // HTTP Errors
var Joi     = require('joi');                                   // Validation
var Reference   = require('../models/references').Reference;   // Mongoose ODM

// Exports = exports? Huh? Read: http://stackoverflow.com/a/7142924/5210
module.exports = exports = function (server) {
    console.log('Loading references routes');
    exports.index(server);
    exports.create(server);
    exports.show(server);
    exports.remove(server);
};

/**
 * GET /references
 * Gets all the references from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.index = function (server) {
    // GET /references
    server.route({
        method: 'GET',
        path: '/references',
        handler: function (request, reply) {
            Reference.find({}, function (err, references) {
                if (!err) {
                    reply(references);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        }
    });
};

/**
 * POST /new
 * Creates a new event in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function (server) {
    // POST /references
    var reference;

    server.route({
        method: 'POST',
        path: '/references',
        handler: function (request, reply) {

            reference = new Reference();
            reference.category = request.payload.category;
            reference.info1 = request.payload.info1;
            reference.info2 = request.payload.info2;
            reference.info3 = request.payload.info3;

            reference.save(function (err) {
                if (!err) {
                    reply(reference).created('/references/' + reference._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
    });
};

/**
 * GET /events/{id}
 * Gets the event based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function (server) {

    server.route({
        method: 'GET',
        path: '/references/{id}',
        config: {
            validate: {
                path: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Reference.findById(request.params.id, function (err, reference) {
                if (!err && reference) {
                    reply(reference);
                } else if (err) {
                    // Log it, but don't show the user, don't want to expose ourselves (think security)
                    console.log(err);
                    reply(Boom.notFound());
                } else {

                    reply(Boom.notFound());
                }
            });
        }
    })
};

/**
 * DELETE /events/{id}
 * Deletes an event, based on the event id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function (server) {
    server.route({
        method: 'DELETE',
        path: '/references/{id}',
        config: {
            validate: {
                path: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Reference.findById(request.params.id, function(err, reference) {
                if(!err && reference) {
                    reference.remove();
                    reply({ message: "Reference deleted successfully"});
                } else if(!err) {
                    // Couldn't find the object.
                    reply(Boom.notFound());
                } else {
                    console.log(err);
                    reply(Boom.badRequest("Could not delete Reference"));
                }
            });
        }
    })
};

/**
 * Formats an error message that is returned from Mongoose.
 *
 * @param err The error object
 * @returns {string} The error message string.
 */
function getErrorMessageFrom(err) {
    var errorMessage = '';

    if (err.errors) {
        for (var prop in err.errors) {
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}
