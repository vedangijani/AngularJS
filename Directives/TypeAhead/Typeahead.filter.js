angular.module('app').filter('search',function(){
    return function(input,term){
        return input.filter(function(el){
            return el.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }
});