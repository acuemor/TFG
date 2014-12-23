'use strict';

//Desde aquí llamo a los métodos CRUD de mi RestService

angular.module('starterServices', ['ngResource'])

.factory('usersService',['$resource',function($resource){
	return $resource('http://localhost:8080/api/users',{},{
		getAll:{method:'GET', isArray:true}
	});
}])

.factory('fisiosService',['$resource',function($resource){
	return $resource('http://localhost:8080/api/fisios',{},{
		getAll:{method:'GET', isArray:true}
	});
}]);