/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

var middlewares = require("../api/middlewares");

module.exports.http = {

    middleware: {
      order: [
        'startRequestTimer',
        'cookieParser',
        'session',
        'bodyParser',
        'handleBodyParserError',
        'compress',
        'methodOverride',
        'poweredBy',
        '$custom',
        'router',
        'www',
        'favicon',
        '404',
        '500'
      ],

      poweredBy : middlewares.poweredBy()
    }
};
