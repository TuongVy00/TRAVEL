app.controller(
  "TaiKhoanController",
  function ($scope, $location, $http, $rootScope) {
    $scope.current = [];
    $scope.data = [];
    $scope.findAll = function () {
      $http
        .get($rootScope.url + "/api/v1/account/all", {
          headers: {
            Authorization: "Bearer " + $rootScope.token,
          },
        })
        .then(function (response) {
          $scope.current = response.data;
          $scope.data = response.data;
        })
        .catch(function (error) {});
    };
    $scope.findAll();

    $scope.deleteid = function (id) {
      Swal.fire({
        title: "Bạn có khóa tài khoản này ?",
        text: "Có thể phục hồi lại được!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          $http
            .get($rootScope.url + "/api/v1/account/active/" + id, {
              headers: {
                Authorization: "Bearer " + $rootScope.token,
              },
            })
            .then(function (response) {
              Swal.fire({
                title: "Deleted!",
                text: "Tài khoản đã được vô hiệu hóa thành công.",
                icon: "success",
              });
              $scope.findAll();
            })
            .catch(function (error) {
              console.log(error);
              Swal.fire({
                icon: "error",
                title: "vô hiệu hóa thất bại",
                text: "kiểm tra lai dữ liệu",
              });
            });
        }
      });
    };

    $scope.searchKeyword = function (keyword) {
      if (keyword === undefined || keyword == null || keyword == "") {
        $scope.current = $scope.data;
      } else {
        $scope.current = $scope.current.filter(function (account) {
          return (
            account.email.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
            account.fullname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
          );
        });
      }
    };

    $scope.exportExcel = function () {
      let table2excel = new Table2Excel();
      table2excel.export(
        document.querySelector("#table-account"),
        "Danh Sách account"
      );
      console.log(table2excel);
    };
  }
);
