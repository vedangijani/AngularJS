//query on ng-change


angular.module('app').directive('typeahead', ['searchFilter','$timeout' ,function(search,$timeout){
    
    var tpl = '<form><input ng-model="term" ng-change="textChange()"></input>' +
        ' <div class="list-group"> '+
        ' <div class="list-group-item" ng-repeat="item in items | search:term" style="cursor:pointer;"'+
        ' ng-hide="selected" ng-class="{\'active\':$index==currentIndex}"' +
        ' ng-click="handleSelection(item,$index)" ng-mouseover="mouseOver($index)">'+ 
        ' {{item}}'+
        ' </div></div></form>';
    
    var link = function(scope, element, attrs){
         $timeout(function(){
               var active = false;
               scope.selected = false;
               scope.currentIndex = 0;
                
               
               scope.handleSelection = function(item,index){
                   scope.term = item;//scope.items[index]; 
                   scope.currentIndex = index;
                   scope.selected = true;
                   $timeout(function(){  //if I dont use timeout here, it gets 'term' value as what was entered. If I delay calling onselect it will get new value of term that been updated by selectedItem
                       scope.onSelect();
                   },200);
               }
               scope.textChange = function(){
                   if(scope.selected)
                       scope.selected = false;
               }
               
               scope.mouseOver = function(index){
                   scope.currentIndex = index;
               }
         });
    };
    
    
    return {
        restrict:'E',
        template: tpl,
        scope:{
            items:"=",
            term:"=",
            onSelect: "&"
        },
        link : link
    };
    
  }]);

