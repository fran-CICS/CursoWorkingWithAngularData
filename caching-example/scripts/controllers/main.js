angular.module('classProjectApp')
.run(function($http, CacheFactory){
    $http.defaults.cache=CacheFactory.createCache('httpCache',{
        maxAge: 15*60*1000,
        cacheFlushInterval: 60*60*1000,
        deleteOnExpire: 'aggressive'
    });
})
.service('MyHttpService', function($http, $q){
    return{
        getDataByQuery: function(query){
            var deferred=$q.defer();
            var start=new Date().getTime();

            $http.get('#/api/search?'+query,{
                cache: true
            }).then(function successCallback(data){
                console.log('time taken for request: ' + (new Date().getTime() - start)+'ms');
                deferred.resolve(data);
            },function errorCallback(response) {})
            return deferred.promise;
        }
    };
})
.controller('MainCtrl',function($scope, MyHttpService){
    MyHttpService.getDataByQuery('angularjs').then(function (data){
        //takes time
        return MyHttpService.getDataByQuery('angularjs').then(function(data){
            //fast
        });
    });
})
.controller('ApiSearchCtrl',function($scope, $location){
    console.log('received: ',$location.search());
});