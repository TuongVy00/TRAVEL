app.controller("paymentController", function ($scope, $http, $rootScope, $location, $routeParams) {

     $scope.planourId = $routeParams.id
     $scope.price = $routeParams.price
     $scope.discountAmount = ""
     $scope.orders = {
          planTourId: $scope.planourId,
          emailAccount: $rootScope.email,
          price: $scope.price,
          status: "Chờ thanh toán",
          qrcode: "travelbee"
     }
     $scope.initialPrice = $scope.orders.price;

     $scope.memberChange = function () {
          if ($scope.orders.member == undefined) {
               $scope.orders.member = 1;
          }
          $scope.orders.price = $scope.initialPrice * $scope.orders.member;
          
     };



     $scope.payment = function () {
          if ($scope.orders.voucher == "") {
               $scope.orders.voucher = "Không có"

          }
          $scope.orders = JSON.stringify($scope.orders)
          $location.path("/qrcodepayment/"+ $scope.orders)

     }


     $scope.orders.voucher = ''
     let labelvoucher = document.getElementById("label-voucher")
     $scope.checkvoucher = function () {
          if ($scope.orders.voucher == "") {
               $scope.orders.voucher = "No-voucher"
          }
          $http.get($rootScope.url + '/api/v1/home/voucher/' + $scope.orders.voucher)
               .then(function (response) {
                    labelvoucher.innerHTML = response.data.title + ' Giảm giá ' + response.data.discount + "%"
                    labelvoucher.style.color = "green"
                    labelvoucher.style.fontSize = "15px"
                    $scope.discountAmount = $scope.orders.price * (response.data.discount / 100);
                    $scope.orders.price = $scope.orders.price - $scope.discountAmount;
               })
               .catch(function (error) {
                    labelvoucher.innerHTML = error.data.status
                    labelvoucher.style.color = "red"
                    labelvoucher.style.fontSize = "15px"
                    $scope.orders.price = $scope.price
                    if ($scope.orders.member != undefined) {
                         $scope.orders.price = $scope.orders.price * $scope.orders.member
                    }

               });

     }

});