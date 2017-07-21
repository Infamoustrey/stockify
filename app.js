
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.split(search).join(replacement);
};

let stockify = angular.module('stockify', ["ngRoute"]);

stockify.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/',{
        templateUrl: 'view/main.html',
        controller: 'main'
    })
    .when('/dashboard',{
        templateUrl: 'view/dashboard.html',
        controller: 'dashboard'
    })
    .when('/stock-dictionary',{
        templateUrl: 'view/stock-dictionary.html',
        controller: 'dictionary'
    })
    .when('/account',{
        templateUrl: 'view/account.html',
        controller: 'account'
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
});
