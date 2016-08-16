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
        this.message = null;



        function getRepos(username) {
            if(!username) {
                that.message = 'please type in a username to search';
                return;
            }
            repos.getUserRepos(username)
                .then(function(repos) {
                    console.log(repos);
                    if (!repos.length) {
                        that.message = 'User does not have any repos, try another user?';
                    }
                    repos.forEach(function(repo) {
                        repo.popularity = calcPopularity(repo);
                    });
                    that.allRepos = repos;
                    that.username = '';
                })
                .catch(function(err) {
                    console.log(err);
                    that.message = 'Oops something went wrong';
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
