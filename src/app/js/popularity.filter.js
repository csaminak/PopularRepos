(function() {
    'use strict';

    angular.module('popRepos')
        .filter('popularity', PopularityFilter);

    function PopularityFilter() {
        console.log('in popularity');
        return function sort(repos, reverse) {
            console.log('popularity filter, sort, repos: ', repos);

            // We have to create a copy because "repos" is the same array the controller is watching
            // and every time we execute our sort function below, the controller "sees" that change
            // and thus the digest cycle gets overloaded and says its in an infinite loop.
            // This is because "repos" is passed "by reference" versus primitives,
            // which are passed "by value".
            var copy = [].concat(repos);
            return copy.sort(function(repo1, repo2) {
                var repoDiff = repo1.popularity - repo2.popularity;
                if (repoDiff === 0) {
                    repoDiff = new Date(repo1.created_at) - new Date(repo2.created_at);
                }

                if (reverse) {
                    return repoDiff;
                }
                return repoDiff * -1;
            });
        };
    }

})();
