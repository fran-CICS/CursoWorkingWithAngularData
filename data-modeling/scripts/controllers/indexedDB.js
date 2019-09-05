const classProjectAppModule = angular.module('classProjectApp');
classProjectAppModule
.controller('InDBSaveCtrl',function($scope){
    var db;
    var firstTime=false;

    var request = openTestDatabase();

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
classProjectAppModule.controller('InDBRetrieveCtrl',function($scope){
    var db;

    var request = openTestDatabase();
    request.onsuccess = function(event){
        console.log('in onsucess');
        db=event.target.result;
        var transaction=db.transaction(['customers'], 'readwrite');
        var objectStore = transaction.objectStore('customers');

        console.log('getting all data...');
        var cursor=objectStore.openCursor();

        cursor.onsuccess=function(e){
            var res=e.target.result;
            if(res){
                console.log('Res',res);
                res.continue();
            }
        };

        console.log('getting one record...');
        var getRequest=objectStore.get(1);
        getRequest.onsuccess=function(e){
            console.log('customer data read:', e.target.result);
        };

    };
});

function openTestDatabase() {
    var request = window.indexedDB.open('TestDatabase', 1);
    request.onerror = function (event) {
        console.log('Database error:' + event.target.errorCode);
    };
    return request;
}

