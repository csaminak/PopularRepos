(function() {
    'use strict';

    angular.module('popRepos')
        .filter('popularity', PopularityFilter);

    function PopularityFilter() {
        return function sort(repos, reverse) {
            // We have to create a copy because "repos" is the same array the controller is watching
            // and every time we execute our sort function below, the controller "sees" that change
            // and thus the digest cycle gets overloaded and says its in an infinite loop.
            // This is because "repos" is passed "by reference" versus primitives,
            // which are passed "by value".
            var copy = [].concat(repos);
            return copy.sort(function(repo1, repo2) {
                var repoDiff = repo2.popularity - repo1.popularity;
                if (repoDiff === 0) {
                    repoDiff = new Date(repo2.created_at) - new Date(repo1.created_at);
                }

                if (reverse) {
                    return repoDiff * -1;
                }
                return repoDiff;
            });
        };
    }

})();
