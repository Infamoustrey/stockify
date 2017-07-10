
let app = angular.module('stockify', []);


app.controller('mainController', function($scope, $http){

    $scope.apiToken = 'RZ3ELFEXTWKFV3K4';
    $scope.companyRefArray = [];

    $scope.symbol = "MSFT";
    $scope.getLastClose = 0.00;

    $scope.lastRefreshed = Date.now();

    $http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+$scope.symbol+'&apikey=' + $scope.apiToken)
        .then(function (response) {
        $scope.getLastClose = response.data["Time Series (Daily)"]["2017-07-07"]["4. close"];
    });

    $scope.$watch('symbol', function (symbol) {
        $http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+symbol+'&apikey=' + $scope.apiToken)
            .then(function (response) {
                $scope.getLastClose = response.data["Time Series (Daily)"]["2017-07-07"]["4. close"];
            })
    });




});
