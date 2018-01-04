
(function() {
	var app = angular.module('nav-directives', []);

	app.directive('navBar', function() {
		return {
			restrict:'E',
			templateUrl: '/views/nav-bar.html'
		};
	});

	app.directive('jumbotron', function() {
		return {
			restrict: 'E',
			templateUrl: '/views/jumbotron.html'
			};
	});

	app.directive('projects', function() {
		return {
			restrict: 'E',
			templateUrl: '/views/projects.html'
		};
	});

	app.directive('about', function() {
		return {
			restrict: 'E',
			templateUrl: '/views/about.html'
		};
	});

})();