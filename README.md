### ModalProvider
> angular service, support custom modal content(from templateUrl), $scope

### Installation
`bower install ng-modal-provider`

### Usage

```javascript
<link rel="stylesheet" href="bower_components/ng-modal-provider/ng-modal.css">
<script src="bower_components/ng-modal-provider/ng-modal-provider.js"></script>
<script>
    var app = angular.module('app',['ngModal'])
        .controller('AppCtrl',['$scope','ModalProvider',function($scope,ModalProvider){
            var scope = this;
            scope.modal = ModalProvider.fromTemplateUrl('test.tpl.html');
            scope.openModal = function(){
                scope.modal.show();
            }; 
            scope.closeModal = function(){
                scope.modal.hide();
            }
        }])
</script>
<body ng-controller="AppCtrl as appCtrl">
    

</body>
```

===

##### test.tpl.html
```
<div>
    <button ng-click="appCtrl.closeModal()">close modal</button>
</div>
```
