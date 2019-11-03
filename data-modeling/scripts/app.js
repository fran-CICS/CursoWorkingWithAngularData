var classProjectApp=angular.module('classProjectApp',[
    'ngRoute',
    'js-data'
]);
classProjectApp.config(function ($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: '../views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
classProjectApp.config(function (DSProvider){
    DSProvider.defaults.basePath = '/api';
});