'use strict';

var Boom = require('boom');                                  // HTTP Errors
var Joi = require('joi');                                   // Validation
var Skill = require('../models/skills').Skill;   // Mongoose ODM

// Exports = exports? Huh? Read: http://stackoverflow.com/a/7142924/5210
module.exports = exports = function (server) {
    console.log('Loading skills routes');
    exports.index(server);
    exports.create(server);
    exports.show(server);
    exports.remove(server);
};



/**
 * GET /skills
 * Gets all the skills from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.index = function (server) {
    // GET /skills
    server.route({
        method: 'GET',
        path: '/skills',
        handler: function (request, reply) {

            Skill.find().exec(function (err, skills) {
                if (!err) {
                    reply(skills);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        }
    });
};

/**
 * POST /new
 * Creates a new skill.
 *
 * @param server - The Hapi Server
 */
exports.create = function (server) {
    // POST /skill
    var skill;

    server.route({
        method: 'POST',
        path: '/skill',
        handler: function (request, reply) {

            skill = new Skill();
            skill.portfolio = request.payload.portfolio;
            skill.name = request.payload.name;
            skill.icon = request.payload.icon;

            skill.save(function (err) {
                if (!err) {
                    reply(skill).created('/skill/' + skill._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
    });
};

/**
 * GET /skill/{id}
 * Gets the skill based upon the {id} parameter.
 *
 * @param server - The Hapi Server
 */
exports.show = function (server) {

    server.route({
        method: 'GET',
        path: '/skill/{id}',
        config: {
            validate: {
                path: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Skill.findById(request.params.id, function (err, skill) {
                if (!err && skill) {
                    reply(skill);
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
 * DELETE /skill/{id}
 * Deletes a skill, based on the skill id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function (server) {
    server.route({
        method: 'DELETE',
        path: '/skill/{id}',
        config: {
            validate: {
                path: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Skill.findById(request.params.id, function(err, skill) {
                if(!err && skill) {
                    skill.remove();
                    reply({ message: "Skill deleted successfully"});
                } else if(!err) {
                    // Couldn't find the object.
                    reply(Boom.notFound());
                } else {
                    console.log(err);
                    reply(Boom.badRequest("Could not delete skill"));
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
