(function()
{
    
    /*directive*/
    angular.module("app").directive("pagination",function(){
        
        var link = function(scope, elem, attrs, ngModelCtl){
            
            //model to view
            ngModelCtl.$formatters.push(function(modelValue){      
                scope.currentPageIndex = modelValue;
                return modelValue;
            });
            
           
            //viewValue to model
            ngModelCtl.$parsers.push(function(viewValue){
               return viewValue; 
            });
            
            scope.$watch("currentPageIndex", function(value){
                ngModelCtl.$setViewValue(value); 
                ngModelCtl.$render();
            });
            
             scope.getPageNumbers = function(){
                var listOfPages = [];
                var totalRecordsSize = scope.totalitems;

                scope.totalPages = totalRecordsSize/scope.itemsperpage;
                if (totalRecordsSize % scope.itemsperpage > 0) {
                  scope.totalPages += 1;
                }

                for( i = 1; i <= scope.totalPages;i++){
                    listOfPages.push(i);
                }
                return listOfPages;
            };
            
            scope.jumpOnPage = function(index){
                scope.currentPageIndex = index;
            }
            scope.jumpOnPrevious = function(){
                if(scope.currentPageIndex > 1)
                    scope.currentPageIndex -= 1;
            }
            scope.jumpOnNext = function(){
                 if(scope.currentPageIndex < scope.totalPages)
                    scope.currentPageIndex += 1;
            }
        }
        function fieldTemplate(el, attrs){
            return '<nav aria-label="Page navigation example">'+
                        '<ul class="pagination justify-content-end" >'+
                            '<li class="page-item" ng-model="currentPageIndex" ng-class="{\'disabled\':currentPageIndex===1}" >'+
                                '<a class="page-link" href="#" ng-click = "jumpOnPrevious()" >Previous</a> '+
                            '</li>' +
                            '<li class="page-item" ng-repeat = "i in getPageNumbers() track by i" ng-model="currentPageIndex" ng-class="{\'active\':$index==currentPageIndex-1}" >'+
                                '<a  class="page-link" href="#" ng-click = "jumpOnPage(i)" >{{i}}</a> '+
                            '</li>'+
                            '<li class="page-item" ng-model="currentPageIndex" ng-class="{\'disabled\':currentPageIndex===totalPages}" >'+
                                '<a class="page-link" href="#" ng-click = "jumpOnNext()" >Next</a> '+
                            '</li>' +
                        '</ul>'+
                    '</nav>';
            
        }
        return {
            restrict:'E',
           
            template: fieldTemplate,
            replace:true,
            require:"ngModel",
            scope:{
                totalitems:"=",
                itemsperpage:"="
                //currentPageIndex:"=ngModel"
            },
            compile: function(element){
                return{
                    post:link
                };
            }
        };
        
    });
})();