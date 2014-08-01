'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
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
}]);

