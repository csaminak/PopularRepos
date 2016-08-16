(function() {
    'use strict';

    angular.module('popRepos')
        .controller('ReposController', ReposController);

    ReposController.$inject = ['repos'];

    function ReposController(repos) {
        var that = this;
        this.username = '';
        this.allRepos = [];
        this.getRepos = getRepos;


        
        function getRepos(username) {
            if(!username) {
                return;
            }
            repos.getUserRepos(username)
                .then(function(repos) {
                    console.log(repos);
                    that.allRepos = repos;
                    that.username = '';
                });
        }


    }


})();
