angular.module('classProjectApp')
.controller('RetrCtrl',function($scope, localStorageService){

    var myObj=window.localStorage.getItem("saved");
    console.log("Read: ",myObj);

    localStorageService.set('myKey','hello, world!');
    console.log('Read: ',localStorageService.get('myKey'));
});