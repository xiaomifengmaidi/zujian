angular.module('fengGrid', [])
    .directive('parent', function () {
        return {

            // Restrict to elements and attributes
            restrict: 'EA',

            // Assign the angular scope attribute formatting
            scope: true,
            replace:false,
            // Assign the angular directive template HTML
          
            controller: function ($scope, $element) {
                // alert($scope.control);
                this.aa = $scope.contro
                this.fenye = function (array, pages) {

                    $scope.currentPage = pages.currentPage;
                    $scope.pageSize = pages.pageSize;
                    $scope.total = array.length;
                    $scope.DoCtrlPagingAct = function (text, page, pageSize, total) {
                        return array.slice((page - 1) * pageSize, page * pageSize);
                    };
                    return $scope.DoCtrlPagingAct("F", $scope.currentPage, $scope.pageSize, $scope.total);
                };
                this.initPage = { currentPage: 1, pageSize: 1 };
               
            },
           
        };


    })
 .directive('grid', function () {
     function sortByKey(array, key) {
         return array.sort(function (a, b) {
             var x = a[key]; var y = b[key];
             return ((x < y) ? -1 : ((x > y) ? 1 : 0));
         });
     }
     function sortByKey1(array, key) {
         return array.sort(function (a, b) {
             var x = a[key]; var y = b[key];
             return ((x > y) ? -1 : ((x < y) ? 1 : 0));
         });
     }

     return {

         // Restrict to elements and attributes
         restrict: 'EA',
         require: '?^parent',
         // Assign the angular scope attribute formatting
         scope: false,
         replace: false,
         // Assign the angular directive template HTML
         template: '<table cellspacing="0" cellpadding="0" class="Atable" style="width:100%"><tr><th ng-repeat="col in cols" ng-style="col" ng-class={{col.class}}>{{col.title}}<span ng-show="col.sort">&nbsp;&nbsp;' +
             '<img src="imgs/noorder.png" ng-show="defaultImg{{$index}}" ng-click="defaultclick($index)"/><img src="imgs/asc.png" ng-show="up{{$index}}" ng-click="upclick($index)"/><img src="imgs/desc.png" ng-show="down{{$index}}"  ng-click="downclick($index)"/></div></th><tr>' +
            '<tr ng-repeat="de in details"><td ng-repeat="col in cols" ng-class={{col.class}}><span ng-bind="de.{{col.value}}"></span></td><tr></table>' +
             ' <paging class="small" page="currentPage" page-size="pageSize" total="total" adjacent="2" dots="..." scroll-top="true" hide-if-empty="true" ul-class="pagination" active-class="active" disabled-class="disabled" show-prev-next="true" paging-action="DoCtrlPagingAct(aa, page, pageSize, total)"></paging>',
      
         // Link the directive to enable our scope watch values
         link: function (scope, element, attrs, controller) {
             function initPages() {
                // scope.currentPage = controller.initPage.currentPage;
                // scope.pageSize = controller.initPage.pageSize;
             }
             initPages();
             scope.details = JSON.parse(attrs.details);
             scope.DoCtrlPagingAct = function (text, page, pageSize, total) {
                 scope.details= JSON.parse(attrs.details).slice((page - 1) * pageSize, page * pageSize);
             };
            
             scope.total = JSON.parse(attrs.details).length;
           //  var pages = { currentPage: scope.currentPage, pageSize: scope.pageSize };
             scope.arrayAll = JSON.parse(attrs.details);
           
             // fenye(arrayAll);
           
             scope.details = controller.fenye(scope.arrayAll, controller.initPage);
            
             var json = JSON.parse(attrs.data);
             scope.cols = json.data;
             var titleLength = json.data.length;
             allvis();
             scope.defaultclick = function (index) {
                 allvis();
                 scope["defaultImg" + index] = false;
                 scope["up" + index] = true;
                 scope.arrayAll = sortByKey1(scope.arrayAll, json.data[index].value);
                 scope.details = controller.fenye(scope.arrayAll, controller.initPage);
               
               
             }
             scope.upclick = function (index) {

                 allvis();
                 scope["defaultImg" + index] = false;
                 scope["down" + index] = true;
                 scope.arrayAll = sortByKey(scope.arrayAll, json.data[index].value);
                 scope.details = controller.fenye(scope.arrayAll, controller.initPage);
                
             }
             scope.downclick = function (index) {
                 allvis();
                 scope["defaultImg" + index] = false;
                 scope["up" + index] = true;
                 scope.arrayAll = sortByKey1(scope.arrayAll, json.data[index].value);
                 scope.details = controller.fenye(scope.arrayAll, controller.initPage);
               
             }
             function allvis() {

                 for (var i = 0; i < titleLength; i++) {
                     scope["defaultImg" + i] = true;
                     scope["up" + i] = false;
                     scope["down" + i] = false;
                 }

             }
             //function fenye(array) {

             //    scope.currentPage = 1;
             //    scope.pageSize = 1;
             //    scope.total = array.length;
             //    scope.DoCtrlPagingAct = function (text, page, pageSize, total) {
             //       scope.details = array.slice((page - 1) * pageSize, page * pageSize);
             //    };

             //    scope.DoCtrlPagingAct("F", scope.currentPage, scope.pageSize, scope.total);
             //}

         }
     };
 })