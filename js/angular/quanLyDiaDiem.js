app.controller(
  "quanlydiadiemController",
  function ($scope, $location, $http, $rootScope, $cookies) {
    $scope.ls = [];

    // Fetch locations
    $scope.fetchLocations = function () {
      $http
        .get($rootScope.url + "/api/v1/location/all", {
          headers: {
            Authorization: "Bearer " + $rootScope.token,
          },
        })
        .then((response) => {
          activeLocations = response.data.filter((l) => l.isactive);
          $scope.ls = response.data;
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
        text: "Xóa địa điểm này ?",
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
                title: "Xóa thành công ",
                text: "Đã xóa thành công địa điểm này!",
              });
              $scope.fetchLocations();
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
                  text: "Kiểm tra lỗi khi xóa địa điểm!",
                });
              }
            });
        }
      });
    };
    $scope.Edit = function (id) {
      $location.path("/UpdateLoation");
      $location.search({ id: id });
    };
  }
);
