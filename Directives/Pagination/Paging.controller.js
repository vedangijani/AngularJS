(function()
{
    /* controller */
    angular.module("app").controller("PageCtrl", ["$scope", PageCtrl]);
    function PageCtrl ($scope){
        
        var vm = this;
        vm.pageChange = pageChange;
        vm.activate = activate;    
        vm.records = [];
        vm.slicedRecords;
        vm.getRecords = getRecords;
        vm.activate = activate;
        vm.currentIndex = 1;
        vm.itemsperpage = 5;
        vm.totalitems = 0;
        
        //var startindex, endIndex;
        //var lastPageIndex = 0;
        
        activate();
        
        function activate(){
            getRecords();
            pageChange();
        }
        
        function getRecords(){
            for(var i=0;i<20;i++){
                vm.records.push("To Do " + (i+1));
            }
            vm.totalitems = vm.records.length;
        }
       
        
        function pageChange(){
            var _start,_end;

            _end = vm.currentIndex * vm.itemsperpage;
            _start = _end - vm.itemsperpage + 1;

            if(_start < 1)
                _start = 1;
            
            vm.slicedRecords=vm.records.slice(_start-1,_end);
        }
    }
})();                                    

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
