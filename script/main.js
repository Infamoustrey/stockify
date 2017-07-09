
let app = angular.module('stockify', [])


app.controller('mainController', function($scope, $http){

    $scope.apiToken = 'DgK-8BkzVbz1XAZzsmfFiw';

    $scope.companyRefArray = [];

    $http.jsonp('https://api.usfundamentals.com/v1/companies/xbrl?format=json&token=' + $scope.apiToken).then(function (response) {
        $scope.companyRefArray = response.data;
    });


});
