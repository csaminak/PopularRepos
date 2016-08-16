(function() {
    'use strict';

    angular.module('popRepos')
        .filter('popularity', PopularityFilter);

    function PopularityFilter() {
        console.log('in popularity');
        return function reverse(repos, reverse) {
            repos.sort(function(repo1, repo2) {
                var repoPop = repo1.popularity - repo2.popularity;
                if(reverse) {
                    return repoPop;
                } else if(!reverse) {
                    return repoPop * -1;
                }
            });
        };
    }

})();
