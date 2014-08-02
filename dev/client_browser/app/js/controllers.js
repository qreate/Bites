'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
    .controller('SignInCtrl', function ($rootScope, $scope, API, $window) {
        // if the user is already logged in, take him to his bucketlist
        if ($rootScope.isSessionActive()) {
            //$window.location.href = ('#/bucket/list');
        }

        $scope.user = {
            email: "",
            password: ""
        };

        $scope.validateUser = function () {
            var email = this.user.email;
            var password = this.user.password;
            if(!email || !password) {
                //$rootScope.notify("Please enter valid credentials");
                return false;
            }
            //$rootScope.show('Please wait.. Authenticating');
            API.signin({
                email: email,
                password: password
            }).success(function (data) {
                $rootScope.setToken(email); // create a session kind of thing on the client side
                //$rootScope.hide();
                alert("logged in")
                //$window.location.href = ('#/bucket/list');
            }).error(function (error) {
                //$rootScope.hide();
                alert("invalid");
                //$rootScope.notify("Invalid Username or password");
            });
        }

    })

    .controller('SignUpCtrl', function ($rootScope, $scope, API, $window) {
        $scope.user = {
            email: "",
            password: "",
            name: ""
        };

        $scope.createUser = function () {
            var email = this.user.email;
            var password = this.user.password;
            var uName = this.user.name;
            if(!email || !password || !uName) {
                //$rootScope.notify("Please enter valid data");
                alert('hooo');
                return false;
            }
            //$rootScope.show('Please wait.. Registering');
            API.signup({
                email: email,
                password: password,
                name: uName
            }).success(function (data) {
                $rootScope.setToken(email); // create a session kind of thing on the client side
                //$rootScope.hide();
                alert('success');
                //$window.location.href = ('#/bucket/list');
            }).error(function (error) {
                //$rootScope.hide();
                if(error.error && error.error.code == 11000)
                {
                    alert('hooo1');
                    //$rootScope.notify("A user with this email already exists");
                }
                else
                {
                    alert('hoo2');
                    //$rootScope.notify("Oops something went wrong, Please try again!");
                }

            });
        }
    })
  .controller('MyCtrl1', ['$scope','API', function($scope, API, $timeout, $window, bite, ingredients, measures, save) {
        $scope.bite ={};
        $scope.bite.ingredients = [];
        $scope.biteName = "";
        $scope.biteInstructions = "";
        $scope.addIngredient = function(){
            $scope.bite.ingredients.push({
                name:$scope.ingredientName,
                amount:$scope.ingredientAmount,
                measure:$scope.ingredientMeasure
            });
            $scope.ingredientName = "";
            $scope.ingredientAmount = "";
            $scope.ingredientMeasure = "";

        };

        $scope.measures = [{
            name:"dl"
        },{
            name:"l"
        },{
            name:"tsk"
        },{
            name:"msk"
        }];

        $scope.save = function(){
            $scope.bite.name = $scope.biteName;
            $scope.bite.instructions = $scope.biteInstructions;

            var form = {
                bite:$scope.bite
            };

            API.saveItem(form, form.user)
                .success(function (data, status, headers, config) {
                    //$rootScope.hide();
                    //$rootScope.doRefresh(1);
                })
                .error(function (data, status, headers, config) {
                    //$rootScope.hide();
                    //$rootScope.notify("Oops something went wrong!! Please try again later");
                });
            //alert("okay");
        }

  }])
  .controller('NavCtrl1', ['$scope', function($scope, navigation) {
        $scope.navigation = [{
            name:"Login",
            hash:"login"
        },{
            name:"Sign up",
            hash:"signup"
        },{
            name:"Sign in",
            hash:"signin"
        },{
            name:"Add Bite",
            hash:"view1"
        },{
            name:"List Bites",
            hash:"view2"
        }];

  }])
  .controller('MyCtrl2', ['$scope','bites', function($scope, bites) {
        /*$scope.bites = [
            {name:"hej"},
            {name:"hej1"},
            {name:"hej2"}
        ];*/
        //$scope.bites = [{"_id":"53d9481c5c4164065122e033","bite":{"name":"ertrtret"}},{"_id":"53d9485a5c4164065122e034","bite":{"ingredients":[{"name":"sadasd","amount":"2","measure":"dl"},{"name":"gsdgsdg","amount":"2","measure":"l"}],"name":"asdasdasd","instructions":"fdsg dfsgdfg sdfgdfsg"}}];
        //$scope.bites =
        bites.getBites()
            .success(function (data, status, headers, config) {
                //alert(data);
                //alert(JSON.stringify(data));
                $scope.bites = data;
                //$rootScope.hide();
                //$rootScope.doRefresh(1);
            })
            .error(function (data, status, headers, config) {
                //$rootScope.hide();
                //$rootScope.notify("Oops something went wrong!! Please try again later");
            });
        //var temp = bites.getBites();
        //alert(JSON.stringify(temp));
        //alert(JSON.stringify(API.getBites()));
        $scope.showBite = function(id) {
            //alert('hello');
            bites.storeBite(id);
        };
  }])
  .controller('MyCtrl3', ['$scope','API', function($scope, API) {
    /*$scope.bites = [
     {name:"hej"},
     {name:"hej1"},
     {name:"hej2"}
     ];*/
    //$scope.bites = [{"_id":"53d9481c5c4164065122e033","bite":{"name":"ertrtret"}},{"_id":"53d9485a5c4164065122e034","bite":{"ingredients":[{"name":"sadasd","amount":"2","measure":"dl"},{"name":"gsdgsdg","amount":"2","measure":"l"}],"name":"asdasdasd","instructions":"fdsg dfsgdfg sdfgdfsg"}}];
    //$scope.bites =
    API.getBites()
        .success(function (data, status, headers, config) {
            //var index = data[_id].indexOf(biteId);
            //alert(data);
            //alert(JSON.stringify(data));
            $scope.bites = data[2];
            //$rootScope.hide();
            //$rootScope.doRefresh(1);
        })
        .error(function (data, status, headers, config) {
            //$rootScope.hide();
            //$rootScope.notify("Oops something went wrong!! Please try again later");
        });
    //alert(JSON.stringify(API.getBites()));

  }])
  .controller('MyController', ['$scope','bites', function ($scope, bites) {
        var bite = bites.showBite();
        //alert(JSON.stringify(bites.showBite()))
        $scope.bites = bite[0];
  }])
  .controller('authenticationCtrl', ['$scope','$timeout','Facebook', function($scope, $timeout, Facebook) {

            // Define user empty data :/
            $scope.user = {};

            // Defining user logged status
            $scope.logged = false;

            // And some fancy flags to display messages upon user status change
            $scope.byebye = false;
            $scope.salutation = false;

            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
            $scope.$watch(
                function() {
                    return Facebook.isReady();
                },
                function(newVal) {
                    if (newVal)
                        $scope.facebookReady = true;
                }
            );

            /**
             * IntentLogin
             */
            $scope.IntentLogin = function() {
                Facebook.getLoginStatus(function(response) {
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }
                    else
                        alert("ok3");
                        $scope.login();
                });
            };

            /**
             * Login
             */
            $scope.login = function() {
                Facebook.login(function(response) {
                    if (response.status == 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }

                });
            };

            /**
             * me
             */
            $scope.me = function() {
                Facebook.api('/me', function(response) {
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    $scope.$apply(function() {
                        $scope.user = response;
                    });

                });
            };

            /**
             * Logout
             */
            $scope.logout = function() {
                Facebook.logout(function() {
                    $scope.$apply(function() {
                        $scope.user   = {};
                        $scope.logged = false;
                    });
                });
            }

            /**
             * Taking approach of Events :D
             */
            $scope.$on('Facebook:statusChange', function(ev, data) {
                console.log('Status: ', data);
                if (data.status == 'connected') {
                    $scope.$apply(function() {
                        $scope.salutation = true;
                        $scope.byebye     = false;
                    });
                } else {
                    $scope.$apply(function() {
                        $scope.salutation = false;
                        $scope.byebye     = true;

                        // Dismiss byebye message after two seconds
                        $timeout(function() {
                            $scope.byebye = false;
                        }, 2000)
                    });
                }


            });


        }
    ])

/**
 * Just for debugging purposes.
 * Shows objects in a pretty way
 */
    .directive('debug', function() {
        return {
            restrict:	'E',
            scope: {
                expression: '=val'
            },
            template:	'<pre>{{debug(expression)}}</pre>',
            link:	function(scope) {
                // pretty-prints
                scope.debug = function(exp) {
                    return angular.toJson(exp, true);
                };
            }
        }
    });

