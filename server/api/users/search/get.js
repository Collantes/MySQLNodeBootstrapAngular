var cryptUtils = require('../../../utils/cryptUtils.js');
var errorResponse = require('../../errorResponse.js');
var apiHandler = require('../../apiHandler.js');
var users = require('../../../dao/users.js');


function createAPI(app) {
    var handler = new apiHandler('/api/users/search/', '');
    handler.requiresPermission = 'AdminPortalAccess';

    handler.validateData = function (req, res) {
        return req.query.pageSize && req.query.pageSize <= 50;
    };

    handler.get = function (req,res){
        var p = req.query;
        users.searchUsers(p.criteria, false, p.pageIndex, p.pageSize ,function (err, results) {
            if ( err )
                errorResponse.sendError(res, err,'a problem occurred with search' );
             else {
                res.send(results); //success
            }
        });

    };

    return handler;
}
module.exports = createAPI;