(function() {
    'use strict';

    angular.module('popRepos')
        .controller('ReposController', ReposController);

    ReposController.$inject = ['repos'];

    function ReposController(repos) {
        var that = this;
        this.username = '';
        this.allRepos = [];
        

        repos.getUserRepos(this.username)
            .then(function(repos) {
                console.log(repos);
                that.allRepos = repos;
            });
    }


})();
