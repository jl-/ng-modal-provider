//////////// inspired by ionicframework modal
var ngModal = angular.module('ngModal',[]);


ngModal.factory('ModalProvider',['$rootScope', '$compile','$timeout', '$http', function($rootScope, $compile,$timeout,$http){
    var modal = {};

    var status = {};

    var $backdrop = angular.element('<div class="fixed top ng-modal left right cover flex-row center">');
    var $contentWrapper = angular.element('<div class="modal-content-wrapper">');
    $backdrop.append($contentWrapper);
    $backdrop.on('click',function(e){
        e.stopPropagation();
        modal.hide();
    });
    $contentWrapper.on('click',function(e){
        e.stopPropagation();
    });
    document.body.appendChild($backdrop[0]);

    function fetchTemplate(url,opts) {
        opts = opts || {cache: true};
        return $http.get(url,{cache: opts.cache})
           .then(function(res){
                return res.data && res.data.trim();
            });
    }
    function compile(template,opts) {
        opts = opts || {};
        var scope = opts.scope && opts.scope.$new() || $rootScope.$new(true);
        $contentWrapper.html(template);
        $compile($contentWrapper)(scope);
    }
    modal.fromTemplateUrl = function(url,opts){
        opts = opts || {};
        fetchTemplate(url,opts).then(function(template){
            compile(template,opts);
        });
    };

    modal.show = function(){
        $backdrop.addClass('active');
    };
    modal.hide = function(){
        $backdrop.removeClass('active');
    };

    return modal;
}]);