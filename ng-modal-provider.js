//////////// inspired by ionicframework modal
var ngModal = angular.module('ngModal',[]);


ngModal.factory('ModalProvider',['$rootScope', '$compile','$timeout', '$http', '$q', function($rootScope, $compile,$timeout,$http,$q){
    var service = {};

    var status = {};

    var modals = {};

    var currentModal;

    function fetchTemplate(url,opts) {
        return $http.get(url,{cache: opts.cache})
           .then(function(res){
                return res.data && res.data.trim();
            });
    }
    function compile(template,opts) {
        var scope = opts.scope && opts.scope.$new() || $rootScope.$new(true);
        return $compile(template)(scope.$parent || scope);
    }


    function Modal(url,opts){
        var self = this;

        self.url = url;
        self.opts = opts || {
            cache: true // cache template
        };

        fetchTemplate(url,self.opts).then(function(template){
            self.tpl = template;
            if(opts.pre_append){
                service.setModal(self);
            }
            if(self.status === Modal.STATUS.PENDING){
                self.status = Modal.STATUS.RESOLVED;
                self.show();             
            }
            self.status = Modal.STATUS.RESOLVED;
        });
        modals[url] = this;
    }

    /// status
    Modal.STATUS = {
        RESOLVED: 1,
        PENDING: 2
    };

    Modal.prototype.show = function(){
        if(this.status !== Modal.STATUS.RESOLVED){
            this.status = Modal.STATUS.PENDING;
            return;
        }
        if(currentModal !== this){
            service.setModal(this);
        }
        $backdrop.addClass('active');
    };
    Modal.prototype.hide = function(){
        $backdrop.removeClass('active');
    };

    var $backdrop = angular.element('<div class="fixed top ng-modal left right cover flex-row center">');
    var $contentWrapper = angular.element('<div class="modal-content-wrapper">');
    $backdrop.append($contentWrapper);
    $backdrop.on('click',function(e){
        e.stopPropagation();
        $backdrop.removeClass('active');
    });
    $contentWrapper.on('click',function(e){
        e.stopPropagation();
    });
    document.body.appendChild($backdrop[0]);

    service.fromTemplateUrl = function(url,opts){
        return modals[url] || new Modal(url,opts);
    };

    service.setModal = function(modal){
        currentModal = modal;
        $contentWrapper.empty();
        $contentWrapper.append(compile(modal.tpl,modal.opts));
    };

    ///////
    ///dev console test
    // service.modals = modals;
    // window.ModalProvider = service;

    return service;
}]);