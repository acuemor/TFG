angular.module('starter.controllers', ['starterServices', 'starterConfiguration'])
        .controller('AppCtrl',
        [
          '$scope',
          '$ionicModal',
          '$timeout',
          '$http',
          'usersService',
          'fisiosService',
          'CONFIG',
          function(
                  $scope,
                  $ionicModal,
                  $timeout,
                  $http,
                  usersService,
                  fisiosService,
                  CONFIG) {
            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
              scope: $scope
            }).then(function(modal) {
              $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function() {
              $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function() {
              $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function() {
              console.log('Doing login', $scope.loginData);

              // Login Code
              console.log('User: ', $scope.loginData.username);
              console.log('Password: ', $scope.loginData.password);

              //Enviamos los datos al servidor mediante $http
              $http.post(CONFIG.API_END_POINT + '/login', {
                username: $scope.loginData.username,
                password: $scope.loginData.password
              })
                      .success(function(data, status, headers, config) {
                console.log("todo ok");
                console.log("status: ", status);
              })
                      .error(function(data, status, headers, config) {
                console.log("Todo mal");
                console.log(data);
                console.log("status: ", status);
              });



            };
          }])

        .controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    {title: 'Reggae', id: 1},
    {title: 'Chill', id: 2},
    {title: 'Dubstep', id: 3},
    {title: 'Indie', id: 4},
    {title: 'Rap', id: 5},
    {title: 'Cowbell', id: 6}
  ];
})

//Users Controller
        .controller('UsersCtrl', ['$scope', '$ionicModal', '$timeout', 'usersService', function($scope, $ionicModal, $timeout, usersService) {
    $scope.usersScope = usersService.getAll({}, function(usersList) {
      console.log(usersList);
    });
  }])

//Fisios Controller
        .controller('FisiosCtrl', ['$scope', '$ionicModal', '$timeout', 'fisiosService', function($scope, $ionicModal, $timeout, fisiosService) {
    $scope.fisiosScope = fisiosService.getAll({}, function(fisiosList) {
      console.log(fisiosList);
    });
  }])

//Main Menu Controller
        .controller('mainMenuCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {

  }])

        .controller('PlaylistCtrl', function($scope, $stateParams) {
});
