angular.module('app').filter('search',function(){
    return function(input,term){
        var out = [];
      
        for(var i=0;i<input.length; i++){
            if(input[i].indexOf(term) > -1){
                out.push(input[i]);
            }
        }
        return out;
    }
});