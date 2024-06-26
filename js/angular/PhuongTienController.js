app.controller("PhuongTienController", function ($scope, $location, $http, $rootScope) {
    $scope.current = []
    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/transport/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $rootScope.transportParam = response.data
            $scope.current = $rootScope.transportParam
        })
            .catch(function (error) {

            });
    }
    $scope.findAll()


    // $scope.Edit = function(id) {
    //     console.log("id is  " + id);
    //     $location.path('/CRUDQuanLyPhuongTien');
    //     $location.search({id: id}); 
    //   }

    $scope.deleteid = function (id) {
        Swal.fire({
            title: "Bạn có muốn xóa khách này ?",
            text: "sẽ không thể phục hồi lại được!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete($rootScope.url + "/api/v1/transport/delete/" + id, {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Khách sạn đã được delete thành công.",
                        icon: "success"
                    });
                    $scope.findAll();
                })
                    .catch(function (error) {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'xóa khách sạn thất bại',
                            text: 'kiểm tra lai dữ liệu',
                        });
                    });

            }
        });
    }

    $scope.searchKeyword = function (keyword) {
        const searchInput = keyword || '';
        $scope.current = $rootScope.transportParam.filter(function (transport) {
            return transport.address.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
                transport.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
        });
    };
    $scope.exportExcel = function(){
        let table2excel = new Table2Excel();
        table2excel.export(document.querySelector("#table-transport"),'Danh Sách transport');
    }
    $scope.removeElementById = function (id) {
        $rootScope.transportParam = $rootScope.transportParam.filter(function (item) {
            return item.id !== id;
        });
    };


})