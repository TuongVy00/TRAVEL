app.controller("voucherController", function ($scope, $location, $http, $rootScope) {
    $scope.current = []
    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/staff/voucher/all", {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $rootScope.voucherParam = response.data
            $scope.current = $rootScope.voucherParam
        })
            .catch(function (error) {

            });
    }
    $scope.findAll()


    $scope.deleteid = function (id) {
        Swal.fire({
            title: "Bạn có muốn xóa voucher này ?",
            text: "sẽ không thể phục hồi lại được!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete($rootScope.url + "/api/v1/admin/voucher/" + id, {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Voucher đã được delete thành công.",
                        icon: "success"
                    });
                    $scope.removeElementById(id)
                    $scope.current = $rootScope.voucherParam
                })
                    .catch(function (error) {
                        console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'xóa voucher thất bại',
                            text: 'kiểm tra lai dữ liệu',
                        });
                    });

            }
        });
    }

    $scope.searchKeyword = function (keyword) {
        const searchInput = keyword || '';
        $scope.current = $rootScope.voucherParam.filter(function (voucher) {
            return voucher.id.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
                voucher.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
        });
    };
    $scope.exportExcel = function(){
        let table2excel = new Table2Excel();
        table2excel.export(document.querySelector("#table-voucher"),'Danh Sách Voucher');
    }
    $scope.removeElementById = function (id) {
        $rootScope.voucherParam = $rootScope.voucherParam.filter(function (item) {
            return item.id !== id;
        });
    };

    









})