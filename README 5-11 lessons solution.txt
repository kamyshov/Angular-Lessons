5................////////////////////index.html


<div ng-controller="myBooksCtrl">
    <div ng-controller="angularBookCtrl">
        <button ng-click="showBook()">Show Angular Book</button>
    </div>
    <div ng-controller="emberBookCtrl">
        <button ng-click="showBook()">Show Ember Book</button>
    </div>
</div>

 
/////////////////////////////////////main.js

var app = angular.module('app',[]);

app.controller('myBooksCtrl', function($scope){
    $scope.showBook = function () {
        console.log('This is some book');
    };
});
app.controller('angularBookCtrl', function($scope){
$scope.showBook = function () {
    console.log('This is AngularJS book');
};
});
app.controller('emberBookCtrl', function($scope) {

});


6.......///////////////////////////index.html

<div ng-controller="mainCtrl as mainCtrl">
    <div ng-controller="firstCtrl as firstCtrl">
        <div ng-controller="secondCtrl as secondCtrl">
            {{secondCtrl.myLesson}}
            <button ng-click="mainCtrl.addLesson()">Add lesson</button>
    </div>
    </div>


</div>


/////////////////////////////////////main.js

var app = angular.module('app',[]);

app.controller('mainCtrl', function(){
    this.myLesson = 'MainLesson';
    this.addLesson = function () {
        console.log('Add Lesson');
    }
});
app.controller('firstCtrl', function(){
    this.myLesson = 'FirstLesson';
});
app.controller('secondCtrl', function() {
this.myLesson = 'SecondLesson';
});

7...........////////////////////////index.html

<div foo>foo</div>
<div foo>foo</div>
<div foo>foo</div>
<div foo>foo</div>
<div foo>foo</div>
<div foo>foo</div>


////////////////////////////////////main.js

var app = angular.module('app',[]);

app.directive('foo', function () {
    return {
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (element.text() === 'foo') {
                    element.text('bar');
                } else {
                    element.text('foo');
                }
            });
        }
    };
});

8............///////////////////////index.html

<div ng-controller='mainCtrl'>
    {{money1 | moneyFilter}}
    {{money2 | moneyFilter}}
    {{money3 | moneyFilter}}
</div>

/////////////////////////////////////main.js

var app = angular.module('app',[]);

app.controller('mainCtrl', function ($scope) {
    $scope.money1 = "1.22$";
    $scope.money2 = "$2.33";
    $scope.money3 = "4.33";
});
app.filter('moneyFilter', function () {
    return function (str){
     var lastChar = str.slice(-1),
         firstChar = str.slice(0,1),
         slicedPart;
     if (lastChar === '$'){
         slicedPart = str.slice(0, str.length -1);
         return '$'+slicedPart;
     } else if( firstChar === '$'){
         return str;
     } else {
         return '$' + str;
     }
};
});
9........../////////////////////////index.html

<div foo-bar>FooBar</div>
<foo-bar>FooBar</foo-bar>
<div class="foo-bar">FooBar</div>
<!-- directive: foo-bar -->

////////////////////////////////////main.js

var app = angular.module('app', []);

app.directive('fooBar', function () {
    return {
        restrict: 'EACM',
        link: function () {
            console.log('fooBar');
        }
    }
});

10................////////////////index.html

<foo-bar></foo-bar>

//////////////////////////////////main.js

var app = angular.module('app', []);

app.directive('fooBar', function () {
    var bookmarks = [
        {
            id:1,
            name: "AngularJS"
        },
        {
            id: 2,
            name: "EmberJS"
        },
        {
            id: 3,
            name: 'ReactJS'
        }
    ];
    return{
        template: "<div ng-repeat='bookmark in myBookmarks'>{{bookmark.name}} </div>",
        link: function (scope,element,attrs) {
            scope.name = "sasha";
            scope.myBookmarks = bookmarks;
            console.log('fooBar');
        }
    };
});

11............////////////////////index.html

<div ng-controller="mainCtrl">
<foo-bar>This is {{name}}</foo-bar>
</div>

//////////////////////////////////main.js

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