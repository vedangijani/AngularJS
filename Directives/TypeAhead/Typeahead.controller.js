angular.module('app').controller("TypeaheadCtl",['$scope',function($scope){
    $scope.items=['apple','atlas','orange','okra','banana','spinach'];
    $scope.OnSelect = function(){
        //console.log($scope.item);
    }
  
}]);
