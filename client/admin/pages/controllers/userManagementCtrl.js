/**
 * Created by Daniel on 4/14/2015.
 */
$javuApp.controller('userManagementCrl',['$scope','$http'
    ,function($scope,$http){

        $scope.criteria='';

        $scope.currentPage=0;
        var fnSearch = function (criteria,pageIndex) {

            var pageSize = 20;
            $scope.currentPage=pageIndex;
            $http.get('/api/users/search', {params: {criteria: criteria, pageIndex: pageIndex, pageSize: pageSize}}
            ).success(function (results) {
                    $scope.showPrevious = pageIndex > 0;
                    $scope.showNext = results.hasMorePages;
                    $scope.users = results.users;
                });
        };
        fnSearch('',$scope.currentPage);


        var tmr;
        $scope.$watch('criteria', function(newValue, oldValue) {
            if(newValue == oldValue) return;
            if(tmr) clearTimeout(tmr);
            tmr=setTimeout(function(){fnSearch(newValue,0);},1000);
        });

        $scope.next= function() {
            fnSearch($scope.criteria,$scope.currentPage+1);
        };

        $scope.previous= function() {
            fnSearch($scope.criteria,$scope.currentPage-1);
        };

    }]);