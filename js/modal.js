angular.module('myApp', [])
  .controller('ModalController', ['$scope', function($scope) {
    $scope.modalVisible = false;

    $scope.openModal = function() {
      $scope.modalVisible = true;
    };

    $scope.closeModal = function() {
      $scope.modalVisible = false;
    };
    $scope.$watch('modalVisible', function(newVal) {
      console.log('modalVisible:', newVal);
    });
  }]);