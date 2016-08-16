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
                    repos.forEach(function(repo) {
                        repo.popularity = calcPopularity(repo);
                    });
                    that.allRepos = repos;
                    that.username = '';
                });
        }

        /**
         * Uses an individual repo's properties to calculate it's popularity
         * @param  {Object }    repo    contains properties to calc popularity
         * @return {Number}             the calculaed popularity of the repo
         */
        function calcPopularity(repo) {
            return (repo.stargazers_count + (2*repo.forks_count) + (repo.open_issues_count/2));
        }




    }


})();
