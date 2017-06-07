angular.module('searchGrid', []).directive('search', function () {

    return {

        // Restrict to elements and attributes
        restrict: 'EA',
        require: '?^parent',
        // Assign the angular scope attribute formatting
        scope: false,
        replace: false,
        // Assign the angular directive template HTML
        template: '<div>111</div>',

        // Link the directive to enable our scope watch values
        link: function (scope, element, attrs, controller) {
         
            var array = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
            scope.arrayAll = array;
            controller.fenye(array, controller.initPage);
           
        }
    };


});