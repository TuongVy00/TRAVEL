angular.module("app").controller("QuanLyTour", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  '$sce',
  function ($scope, $http, $location, $rootScope, $sce) {
    $scope.ls = [];

    // Fetch locations
    $scope.fetchLocations = function () {
      $http
        .get($rootScope.url + "/api/v1/tour/all", {
          headers: {
            Authorization: "Bearer " + $rootScope.token,
          },
        })
        .then((response) => {
          $scope.ls = response.data;

        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    };

    // Call fetchLocations when the controller is loaded
    $scope.fetchLocations();

    // Delete location funct
    $scope.deleteLocation = function (TourId) {
      Swal.fire({
        title: "Bạn có chắc chắn xóa ?",
        text: "Xóa Tour này ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng , xóa nó!",
      }).then((result) => {
        if (result.value) {
          $http
            .delete($rootScope.url + "/api/v1/tour/delete/" + TourId, {
              headers: {
                Authorization: "Bearer " + $rootScope.token,
              },
            })
            .then(function (response) {
              Swal.fire({
                icon: "success",
                title: "Xóa thành công!",
                text: "Đã xóa tour thành công!",
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
                  text: "Kiểm tra lỗi khi xóa tour!",
                });
              }
            });
        }
      });
    };
    $scope.Edit = function (id) {
      $location.path("/ThayDoiThongTintour");
      $location.search({ id: id });
    };

  


  },
]
);

