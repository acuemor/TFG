'use strict';

angular.module('starterServices', ['ngResource'])

.factory('loginService',['$resource',function($resource){
	return $resource('http://localhost:8080/api/loginCredentials',{},{
		getAll:{method:'GET', isArray:true}
	});
}]);