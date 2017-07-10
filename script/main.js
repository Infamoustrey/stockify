
let app = angular.module('stockify', []);


app.controller('mainController', function($scope, $http){


    $scope.symbolList = [];
    $scope.resultLimit = 10;
    $scope.resultPage = 1;
    $scope.pageCount = 1;
    $scope.paginator = [];

    $scope.setResultLimit = function (newLimit) {
        $scope.resultLimit = newLimit;
        $scope.reloadStockData();
    };

    $scope.setActivePage = function (newPageNumber) {

        let newIndex = newPageNumber--;

        $scope.paginator[$scope.activePage()].active = '';
        $scope.paginator[newIndex].active = 'active';
        $scope.reloadStockData();
    };

    $scope.reloadStockData = function () {
        $http.get('../lib/get/getStockData.php?p='+$scope.activePage()+'&l='+$scope.resultLimit).then(function(response){
            if(response.status === 200){
                $scope.symbolList = response.data;

                for(let i = 0; i < $scope.symbolList.length; i ++){

                }
            }
        });
    };

    $scope.activePage = function(){
        let index = 0;
        for(let i = 0; i < $scope.paginator.length; i++){
            if($scope.paginator[i].active ==='active'){index=i;}
        }
        return index;
    };

    $scope.paginatorRange = function (page) {
        let active = $scope.activePage();
        let max = active + 5;
        let min = active - 5;

        if(active > 5){
            return page.pageNumber > min && page.pageNumber < max;
        }else{
            return page.pageNumber < 10
        }


    };

    $http.get('../lib/get/getStockData.php?p='+$scope.resultPage+'&l='+$scope.resultLimit).then(function(response){
        if(response.status === 200){
            $scope.symbolList = response.data;

            for(let i = 0; i < $scope.symbolList.length; i ++){

            }
        }
    });

    $http.get('../lib/get/getNumberOfStocks.php').then(function(response){
        if(response.status === 200){
            let rows = response.data;
            $scope.pageCount = (rows / $scope.resultLimit).toFixed(0)+1;
        }

        for(let i = 0; i < $scope.pageCount; i++){
            $scope.paginator.push({
                pageNumber: i+1,
                active: ''
            });
        }

        $scope.paginator[0] = {pageNumber: 1,
            active: 'active'}

    });

});
