angular.module('stockify').controller('account', ['$scope', '$http', '$location', function($scope, $http, $location){

    $scope.user_prefs = {
        email_alerts: false,
        isCool: true,
        favorite_color: 'magenta'
    };

    $scope.setUserPrefs = function () {
        $http.post('../lib/set/setUserPrefs.php', $scope.user_prefs).then(function(response){});
    };

    $http.get('../lib/get/getUserPrefs.php').then(function(response){
        if(response.status === 200){
            if(response.data !== ''){
                let user_pref = response.data;
                if(Object.keys(user_pref).length === 0 && obj.constructor === Object){
                    $.alert('Failed to load user preferences, attempting to reset.');
                    $scope.setUserPrefs();
                }else{
                    $scope.user_prefs = user_pref;
                }
            }else{
                $.alert('Failed to load user preferences, attempting to reset.');
                $scope.setUserPrefs();
            }
        }else{
            $.alert('Failed to load user preferences, attempting to reset.');
            $scope.setUserPrefs();
        }
    });

}]);