var classProjectApp=angular.module('classProjectApp',[
    'ngRoute',
    'angular-cache',
    'js-data'
]);
classProjectApp.factory('User',function(DS, DSHttpAdapter){
    var User = DS.defineResource({
        name: 'user',
    });

    User.getCount = function (params){
        return DSHttpAdapter.GET('http://localhost:9000/userCount',{
            params: params || {}
        });
    };
    User.setCount = function(params){
        return DSHttpAdapter.POST('http://localhost:9000/setCount',{
            params: params || {}
        });
    };
    return User;
});
classProjectApp.controller('DSHttpAdapterCtrl',function($scope, User){

    User.getCount().then(function(result){
        console.log("GET RESULT: ",result);
        console.log("GET RESULT: ",result.data);
    })
    User.setCount('http://localhost:9000/setCount').then(function(result){
        console.log("POST RESULT: ",result);
        console.log("POST RESULT: ",result.data);
    })
});