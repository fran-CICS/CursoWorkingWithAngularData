angular.module('classProjectApp')
.controller('MainCtrl',function($scope, localStorageService){
    //check to see if IndexedDB is supported
    window.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;
    if(window.indexedDB){
        console.log("Your browser DOES support IndexedDB");
    } else {
        console.log("Your browser doesn't support a stable version of IndexedDB");
    }

    var myObj = {
        firstname: "John",
        lastname: "Doe",
        website: "http://www.example.com"
    };

    window.localStorage.setItem("saved", JSON.stringify(myObj));
    console.log("SAVED: ",myObj);
    console.log("Item of localStorage: ",window.localStorage["saved"]);

    localStorageService.set('myKey','hello, world!');
    console.log('value of myKey: ',localStorageService.get('myKey'));
    localStorageService.remove('myKey');
    console.log('value of myKey after removing: ',localStorageService.get('myKey'));
    localStorageService.clearAll();
})
.controller('ApiSearchCtrl',function($scope, $location){
    console.log('received: ',$location.search());
});