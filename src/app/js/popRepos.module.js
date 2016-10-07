(function() {
    'use strict';

    angular.module('popRepos', []);

    angular.module('popRepos')
        .factory('repos', ReposService);

    ReposService.$inject = ['$http', '$q'];

    function ReposService($http, $q) {

        return {
            getUserRepos: getUserRepos
        };

        /**
         * Gets a specfied user's repositories
         * @param  {String}   username   user of the repositories to retrieve
         * @return {Promise/Object}      hold the methods of which to return data
         */
        function getUserRepos(username) {
            if(!username) {
                return $q.reject(new Error('need a username to retrieve repos'));
            }
            return $http({
                url: 'https://api.github.com/users/' + username + '/repos',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                return response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
        }


    }

})();
