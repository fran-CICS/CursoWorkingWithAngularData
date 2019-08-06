var classProjectApp=angular.module('classProjectApp',[
    'ngRoute',
    'angular-cache'
]);
classProjectApp.config(function ($routeProvider){
    $routeProvider
        .when('/api/search',{
            templateUrl: 'views/search.html',
            controller: 'ApiSearchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
classProjectApp.controller('ApiSearchCtrl',function($scope){});
classProjectApp.controller('classProjectController',function($scope, CacheFactory){
    var myCache;
    //if the cache factory does not exist, create it
    if(!CacheFactory.get('myCache')){
        console.log('creating cache');
        myCache=CacheFactory.createCache('myCache');
        console.log('cache created', myCache);
    }

    const data19 = '/data/19';
    myCache.put(data19,{
        name: 'Jonathan',
        skills: ['center', 'captain']
    });

    myCache.put('/data/2',{
        name: 'Duncan',
        skills: ['defense','alternate']
    });

    var data = myCache.get(data19);

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

    myCache.remove(data19);
    console.log("After single delete: ");
    logKeys(myCache);

    myCache.removeAll();
    console.log("After complete delete: ");
    logKeys(myCache);

    return new OfflineDomain();
});
classProjectApp.run(function(){
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
