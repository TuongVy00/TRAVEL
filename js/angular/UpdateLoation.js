angular.module('app').controller('UpdateLoation', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {

    $scope.formData = {};
    var id = $location.search().id;
    $scope.loadLocationData = function() {
      var apiUrl = 'http://localhost:8080/api/v1/location/'+id; // URL của API để lấy dữ liệu
      $http({
        method: 'GET',
        url: apiUrl,
        headers: {
          'Authorization': 'Bearer ' + $rootScope.token
        }
      })
      .then(function(response) {
        $scope.formData = response.data;
        delete $scope.formData.isActive;
        if(response.data.account && response.data.account.email) {
          $scope.formData.email = response.data.account.email;
      }

      }, function(error) {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Đã xảy ra lỗi: ' + error.message,
          icon: 'error'
        });
      });
    };
    $scope.loadLocationData();
    $scope.updateLocation = function() {
        var apiUrl = 'http://localhost:8080/api/v1/location/update/' + $scope.formData.id;
        $http({
          method: 'PUT',
          url: apiUrl,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + $rootScope.token
          },
          data: $scope.formData
        })
        .then(function(response) {
          Swal.fire({
            title: 'Cập nhật thành công!',
            text: 'Bạn sẽ được đưa về trang chính sau 3s.',
            icon: 'success',
            timer: 3000,
            willClose: () => {
                $location.path('/quanLyDiaDiem');
                $scope.$apply(); 
            }
        });
  
        }, function(error) {
          Swal.fire({
            title: 'Lỗi!',
            text: 'Đã xảy ra lỗi: ' + error.message,
            icon: 'error'
          });
        });
      };
  
}]);

