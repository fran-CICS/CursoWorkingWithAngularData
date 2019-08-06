angular.module('classProjectApp')
.controller('InDBSaveCtrl',function($scope){
    var db;
    var firstTime=false;

    var request = window.indexedDB.open('TestDatabase', 1);

    request.onerror=function(event){
        console.log('Database error:'+event.target.errorCode);
    };

    request.onupgradeneeded=function(event){
        console.log('in onupgradeneeded');
        firstTime=true;
        var store=event.currentTarget.result.createObjectStore('customers',{keyPath: 'id', autoIncrement:true});
        store.createIndex('lastname','lastname',{unique:true});
    };


    request.onsuccess = function(event){
        console.log('in onsuccess');
        if(!firstTime){
            db=event.target.result;
            var transaction=db.transaction(['customers'],'readwrite');
            var objectStore=transaction.objectStore('customers');

            objectStore.add({firstname: 'John', lastname: 'Doe', age: 29});
            console.log('customer data written');
        }
    };
});