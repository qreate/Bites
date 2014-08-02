'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'facebook'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {templateUrl: 'partials/auth-signin.html', controller: 'SignInCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/auth-signup.html', controller: 'SignUpCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'authenticationCtrl'});
  $routeProvider.when('/view1', {templateUrl: 'partials/add-bite.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/list-bites.html', controller: 'MyCtrl2'});
  $routeProvider.when('/bite/:biteId', {templateUrl: 'partials/show-bite.html', controller: 'MyController'});
  //$routeProvider.otherwise({redirectTo: '/view1'});
}]).
config(['FacebookProvider', function(FacebookProvider) {
    // Here you could set your appId through the setAppId method and then initialize
    // or use the shortcut in the initialize method directly.
        var myAppId = '916383501710710';
        FacebookProvider.init(myAppId);
}]);