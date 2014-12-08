angular.module('starter.controllers', ['starterServices'])

.controller('AppCtrl', ['$scope','$ionicModal','$timeout','$http', 'loginService',function($scope, $ionicModal, $timeout, $http, loginService) {
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
    $http.post('http://localhost:8100/#/app/login', {
      username : $scope.loginData.username,
      password : $scope.loginData.password
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
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('LoginCredentialsCtrl', ['$scope','$ionicModal','$timeout','loginService',function($scope, $ionicModal, $timeout, loginService) {
  $scope.credentials = loginService.getAll({},function(loginCredentialList){
    console.log(loginCredentialList);
  });
}])

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
