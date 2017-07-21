<!DOCTYPE html>
<html ng-app="stockify">
<head>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-route.min.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.2.3/jquery-confirm.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.2.3/jquery-confirm.min.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/manifest.json">
    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="/favicon/favicon.ico">
    <meta name="msapplication-config" content="/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <link rel="stylesheet" href="css/style.css">
    <script src="app.js"></script>
    <?php
        $dir = "controllers";
        if (is_dir($dir)){
            $dir = scandir($dir);
            foreach ($dir as $file){
                if(is_file ("controllers/".$file)) {
                    echo '<script src="controllers/' . $file . '"></script>';
                }
            }
        }
    ?>

</head>
<body ng-controller="main" ng-cloak>

<nav class="navbar navbar-static-top">
    <div class="container-fluid">
        <div class="navbar-header navbar-inverse">
            <button style="color: #444;" type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
                <li ng-class="getClass('/dashboard')"><a ng-show="userIsLoggedIn" href="/dashboard">Dashboard</a></li>
                <li ng-class="getClass('/stock-dictionary')"><a ng-show="userIsLoggedIn" href="/stock-dictionary">Stock Dictionary</a></li>
                <li ng-class="getClass('/account')"><a ng-show="userIsLoggedIn" href="/account">Account</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a ng-hide="userIsLoggedIn" ng-click="signUp()" href="#">Register</a></li>
                <li><a ng-hide="userIsLoggedIn" ng-click="authenticate()" href="#">Sign In</a></li>
                <li><a ng-show="userIsLoggedIn" ng-click="logOut()" href="#">Sign Out</a></li>
            </ul>
        </div>
    </div>
</nav>

<div ng-view></div>

</body>
</html>
