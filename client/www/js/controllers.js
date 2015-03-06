angular.module('starter.controllers', ['starterServices', 'starterConfiguration'])
  .controller('AppCtrl',
  [
    '$scope',
    '$rootScope',
    '$ionicModal',
    '$timeout',
    '$http',
    'usersService',
    'fisiosService',
    'CONFIG',
    function(
            $scope,
            $rootScope,
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
        $http.post(CONFIG.API_END_POINT + '/token', {
          username: $scope.loginData.username,
          password: $scope.loginData.password
        })
                .success(function(data, status, headers, config) {
          console.log("todo ok");
          console.log("status: ", status);
          console.log("data: ", data);

          //Store token in rootScope global variable to use later in other controllers
          $rootScope.token = data.access_token;

          $scope.closeLogin();
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
    $scope.usersScope = usersService.query({}, function(usersList) {
      console.log(usersList);
    });
  }])

//Fisios Controller
  .controller('FisiosCtrl', ['$scope','$rootScope', '$ionicModal', '$timeout', 'fisiosService', function($scope, $rootScope, $ionicModal, $timeout, fisiosService) {  
    console.log("Dentro del controlador FisioCtrl el token es: ", $rootScope.token);
    //Since the returned value of calling the $http function is a promise, you can also use the then method to register callbacks, and these callbacks will receive a single 
    //argument – an object representing the response. See the API signature and type info below for more details. 
    var promise = fisiosService.listaFisios($rootScope.token);
    promise.then(function(data, status, headers, config) {
      //console.log("Lista Fisios: " + fisiosList);
      console.log("Lista Fisios - Data: " , data);
      console.log("Lista Fisios _ Status: " , status);
    });
    promise.error(function(data, status) {
      console.log("Error retrieving data - Status: ",status);
      console.log("Error retrieving data - Data: ",data);                      
    });


     // console.log('Voy a entrar');
     // $scope.myID = function(idFisio){
     //    console.log('dentro');
     //    console.log(idFisio);
     // }
     // console.log('Fuera');

      $scope.fisiosDescScope = fisiosService.fisio.get({id: '549a804654992f7e14000001'}, function() {
        // console.log($scope.fisiosDescScope);
        // console.log($scope);
      });
  }])


//Main Menu Controller
  .controller('mainMenuCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {

  }]);
