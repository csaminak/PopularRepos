(function() {
    'use strict';

    angular.module('popRepos')
        .directive('modal', Modal);

    function Modal() {
        return {
            restrict: 'E',
            templateUrl: 'app/templates/modal.template.html',
            transclude: true
        };
    }

})();
