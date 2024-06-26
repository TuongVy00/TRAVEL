app.controller("quanLyVe", function ($scope, $location, $http, $rootScope) {
    $scope.ls = [];
    $scope.Ticket = [];
    // Fetch locations
    $scope.fetchLocations = function () {
        $http
            .get($rootScope.url + "/api/v1/tour/plantour/all", {
                headers: {
                    Authorization: "Bearer " + $rootScope.token,
                },
            })
            .then((response) => {
                $scope.ls=  response.data;
                
                $scope.ls.filter(e => {
                    return e.tour.isactive === true
                })

            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
            });
    };

    $scope.fetchticket = function () {
        $http
            .get($rootScope.url + "/api/v1/orders/all", {
                headers: {
                    Authorization: "Bearer " + $rootScope.token,
                },
            })
            .then((response) => {
                const tickets = response.data;
                const plantour1Tickets = tickets.filter((ticket) => {
                    return ticket.plantour.id === 1; // Change this line
                });
                $scope.tickets = plantour1Tickets;
            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
            });
    };

    $scope.fetchLocations();

    // Delete location function
    $scope.deleteLocation = function (locationId) {
        Swal.fire({
            title: "Bạn có chắc chắn xóa ?",
            text: "Xóa Vé này ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng , xóa nó!",
        }).then((result) => {
            if (result.value) {
                $http
                    .delete($rootScope.url + "/api/v1/location/delete/" + locationId, {
                        headers: {
                            Authorization: "Bearer " + $rootScope.token,
                        },
                    })
                    .then(function (response) {
                        Swal.fire({
                            icon: "success",
                            title: "Xóa thành công",
                            text: "Vé đã được xóa",
                        });
                        $scope.fetchLocations(); // Refresh the list of locations
                    })
                    .catch(function (error) {
                        console.error("Error deleting location:", error);
                        if (error.status === 401 || error.status === 403) {
                            Swal.fire({
                                icon: "warning",
                                title: "Xác thực thất bại",
                                text: "Vui lòng đăng nhập lại!",
                            });
                            $location.path("/login");
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Xóa thất bại",
                                text: "Kiểm tra lỗi khi xóa vé!",
                            });
                        }
                    });
            }
        });
    };
    $scope.Edit = function (id) {
        $location.path("/danhsachve");
        $location.search({ id: id });
    };
});
