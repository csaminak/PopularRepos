(function() {
    'use strict';

    angular.module('popRepos', []);

    angular.module('popRepos')
        .factory('repos', ReposService);

    ReposService.$inject = ['$http', '$q'];

    function ReposService($http, $q) {

        var apiKey;
        try {
            apiKey = JSON.parse(localStorage.getItem('apiKey'));
        } catch (err) {
            //does not matter because apiKey isn't required to retieve
            //a user's repos, this is done solely for testing app.
        }

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
                url: 'https://api.github.com/users' + username + '/repos',
                method: 'get',
                headers: {
                    Authorization: 'Authorization token ' + apiKey
                }
            })
            .then(function(response) {
                console.log('response', response);
                console.log('response data', response.data);
                return response.data;
            })
            .catch(function(err) {
                console.log(err);
                //TODO some error because unable to retrieve repos
            });
        }


    }

})();
