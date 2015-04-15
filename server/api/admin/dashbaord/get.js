/**
 * Created by Daniel on 1/1/2015.
 */

//var userDAO = require('../../dao/dashboard.js');

function createAPI(app) {
    var apiHandler = require('../../apiHandler.js');
    var dashboard = new apiHandler('/api/admin/dashboard');
    dashboard.requiresPermission = 'AdminPortalAccess';

    dashboard.validateData = function (req, res) {
        return true;
    };

    dashboard.get = function (req, res) {
        console.log('got dash');
        var mockData =
        {
            stats: {
                total: 123456
                , count: 654456
                , lowest: 621
                , highest: 261
                , newUsers: 12

            }
            , recentEvents: [
            {createdOn: new Date()-2,createdBy:"User 1",event:"Created a new javu.io project"}
            ,{createdOn: new Date()-1,createdBy:"User 2",event:"Ran a test run"}
            ,{createdOn: new Date(),createdBy:"User 3",event:"ready to start coding"}
        ]
        };
        res.json(mockData);
    };

    return dashboard;
}
module.exports = createAPI;

