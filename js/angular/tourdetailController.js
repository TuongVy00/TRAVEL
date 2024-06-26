// TourDetailController
app.controller('TourDetailController', function ($scope, $rootScope, $http, $routeParams, $anchorScroll, $location) {



  let tourId = JSON.parse($routeParams.tourId);

  $scope.contentComment = ''
  $scope.likeCount = 0;


  $scope.payment = function () {
    let selectedPlantour = document.getElementsByName('selectedPlantour')[0];
    let selectedValue = selectedPlantour.value;

    if ($rootScope.email == '') {
      $location.url("/login");
    } else {
      $location.path("/payment/" + selectedValue + "/" + $scope.tour.price);
    }
  };


  $http.get($rootScope.url + '/api/v1/tour/view/' + tourId)
    .then(function (response) {
    })
    .catch(function (error) {
    });

  $http.get($rootScope.url + '/api/v1/tour/plantour/' + tourId)
    .then(function (response) {
      $scope.plantour = response.data;
      console.log($scope.plantour)
    })
    .catch(function (error) {
    });


  $scope.tour = $rootScope.toursfirst.find(function (tour) {
    return tour.id === tourId;
  });



  $http.get($rootScope.url + '/api/v1/comment/tour/' + tourId)
    .then(function (response) {
      $scope.comments = response.data;
    })
    .catch(function (error) {
      console.error('Lỗi khi lấy dữ liệu comment:', error);
    });





  $scope.changeImage = function (imageUrl) {
    var mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
  };



  $scope.changeImage = function (imageUrl) {
    var mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
  };


  $scope.modalVisible = false;

  $scope.openModal = function () {
    $scope.modalVisible = true;
  };

  $scope.closeModal = function () {
    $scope.modalVisible = false;
  };
  $scope.$watch('modalVisible', function (newVal) {
  });


  $anchorScroll();

  // hàm hiện comment
  $scope.activeTab = 1;

  $scope.setActiveTab = function (tabNumber) {
    $scope.activeTab = tabNumber;
  };

  $scope.isActiveTab = function (tabNumber) {
    return $scope.activeTab === tabNumber;
  };

  // đăng comment
  $scope.saveComment = function () {
    let comment = {
      content: $scope.contentComment,
      image: 'N/a',
      email: $rootScope.email,
      tourId: tourId
    }
    if ($rootScope.email == '') {
      $location.path('/login')
    }
    $http.post($rootScope.url + '/api/v1/comment/save', comment, {
      headers: {
        'Authorization': 'Bearer ' + $rootScope.token
      }
    })
      .then(function (response) {
        console.log(response.data)
        Swal.fire({
          icon: 'success',
          title: "Bàn luận thành công",
          text: "Cảm ơn bạn đã bàn luận",
        });
        $scope.contentComment = '';
        loadComments();

      })
      .catch(function (error) {
        console.error('Lỗi khi lấy dữ liệu comment:', error);
      });

  }
  function loadComments() {
    $http.get($rootScope.url + '/api/v1/comment/tour/' + tourId)
      .then(function (response) {
        $scope.comments = response.data;
        console.log('Dữ liệu comment sau khi xử lý:', $scope.comments);
      })
      .catch(function (error) {
        console.error('Lỗi khi lấy dữ liệu comment:', error);
      });
  }

  //like tour
  // hiển thị like
  $scope.getAllLikes = function (tourId) {
    $http.get($rootScope.url + '/api/v1/like/all/' + tourId)
      .then(function (response) {
        $scope.likes = response.data;
        $scope.likeCount = response.data; 
      })
      .catch(function (error) {
      });
  };
  $scope.getAllLikes(tourId)
  // update like
  $scope.isLiked = false;
  $scope.updateLike = function () {
    var likeDTO = {
      email: $rootScope.email,
      tourId: tourId
    };

    if ($rootScope.email === '') {
      $location.path('/login');
    } else {
      $http.post($rootScope.url + '/api/v1/like/update', likeDTO, {
        headers: {
          'Authorization': 'Bearer ' + $rootScope.token
        }
      })
        .then(async function (response) {  
          $scope.getAllLikes(tourId)
          const data = await response.data;
          setTimeout(()=> {
              console.log(data)
          },500)
          if  (data.isactive) {
            Swal.fire({
              icon: 'success',
              title: "Like thành công",
              text: "Cảm ơn bạn đã like",
            });
          }else {
            Swal.fire({
              icon: 'warning',
              title: "Bỏ Like tour này",
              text: "",
            });
          }
        })
        .catch(function (error) {
          console.error('Lỗi khi cập nhật like:', error);
        });
    }


  };

});