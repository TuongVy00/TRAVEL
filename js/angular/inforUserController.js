app.controller("inforUserController", function ($scope, $http, $rootScope, $routeParams,$location) {
     $scope.id = JSON.parse($routeParams.id)
     $scope.in4 = $rootScope.history.find(function (item) {
          return item.id == $scope.id
     })

     $scope.delete = function(id){

          $http.delete($rootScope.url + "/api/v1/orders/delete/"+id,{
               headers: {
                    'Authorization': 'Bearer ' + $rootScope.token
                }
          })
          .then(response =>{
               Swal.fire({
                    icon: "success",
                    title: "Hủy Vé Thành Công !",
                    text: "Xem gmail để nhận phản hồi",
                });
               $location.path("/history");
          }).catch(error =>{
               console.log(error)
          })
           
     
     }

});
