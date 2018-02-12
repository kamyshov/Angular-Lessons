var app = angular.module('app', []);

app.controller('mainCtrl', function ($scope)
{
    $scope.name = 'Bob';
});
app.directive('fooBar', function () {
    return {
        restrict: 'E',
        transclude: true,
        template: 'This is my',
        link: function (scope, element, attrs, ctrl, transclude) {
            console.log('this is my');
            transclude(scope, function (clone, scope) {
                console.log('!', clone, scope);
                element.append(clone);
            });
        }
}
});