app.controller("historyController", function ($scope, $http, $rootScope,$location) {

   
    if ($rootScope.email !== "") {
        $http.get($rootScope.url + "/api/v1/orders/history/" + $rootScope.email, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(response => {
            $rootScope.history = response.data
    
        }).catch(error => {
          
        })
    }





   


});