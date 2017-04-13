/**
 * blear.express.http-method-override
 * @author ydr.me
 * @create 2017年04月13日17:26:35
 */


'use strict';

var object = require('blear.utils.object');

var defaults = {
    header: 'x-http-method-override'
};

module.exports = function (options) {
    options = object.assign({}, defaults, options);
    options.header = options.header.toLowerCase();

    return function (req, res, next) {
        var originMethod = req.headers[options.header];

        if (originMethod) {
            req.originalMethod = req.originalMethod || req.method;
            req.method = originMethod.toUpperCase();
        }

        next();
    };
};


