
let app = angular.module('stockify', []);


app.controller('mainController', function($scope, $http){


    $scope.symbolList = [];

    $http.get('../lib/raw/nasdaq-symbol-list.json').then(function(response){
        if(response.status === 200){
            $scope.symbolList = response.data;
        }
    });

});
