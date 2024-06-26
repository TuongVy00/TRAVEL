app.controller(
  "feedBackController",
  function ($scope, $location, $http, $rootScope) {
    $scope.current = [];

    $scope.findAll = function () {
      $http
        .get($rootScope.url + "/api/v1/feedback/all", {
          headers: {
            Authorization: "Bearer " + $rootScope.token,
          },
        })
        .then(function (response) {
          $rootScope.feedbackParam = response.data;
          $scope.current = $rootScope.feedbackParam;
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    };
    $scope.findAll();



    $scope.content = "";
    $scope.submitForm = function (id, content) {
      $http
        .post(
          $rootScope.url +
          "/api/v1/feedback/reply" +
          "?id=" +
          id +
          "&content=" +
          content,
          $scope.feedback,

          {
            headers: {
              Authorization: "Bearer " + $rootScope.token,
            },
          }
        )
        .then((response) => {
          Swal.fire({
            title: "gửi Thành Công",
            width: 600,
            icon: "success",
            text: "Trả lời phải hồi thành công",
          });
         
        })

        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Thất Bại",
            text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
          });
        });
        $scope.findAll();
    };


    $scope.delete = function(id){
      $http
        .delete($rootScope.url + "/api/v1/feedback/delete/"+id, {
          headers: {
            Authorization: "Bearer " + $rootScope.token,
          },
        })
        .then(function (response) {
          $scope.findAll();
          Swal.fire({
            title: "Xóa Thành Công",
            width: 600,
            icon: "success",
            text: "Xóa phải hồi thành công",
          });
         
        })
        .catch(function (error) {
          console.error("Error:", error);
        });

    }
  }
);
