var classProjectApp=angular.module('classProjectApp',[
    'angular-cache',
    'js-data'
]);
classProjectApp.run(function($http, CacheFactory, DS, User){
    Offline.on('confirmed-down', function(){
        console.log('confirmed-down');
    });
    Offline.on('down', function(){
        console.log('down');
    });
    Offline.on('confirmed-up', function(){
        console.log('confirmed-up');
    });
    Offline.on('up', function(){
        console.log('up');
    });
    Offline.check();
    $http.defaults.cache=CacheFactory.createCache('httpCache',{
        maxAge: 15*60*1000,
        cacheFlushInterval: 60*60*1000,
        deleteOnExpire: 'aggressive'
    });
    DS.registerAdapter('localstorage',DSLocalStorageAdapter,{default:true});
});
classProjectApp.factory('User',function(DS){
    return DS.defineResource('user');
});
classProjectApp.controller('exerciseCtrl',function(CacheFactory, User){
    var myCache;
    //if the cache factory does not exist, create it
    if(!CacheFactory.get('myCache')){
        console.log('creating cache');
        myCache=CacheFactory.createCache('myCache');
        console.log('cache created', myCache);
    }
    myCache.put('/data/8',{
        name: 'Steven Gerrard',
        skills: ['midfielder', 'captain']
    });

    myCache.put('/data/11',{
        name: 'Michael Owen',
        skills: ['forwarder', 'shooter']
    });

    var data = myCache.get('/data/8');

    console.log(data);
    console.log(data.name);
    console.log(data.skills[0]);

    //Has a lot of information about the cache
    var info = myCache.info();
    console.log("Info: ", info);
    var keys = CacheFactory.keys();
    console.log("Cache keys:", keys);

    keys = myCache.keys();
    console.log("Keys in cache:",keys);
    
    console.log("Before delete: ");
    logKeys(myCache);

    myCache.remove('/data/8');
    console.log("After single delete: ");
    logKeys(myCache);

    myCache.removeAll();
    console.log("After complete delete: ");
    logKeys(myCache);

    var myObj=window.localStorage.getItem("user");
    console.log("Read: ",myObj);

    myObj = {
        id: 1,
        firstname: data.name,
        position: data.skills[0],
        age: 30
    };

    window.localStorage.setItem("user", JSON.stringify(myObj));
    console.log("SAVED: ",myObj);
    console.log("Item of localStorage: ",window.localStorage["user"]);

    User.inject([myObj]);
    console.log(User.get(1).age);
});

function logKeys(myCache) {
    var keys = myCache.keys();
    for (var key in keys) {
        console.log('   ', keys[key], ":", myCache.get(keys[key]));
    }
}

function deleteCache(myCache, CacheFactory) {
    console.log('deleting cached');
    myCache.destroy();
    console.log('cache deleted: ', CacheFactory.get('myCache'));
}