var classProjectApp=angular.module('classProjectApp',[
    'js-data'
]);
classProjectApp.run(function(DS,User){
    DS.registerAdapter('localstorage',DSLocalStorageAdapter,{default:true});
});
classProjectApp.factory('User',function(DS){
    return DS.defineResource('user');
});
classProjectApp.factory('Comment',function(DS){
    return DS.defineResource('Comment');
});
classProjectApp.controller('DSLocalStorageAdapterCtrl',function($scope, Comment, User){
    User.inject([{id: 1, text: 'jdoe'},{id: 2, text: 'jqpublic'}]);
    console.log(User.get(1));
    console.log(User.get(2));
    Comment.inject([{id: 1, message: 'This is comment 1.'},{id: 2, message: 'This is comment 2.'}]);
    console.log(Comment.get(1));
    console.log(Comment.get(2));
    var query={
    };
    Comment.bindAll(query, $scope, 'comments');
    this.comment1=Comment.get(1);
});