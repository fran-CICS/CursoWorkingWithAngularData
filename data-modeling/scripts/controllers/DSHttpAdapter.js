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
        var headers=new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        return DSHttpAdapter.POST('http://www.mocky.io/v2/5df7729432000011002dffa3',headers,{
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
    User.setCount().then(function(result){
        console.log("POST RESULT: ",result);
        console.log("POST RESULT: ",result.data);
        console.log("POST RESULT Content: ",result.data.content);
    })
});