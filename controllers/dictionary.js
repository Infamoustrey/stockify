angular.module('stockify').controller('dictionary', ['$scope', '$http', '$q', function($scope, $http, $q){


    $scope.symbolList = [];
    $scope.resultLimit = 10;
    $scope.resultPage = 1;
    $scope.pageCount = 1;
    $scope.paginator = [];
    $scope.searchTerm = '';


    $scope.showStockFocus = function (symbol, stockData) {

        let stock = stockData[symbol];
        let textColor = '';
        if(stock.change.indexOf('-') > 1) {textColor='danger'}else{textColor='success'}

        let html_title = '<h3>'+ symbol + ' - ' + stock.name + ' <span class="text-' + textColor +'">' + stock.change + '</span></h3>';
        let html_body = '<table class="table table-bordered table-striped">';

        for(let propName in stock){
            if(stock.hasOwnProperty(propName)) {
                html_body +=
                    '<tr>' +
                    '<td>' + propName.replaceAll('_',' ').toProperCase() + '</td>' +
                    '<td>' + stock[propName] + '</td>' +
                    '</tr>';
            }
        }



        $.alert({
            title: html_title,
            content: html_body,
            backgroundDismiss: true
        });
    };

    /*
     Yahoo Stock Dataset Reference
     {
     AAXN:{
     price:"25.00",
     change:"-0.09",
     volume:"83092",
     avg_daily_volume:"935250",
     stock_exchange:"NMS",
     market_cap:"1.32B",
     book_value:"0.00",
     ebitda:"0.00",
     dividend_per_share:"N/A",
     dividend_yield:"N/A",
     earnings_per_share:"0.35",
     fiftytwo_week_high:"30.15",
     fiftytwo_week_low:"21.18",
     fiftyday_moving_avg:"25.01",
     twohundredday_moving_avg:"24.47",
     price_earnings_ratio:"71.43",
     price_earnings_growth_ratio:"0.00",
     price_sales_ratio:"N/A",
     price_book_ratio:"N/A",
     short_ratio:"0.00",
     name:"Axon Enterprise, Inc.",
     symbol:"AAXN"
     }
     }

     */

    $scope.setResultLimit = function (newLimit) {
        $scope.resultLimit = newLimit;
        $scope.reloadStockData();
    };

    $scope.setActivePage = function (newPageNumber) {

        let newIndex = newPageNumber-1;

        $scope.paginator[$scope.activePage()-1].active = '';
        $scope.paginator[newIndex].active = 'active';
        $scope.reloadStockData();
    };

    $scope.reloadStockData = function () {

        $q(function (resolve, reject) {
            $http.get('../lib/get/getStockData.php?p='+$scope.activePage()+'&l='+$scope.resultLimit+'&s='+$scope.searchTerm).then(function(response){
                if(response.status === 200){
                    $scope.symbolList = response.data;
                    for(let i = 0; i < $scope.symbolList.length; i++){
                        $scope.symbolList[i][2] = JSON.parse($scope.symbolList[i][2]);
                    }
                    resolve();
                }else{}
            });
        });

    };

    $scope.activePage = function(){
        let index = 0;
        for(let i = 0; i < $scope.paginator.length; i++){
            if($scope.paginator[i].active ==='active'){index=i;}
        }
        return index+1;
    };

    $scope.paginatorRange = function (page) {
        let active = $scope.activePage();
        let max = active + 5;
        let min = active - 5;

        if(active > 5){
            return page.pageNumber > min && page.pageNumber < max;
        }else{
            return page.pageNumber < 10;
        }


    };

    $http.get('../lib/get/getStockData.php?p='+$scope.resultPage+'&l='+$scope.resultLimit+'&s='+$scope.searchTerm).then(function(response){
        if(response.status === 200){
            $scope.symbolList = response.data;
            for(let i = 0; i < $scope.symbolList.length; i++){
                $scope.symbolList[i][2] = JSON.parse($scope.symbolList[i][2]);
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

        $scope.paginator[0] = {pageNumber: 1, active: 'active'};

    });


}]);