
let app = angular.module('stockify', []);


app.controller('mainController', function($scope, $http){


    $scope.symbolList = [];

    $http.get('../lib/get/getSymbolList.php')
        .then(function (response) {

            $scope.symbolList = response.data;

            for(let i = 0; i < $scope.symbolList.length; i++){
                $http.get('../lib/get/getStockData.php?symbol='+$scope.symbolList[i][0])
                    .then(function (response) {

                        if(response.status !== 200){
                            $scope.symbolList.splice(i);
                        }else{
                            let price = response.data[$scope.symbolList[i][0]]['price'].replace(',','');
                            $scope.symbolList[i].push(parseFloat(price));
                        }

                    });
            }


        });



});
