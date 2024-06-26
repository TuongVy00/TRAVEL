app.controller("CRUDtransportController", function ($scope, $location, $http, $rootScope, $routeParams) {
  $scope.check = false
  $scope.save = {}
  let review = document.getElementById('review')
  $scope.image = 'https://s3.amazonaws.com/thumbnails.venngage.com/template/5456834b-ba95-41a9-85b2-4abd4d313c11.png'
  if ($routeParams.id) {
      $scope.transport = $rootScope.transportParam.find(function (transport) {
          return transport.id === $routeParams.id;
      });
      review.src = $scope.transport.image
      $scope.check = true
  } else {
      $scope.transport = {}
      review.src = $scope.image
  }



  $scope.submitForm = function () {
      if ($scope.check) {
          $scope.save = {
              id: $scope.transport.id,
              title: $scope.transport.title,
              image: review.src,
              phone: $scope.transport.phone,
              description: $scope.transport.description,
              address: $scope.transport.address,
              createdate: $scope.transport.createdate,
              email: $rootScope.email
          }
          $http.put($rootScope.url + "/api/v1/transport/update/" + $scope.transport.id, $scope.save,
              {
                  headers: {
                      'Authorization': 'Bearer ' + $rootScope.token
                  }
              }).then(function (response) {
                  Swal.fire({
                      icon: 'success',
                      title: 'Cập nhật transport thành công',
                      text: 'Tuyệt vời!',
                  });
                  $location.url("/QLPhuongTien")
              })
              .catch(function (error) {

                  Swal.fire({
                      icon: 'error',
                      title: 'Cập nhật transport thất bại',
                      text: 'kiểm tra lai dữ liệu',
                  });
              });
      } else {
          $scope.transport.image = review.src
          if ($scope.transport.active == null) {
              $scope.transport.active = 0
          }
          $scope.transport.email = $rootScope.email
          $http.post($rootScope.url + "/api/v1/transport/save", $scope.transport,
              {
                  headers: {
                      'Authorization': 'Bearer ' + $rootScope.token
                  }
              }).then(function (response) {
                  Swal.fire({
                      icon: 'success',
                      title: 'Thêm transport thành công',
                      text: 'Tuyệt vời!',
                  });
                  $location.url("/QLPhuongTien")
              })
              .catch(function (error) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Thêm transport thất bại',
                      text: 'kiểm tra lai dữ liệu',
                  });
              });
      }

  };




  document.getElementById('fileInputfb').onchange = function (e) {
      if (e.target.files.length > 0) {
          let fileType = e.target.files[0].type;

          if (fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/jpg') {
              alert('Chỉ chấp nhận file ảnh có định dạng .png hoặc .jpg');
              e.target.value = '';
              return;
          }
          let reader = new FileReader();
          reader.onload = function (event) {
              $scope.uploadfirebase(e.target.files[0]);
          };
          reader.readAsDataURL(e.target.files[0]);
      } else {
          if ($scope.check) {
              review.src = $scope.transport.image
          } else {
              review.src = $scope.image
          }

      }
  };

  $scope.uploadfirebase = function (file) {
      const ref = firebase.storage().ref();
      const files = file;
      const metadata = {
          contentType: files.type,
      };
      const name = files.name;
      const uploadIMG = ref.child(name).put(files, metadata);
      return uploadIMG.then((snapshot) => snapshot.ref.getDownloadURL())
          .then((url) => {
              $scope.image = url;
              review.src = $scope.image
              return url;
          });
  };




})