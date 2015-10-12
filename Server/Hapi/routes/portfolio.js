'use strict';

var Boom = require('boom');                                  // HTTP Errors
var Joi = require('joi');                                   // Validation
var Portfolio = require('../models/portfolio').Portfolio;   // Mongoose ODM

// Exports = exports? Huh? Read: http://stackoverflow.com/a/7142924/5210
module.exports = exports = function (server) {
    console.log('Loading references routes');
    exports.index(server);
    exports.create(server);
    exports.show(server);
    exports.remove(server);
};



/**
 * GET /portfolio
 * Gets all the portfolio from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.index = function (server) {
    // GET /portfolio
    server.route({
        method: 'GET',
        path: '/portfolio',
        handler: function (request, reply) {

            Portfolio.find().exec(function (err, portfolio) {
                if (!err) {
                    reply(portfolio);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        }
    });
};

/**
 * POST /new
 * Creates a new portfolio.
 *
 * @param server - The Hapi Server
 */
exports.create = function (server) {
    // POST /portfolio
    var portfolio;

    server.route({
        method: 'POST',
        path: '/portfolio',
        handler: function (request, reply) {

            portfolio = new Portfolio();
            portfolio.name = request.payload.name;
            portfolio.icon = request.payload.icon;
            portfolio.link = request.payload.link;

            portfolio.save(function (err) {
                if (!err) {
                    reply(portfolio).created('/portfolio/' + portfolio._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
    });
};

/**
 * GET /portfolio/{id}
 * Gets the portfolio based upon the {id} parameter.
 *
 * @param server - The Hapi Server
 */
exports.show = function (server) {

    server.route({
        method: 'GET',
        path: '/portfolio/{id}',
        config: {
            validate: {
                path: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Portfolio.findById(request.params.id, function (err, portfolio) {
                if (!err && portfolio) {
                    reply(portfolio);
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
 * DELETE /portfolio/{id}
 * Deletes a portfolio, based on the portfolio id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function (server) {
    server.route({
        method: 'DELETE',
        path: '/portfolio/{id}',
        config: {
            validate: {
                path: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Portfolio.findById(request.params.id, function(err, portfolio) {
                if(!err && portfolio) {
                    portfolio.remove();
                    reply({ message: "Portfolio deleted successfully"});
                } else if(!err) {
                    // Couldn't find the object.
                    reply(Boom.notFound());
                } else {
                    console.log(err);
                    reply(Boom.badRequest("Could not delete portfolio"));
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
