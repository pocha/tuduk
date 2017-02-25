// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
 var foregroundService;
angular.module('starter', ['ionic', 'starter.controllers','starter-services'])
.run(function($ionicPlatform, $rootScope) {
  // this is to keep track of the status of wifi connection.
  $rootScope.notificationState = 1

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // write the list of wifis to localstorage.
    var wifiArray=["homewifi","officewifi"]
    localStorage.setItem("WIFILIST",JSON.stringify(wifiArray));

    //creating the foreground registerForBootStart
      function handleSuccess(data) {
 				console.log(JSON.stringify(data));
 			}

 			function handleError(data) {
				console.log("Error: " + data.ErrorMessage);
 				console.log(JSON.stringify(data));
                }
      foregroundService = cordova.plugins.foregroundService;
     /* foregroundService.registerForBootStart(function(r){handleSuccess(r)},
										function(e){handleError(e)});*/
      //starting the foreground service.
      foregroundService.startService(function(r){handleSuccess(r)},
										function(e){handleError(e)});

  });

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
