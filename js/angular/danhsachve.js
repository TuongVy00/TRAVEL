
angular.module('app').controller('danhsachve', function ($scope, $http, $location, $rootScope) {
    $scope.Ticket = [];

    var idTicket = $location.search().id;
    // Fetch locations
    $scope.fetchticket = function () {
        $http.get($rootScope.url + "/api/v1/orders/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
            .then(response => {
                const tickets = response.data;
                const plantour1Tickets = tickets.filter(ticket => {
                    return ticket.plantour.id === parseInt(idTicket); // Change this line
                });
                $scope.Ticket = plantour1Tickets;
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    }
    // Call fetchLocations when the controller is loaded
    $scope.fetchticket();

    $scope.Edit = function (id) {
        console.log("id của tour là:   " + id);
        $location.path('/danhsachve');
        $location.search({ id: id });
    }

    $scope.paymentss = function (id) {
        $http.get($rootScope.url + "/api/v1/orders/update/" + id, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công!',
                text: 'Đã xác nhận thanh toán'
            });
            $scope.fetchticket();


        })
        .catch(error => {
            console.error('Error confirm ticket:', error);
        });
    }


});