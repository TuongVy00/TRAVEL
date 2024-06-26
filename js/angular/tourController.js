
app.controller("tourController", function ($scope, $http, $rootScope) {





  $scope.tourr = $rootScope.toursfirst
  $scope.currentPage = 0;
  $scope.pageSize = 9;
  $scope.selectedTour = null;


  $scope.updatePagedTours = function () {
    var start = $scope.currentPage * $scope.pageSize;
    var end = start + $scope.pageSize;
  
    $scope.tours = $scope.tourr.slice(start, end);
    
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pageCount() - 1) {
      $scope.currentPage++;
      $scope.updatePagedTours();
    }
  };

  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.updatePagedTours();
    }
  };

  $scope.pageCount = function () {
    return Math.ceil($scope.tourr.length / $scope.pageSize);
  };


  $scope.selectTour = function (tour) {
    $scope.selectedTour = tour;
  };

  $scope.updatePagedTours()


  
  $scope.searchPrice = ''; // Khởi tạo biến searchPrice

  // Hàm customFilter để lọc ngược
  $scope.customFilter = function (item) {
    if (!$scope.searchPrice || $scope.searchPrice === '') {
      return true; // Nếu không nhập giá, hiển thị tất cả các tour
    }
    return item.price < parseFloat($scope.searchPrice); // Lọc các tour có giá nhỏ hơn giá nhập vào
  };


});
