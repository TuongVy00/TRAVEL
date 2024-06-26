app.controller(
  "loginController",
  function ($scope, $location, $http, $rootScope, $cookies) {
    $scope.login = {
      email: "",
      password: "",
    };
    $scope.rememberMe = false;
    $scope.object = {};
    $scope.submitForm = function () {
      if ($scope.formlogin.$valid) {
        $http
          .post($rootScope.url + "/api/v1/auth/login", $scope.login)
          .then((response) => {
            $scope.object = response.data;
          
            $rootScope.email = $scope.object.email;
            $rootScope.fullname = $scope.object.fullName;
            $rootScope.authorities = $scope.object.authorities;
            $rootScope.token = $scope.object.token;
            Swal.fire({
              title: "Đăng Nhập Thành Công",
              width: 600,
              icon: "success",
              padding: "3em",
              color: "#716add"
            
            });
            
            $location.path("/main");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Đăng Nhập Thất Bại",
              text: "kiểm tra tài khoản và mật khẩu!",
            });
          });
      } else {
        alert("Login Fail");
      }
    };

    $rootScope.social = function (provider) {
      $http
        .get($rootScope.url + provider)
        .then((response) => {
          $scope.object = response.data;
          $rootScope.email = $scope.object.email;
          $rootScope.fullname = $scope.object.fullname;
          $rootScope.authorities = $scope.object.authorities;
          $rootScope.token = $scope.object.token;
          console.log($rootScope.token);
          Swal.fire({
            title: "Đăng Nhập Thành Công",
            width: 600,
            icon: "success",
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://i.pinimg.com/originals/48/7e/b8/487eb8f04fa06e102e5a683ae72a8b06.gif")
              left top
              no-repeat
            `,
          });
          $location.path("/main");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Đăng Nhập Thất Bại",
            text: "kiểm tra tài khoản và mật khẩu!",
          });
        });
    };

    $scope.onRememberClick = function () {
      if ($scope.rememberMe) {
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        $cookies.put("userInfo", JSON.stringify($scope.login), {
          expires: expirationDate,
        });
      } else {
        $cookies.remove("userInfo");
      }
    };

    $scope.restoreUserInfo = function () {
      let savedUserInfo = $cookies.get("userInfo");
      if (savedUserInfo != null) {
        $scope.login = JSON.parse(savedUserInfo);
      }
    };

    $scope.restoreUserInfo();
  }
);
