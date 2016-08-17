(function() {
    'use strict';

    angular.module('popRepos', []);

    angular.module('popRepos')
        .factory('repos', ReposService);

    ReposService.$inject = ['$http', '$q'];

    function ReposService($http, $q) {
        var apiKey = localStorage.getItem('apiKey');

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
                return $q.reject(new Error('need a username to retieve repos'));
            }
            return $http({
                url: 'https://api.github.com/users/' + username + '/repos',
                method: 'get',
                headers: {
                    'Authorization': 'token ' + apiKey
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
