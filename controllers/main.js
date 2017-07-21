angular.module('stockify').controller('main', ['$scope', '$http', '$location', '$q', function($scope, $http, $location, $q){



    $http({
        method: 'get',
        url: '../lib/account/isLoggedIn.php'
    }).then(function success(response){
        if(response.data === 'true'){
            $scope.userIsLoggedIn = true;
        }else {
            $scope.userIsLoggedIn = false;
            $location.path('/');
        }

    }, function failure(response) {
        $scope.userIsLoggedIn = false;
        $location.path('/');
        console.log('');
    });

    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            if (path == "/" && $location.path() == "/") {
                return "active";
            } else if (path == "/") {
                return "";
            }
            return "active";
        } else {
            return "";
        }
    };

    $scope.userIsLoggedIn = false;

    $scope.logOut = function(){
        $http({
            method: 'POST',
            url: '../lib/account/logout.php'
        }).then(function success(response){
            $scope.userIsLoggedIn = false;
            $location.path('/');
            $.alert({
                content: response.data,
                title: 'Logging Off',
                theme: 'modern',
                type: 'red',
                backgroundDismiss: true
            });
        }, function failure(response) {
            $.alert({
                content: response.data,
                title: 'Failure!',
                theme: 'modern',
                type: 'red',
                backgroundDismiss: true
            });
        });

    };

    $scope.authenticate = function(){

        $.confirm({
            title: 'Login!',
            theme: 'modern',
            type: 'blue',
            backgroundDismiss: true,
            content: 'url:view/templates/login.html',
            onContentReady: function () {
                $("#password").keydown(function (e) {
                    if(e.which === 13) {
                        $(".jconfirm-buttons button:first-child").click();
                    }
                });
            },
            buttons: {
                submit: {
                    text: 'Submit',
                    action: function() {
                        $http({
                            method: 'POST',
                            url: '../lib/account/authenticate.php',
                            data: $.param({
                                email: $("#email").val(),
                                password: $("#password").val()
                            }),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function success(response){
                            $scope.userIsLoggedIn = true;
                            $location.path('/dashboard');
                        }, function failure(response) {
                            $.alert({
                                content: response.data,
                                title: 'Failure!',
                                theme: 'modern',
                                type: 'red',
                                backgroundDismiss: true
                            });
                        });
                    }

                },
                cancel: function () {

                },
            }
        });

    };

    $scope.signUp = function () {
        $.confirm({
            title: 'Login!',
            theme: 'modern',
            type: 'blue',
            backgroundDismiss: true,
            content: 'url:view/templates/signup.html',
            onContentReady: function () {
                $("#password").keydown(function (e) {
                    if(e.which === 13) {
                        $(".jconfirm-buttons button:first-child").click();
                    }
                });
            },
            buttons: {
                submit: {
                    text: 'Submit',
                    action: function() {
                        $http({
                            method: 'POST',
                            url: '../lib/account/create.php',
                            data: $.param({
                                email: $("#email").val(),
                                username: $("#username").val(),
                                password: $("#password").val()
                            }),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function success(response){
                            $.alert({
                                content: response.data,
                                title: 'Success!',
                                theme: 'modern',
                                type: 'green',
                                backgroundDismiss: true
                            });
                        }, function failure(response) {
                            $.alert({
                                content: response.data,
                                title: 'Failure!',
                                theme: 'modern',
                                type: 'red',
                                backgroundDismiss: true
                            });
                        });
                    }

                },
                cancel: function () {

                },
            }
        });
    }

}]);