/**
 * Created by Daniel on 4/14/2015.
 */
$javuApp.controller('userManagementCrl',['$scope','$http'
    ,function($scope,$http){

        $scope.criteria='';

        var fnSearch = function (criteria) {
            $http.get('/api/users/search', {params: {criteria: criteria, pageIndex: 0, pageSize: 20}}
            ).success(function (users) {
                    $scope.users = users;

                });
        };
        fnSearch('');
        var tmr;
        $scope.$watch('criteria', function(newValue) {
            if(tmr) clearTimeout(tmr);
            tmr=setTimeout(function(){fnSearch(newValue);},1000);
        });


    }]);