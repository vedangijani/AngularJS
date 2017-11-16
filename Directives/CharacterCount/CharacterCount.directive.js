(function () {
    angular.module('app').directive('characterCount', [ '$compile',characterCount]);
    function characterCount($compile) {

        var link = function (scope, element, attrs, ngModelCtrl) {
            
            scope.max = new Number(attrs['max']);
            if (isNaN(scope.max))
                scope.max = 5000;
            scope.remainingChars = scope.max;

            compile();
            ngModelCtrl.$parsers.push(CountCharacter);

            function compile() {
                var tpl = "<span>{{remainingChars}} out of {{max}} remaining </span>";
                var el = angular.element(tpl);
                var compiled = $compile(el);
                element.after(el);
                compiled(scope);
            }

            function CountCharacter(input) {
                if (input.length >= scope.max)
                    input = input.substr(0, scope.max);

                scope.remainingChars = scope.max - (input.length);
                ngModelCtrl.$setViewValue(input);
                ngModelCtrl.$render();
                return input;
            }
        
        }
      
        return {
            restrict: 'A',
            require:'ngModel',
            scope: false,
            link:link
        };
    }
})();