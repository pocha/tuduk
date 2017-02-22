angular.module('starter.controllers', [])

.constant("TUDUKCONSTANTS",{
  START:"Start Service",
  STOP:"Stop Service"
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('PlaylistsCtrl', function($scope,$interval,$rootScope,TUDUKCONSTANTS) {
$scope.stopGettingData = true;
$rootScope.serviceStatus = TUDUKCONSTANTS.STOP

//this is a promise object to be hold the $interval's return object.
   var stop;

 stop = $interval( function(){
 // placeholder for scanning,identifying and connecting to wifis.
  if( $rootScope.notificationState === 1){
    $scope.text = "Identified homeWifi"
    $rootScope.notificationState  = 2;
    }else if( $rootScope.notificationState === 2){
           $scope.text = "connecting to homeWifi"
           $rootScope.notificationState  = 3;
           }else if( $rootScope.notificationState === 3){
                  $scope.text = "connected to homeWifi"
                  $rootScope.notificationState =4;
                  }else{
                  $scope.stopGettingData = false;
                  $scope.stopInterval();
                  }

//setting the wifistatus
   $scope.config = { };
   $scope.config.notificationText = $scope.text

//callback methods for setConfiguration
 function handleSuccess(data) {
            //success callback post setConfiguration
            console.log(JSON.stringify(data));
        }

    function handleError(data) {
         //success callback post setConfiguration
        console.log(JSON.stringify(data));
    }
   foregroundService.setConfiguration($scope.config,
					function(r){handleSuccess(r)},
					function(e){handleError(e)});
 }, 10000);

  $scope.stopInterval = function() {
           if (angular.isDefined(stop)) {
             $interval.cancel(stop);
             stop = undefined;
           }
         };

  // callback functions for stopService
   function handleSuccess(data) {
              //success callback post setConfiguration
              console.log(JSON.stringify(data));
              if(data.ServiceRunning === true){
                console.log("data.ServiceRunning is true")
                $scope.$apply(function(){
                   $rootScope.serviceStatus = TUDUKCONSTANTS.STOP;
                })
              }else  if(data.ServiceRunning === false) {
                console.log("data.ServiceRunning is false")
                $scope.$apply(function(){
                  $rootScope.serviceStatus = TUDUKCONSTANTS.START;
                })
              }
          }

   function handleError(data) {
           //success callback post setConfiguration
          console.log(JSON.stringify(data));
   }
  $scope.stopService = function(){
  if($rootScope.serviceStatus === TUDUKCONSTANTS.STOP){
      foregroundService.stopService(function(r){handleSuccess(r)},
                                            function(e){handleError(e)});
      } else {
              foregroundService.startService(function(r){handleSuccess(r)},
                           function(e){handleError(e)});
        }
  }

})

