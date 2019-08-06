var classProjectApp=angular.module('classProjectApp',[
    'ngRoute',
    'angular-cache'
]);
classProjectApp.config(function ($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: '../views/main.html',
            controller: 'MainCtrl'
        })
        .when('/api/search',{
            templateUrl: '../views/search.html',
            controller: 'ApiSearchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});