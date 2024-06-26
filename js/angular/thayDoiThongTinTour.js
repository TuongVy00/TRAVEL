angular.module("app").controller("thayDoiThongTinTour", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    $scope.formData = {};
    var id = $location.search().id;
    $scope.img = '';
    var firebaseConfig = {
        apiKey: "AIzaSyBnSgLNQca9x6g5SFN8CU9YA1tBz5gGn6c",
        authDomain: "travel-bee-e0b59.firebaseapp.com",
        projectId: "travel-bee-e0b59",
        storageBucket: "travel-bee-e0b59.appspot.com",
        messagingSenderId: "991526403311",
        appId: "1:991526403311:web:24e7a3ba76e7d0d769af1a",
        measurementId: "G-DE29CFQQMY"
    };
    var config = firebase.initializeApp(firebaseConfig);
    $scope.image = ''
    document.getElementById('fileInputfb').onchange = function (e) {
        let files = e.target.files;
        Swal.fire({
            title: 'Please await!',
            text: 'Vui lòng đợi 5s để upload ảnh!',
            icon: 'warning',
            timer: 5000,
        });
        $scope.uploadfirebase(files)



    }

    $scope.loadLocationData = function () {
      var apiUrl = $rootScope.url + "/api/v1/tour/" + id;
      $http({
        method: "GET",
        url: apiUrl,
        headers: {
          Authorization: "Bearer " + $rootScope.token,
        },
      }).then(
        function (response) {
          $scope.formData = response.data;
          if (response.data.account && response.data.account.email) {
            $scope.formData.email = response.data.account.email;
          }
        },
        function (error) {
          Swal.fire({
            title: "Lỗi!",
            text: "Đã xảy ra lỗi: " + error.message,
            icon: "error",
          });
        }
      );
    };
    $scope.loadLocationData();




    $scope.uploadfirebase = function (files) {

        const ref = firebase.storage().ref();

        if (files.length === 0) {
            console.log("Vui lòng chọn ít nhất một tệp hình ảnh.");
            return;
        }

        const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const metadata = {
                contentType: file.type,
            };
            const name = file.name;
            const uploadIMG = ref.child(name).put(file, metadata);

            const promise = uploadIMG
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((url) => {
                    return url;
                });

            uploadPromises.push(promise);
        }

        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                list = downloadURLs;
                $scope.img = list.join(",");
                Swal.fire({
                    title: 'Success!',
                    text: 'Images uploaded successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })

            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to upload images: ' + error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }
    $scope.save = function () {
      var apiUrl = $rootScope.url + "/api/v1/tour/update/" + $scope.formData.id;
      const data = {
        ...$scope.formData,
        images :  $scope.img != '' ? $scope.img :  $scope.formData.images 
      }

      $http({
        method: "PUT",
        url: apiUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + $rootScope.token,
        },
        data: data,
      }).then(
        function (response) {
          Swal.fire({
            title: "Cập nhật thành công!",
            text: "Bạn sẽ được đưa về trang chính sau 3s.",
            icon: "success",
            timer: 3000,
            willClose: () => {
              $location.path("/QuanLyTour");
              $scope.$apply(); 
            },
          });
        },
        function (error) {
          Swal.fire({
            title: "Lỗi!",
            text: "Đã xảy ra lỗi: " + error.message,
            icon: "error",
          });
        }
      );
    };





  },
]);
