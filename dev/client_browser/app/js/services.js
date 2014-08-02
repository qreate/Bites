'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory('API', function ($rootScope, $http, $window) {
    var base = "http://localhost:9804";
        $rootScope.logout = function () {
            $rootScope.setToken("");
            $window.location.href = '#/auth/signin';
        };
        $rootScope.setToken = function (token) {
            return $window.localStorage.token = token;
        }

        $rootScope.getToken = function () {
            return $window.localStorage.token;
        }

        $rootScope.isSessionActive = function () {
            return $window.localStorage.token ? true : false;
        }
    return {
        signin: function (form) {
            return $http.post(base+'/api/v1/bucketList/auth/login', form);
        },
        signup: function (form) {
            //alert("hellu");
            return $http.post(base+'/api/v1/bucketList/auth/register', form);
        },
        getAll: function (email) {
            return $http.get(base+'/api/v1/bucketList/data/list', {
                method: 'GET',
                params: {
                    token: email
                }
            });
        },
        getOne: function (id, email) {
            return $http.get(base+'/api/v1/bucketList/data/item/' + id, {
                method: 'GET',
                params: {
                    token: email
                }
            });
        },
        saveItem: function (form, email) {
            return $http.post(base+'/bites', form, {
                method: 'POST',
                params: {
                    token: email
                }
            });
        },
        getBites: function (email) {
            return $http.get(base+'/bites', {
                method: 'GET',
                params: {
                    token: email
                },
                isArray:true
            });
        },
        getBite: function (biteId, email) {
            return $http.get(base+'/bites/'+biteId, {
                method: 'GET',
                params: {
                    token: email
                },
                isArray:true
            });
        },
        putItem: function (id, form, email) {
            return $http.put(base+'/api/v1/bucketList/data/item/' + id, form, {
                method: 'PUT',
                params: {
                    token: email
                }
            });
        },
        deleteItem: function (id, email) {
            return $http.delete(base+'/api/v1/bucketList/data/item/' + id, {
                method: 'DELETE',
                params: {
                    token: email
                }
            });
        }
    }
})
.factory('notify', ['$window', function() {
        var msgs = [];
        return function(msg) {
            alert(msg);
        };
 }])
.factory('bites', function($rootScope, $http, $window, $filter) {
        var base = "http://localhost:9804";
        var bites;
        var bite;
        return {
            saveItem: function (form, email) {
                return $http.post(base+'/bites', form, {
                    method: 'POST',
                    params: {
                        token: email
                    }
                });
            },
            getBites: function (email) {
                bites = $http.get(base+'/bites', {
                    method: 'GET',
                    params: {
                        token: email
                    },
                    isArray:true
                })
                .success(function (data, status, headers, config) {
                    bites = data;
                })
                .error(function (data, status, headers, config) {
                 });
                return bites;
            },
            storeBite: function (id){
                //alert(JSON.stringify(bites));
                bite = $filter('filter')(bites, {"_id":id}, true)
                //alert(JSON.stringify(bite));
                //return bite;
            },
            showBite: function (){
                //alert(bite);
                return bite;
            }
        };
        return function(msg) {
            alert(msg);
        };
});