var sampleApp = angular.module('myapp', ["ngRoute"]);

sampleApp.controller('gitHubDataController', ['$scope','$http','$location', function($scope,$http,$location) {
     
        $scope.reposLoaded = false;
        $scope.userLoaded = false;
        $scope.username = "harshalc09";

        $scope.predicate = '-updated_at';
        $scope.apiSearch = function() {
            $http.get("http://api.github.com/search/users?q=" + $scope.search)
                .success(function (data) {
                     $scope.searchData =  $scope.search;
                     $scope.userData = data;
                    console.log($scope.userData);
                });
        }
        $scope.auth = function(userLogin){
            $location.url('/userProfile');
            console.log(userLogin);
            $http.get("https://api.github.com/users/"+ userLogin+"/repos" )
                .success(function (data) {
                    $scope.userRepo = data;
                    console.log($scope.userRepo);
                });
        };

    }]);
sampleApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'templates/users.html'

                }).when('/userProfile', {
                    templateUrl: 'templates/userProfile.html'
                }).
                otherwise({
                    redirectTo: 'templates/users.html'
                });
        }]);

