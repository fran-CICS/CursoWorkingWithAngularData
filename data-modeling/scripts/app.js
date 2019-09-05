var classProjectApp=angular.module('classProjectApp',[
    'ngRoute',
    'angular-cache',
    'js-data'
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
classProjectApp.config(function (DSProvider){
    DSProvider.defaults.basePath = '/api';
});