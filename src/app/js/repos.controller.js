(function() {
    'use strict';

    angular.module('popRepos')
        .controller('ReposController', ReposController);

    ReposController.$inject = ['repos'];

    function ReposController(repos) {
        var that = this;
        this.username = '';
        this.user = '';
        this.allRepos = [];
        this.getRepos = getRepos;
        this.message = null;
        this.reverse = false;
        this.showRepo = null;

        /**
         * Retrieves the specfied user's repos and then adds a popularity property
         * that is calculated for each repo, and then all repos are sorted to
         * return the the highest popularity calc first.
         * @param  {String}     username    the user who's repos to return
         * @return {Array}                  the updated/sorted array of repos
         */
        function getRepos(username) {
            if(!username) {
                that.message = 'please type in a username to search';
                return;
            }
            that.user = username;
            return repos.getUserRepos(username)
                .then(function(repos) {
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
                    that.message = 'Uh oh, are you sure you typed the correct user?';
                });
        }

        /**
         * Uses an individual repo's properties to calculate it's popularity
         * @param  {Object }    repo    contains properties to calc popularity
         * @return {Number}             the calculated popularity of the repo
         */
        function calcPopularity(repo) {
            return (repo.stargazers_count + (2*repo.forks_count) + (repo.open_issues_count/2));
        }

    }


})();
