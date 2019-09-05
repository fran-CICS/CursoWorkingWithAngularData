var classProjectApp=angular.module('classProjectApp',[
    'ngRoute',
    'angular-cache',
    'js-data'
]);
classProjectApp.run(function (DS){
    //DS is the result of 'new JSData.DS()'

    //to work with user:
    //DS.<method>('user',...)

    DS.defineResource('user');
})
classProjectApp.factory('Comment', function (DS){
    //to work with comment, inject Comment
    return DS.defineResource('comment');
})
classProjectApp.controller('MainCtrl',function($scope, DS, Comment){
    //undefined
    console.log(Comment.get(1));

    Comment.inject({id:1,text:'hello, world!'});

    //the object
    console.log(Comment.get(1));

    //inject multiple records
    DS.inject('user',[{id:1,text:'jdoe'},{id:2,text:'jqpublic'}]);
    console.log(DS.get('user',1));
    console.log(DS.get('user',2));
    
    //filter
    console.log(DS.filter('user'));

    var params = {
        text: 'jdoe'
    };

    //filter with params
    console.log(DS.filter('user',params));
});
classProjectApp.config(function (DSProvider){
    DSProvider.defaults.basePath = '/api';
});