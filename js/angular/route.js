app.config(function ($routeProvider) {
  $routeProvider
    .when("/main", {
      templateUrl: "./component/main.html"
    })
    .when("/contact", {
      templateUrl: "./component/contact.html"
    })
    .when("/tour", {
      templateUrl: "./component/tour.html",

    })
    .when("/tourdetail/:tourId", {
      templateUrl: "./component/tourdetail.html"

    })
    .when("/hotel/:tourId", {
      templateUrl: "./component/hotel.html"
    })
    .when("/transport/:tourId", {
      templateUrl: "./component/transport.html"
    })
    .when("/location/:tourId", {
      templateUrl: "./component/location.html"
    })
    .when("/payment/:id/:price", {
      templateUrl: "./component/payment.html"
    })
    .when("/login", {
      templateUrl: "./component/sign-in.html"
    })
    .when("/register", {
      templateUrl: "./component/sign-up.html"
    })
    .when("/changepass", {
      templateUrl: "./component/changepass.html"
    })
    .when("/qrcodepayment/:orders", {
      templateUrl: "./component/qrcodepayment.html"
    })
    .when("/information", {
      templateUrl: "./component/information.html"
    })
    .when("/history", {
      templateUrl: "./component/historyticket.html"
    })
    .when("/inforuser/:id", {
      templateUrl: "./component/inforUser.html"

    })


    .otherwise({
      redirectTo: "/main",
    });
});
app.run(function ($rootScope) {
  $rootScope.$on("$routeChangeStart", function () {
    $rootScope.loading = true;
  });
  $rootScope.$on("$routeChangeSuccess", function () {
    $rootScope.loading = false;
  });
  $rootScope.$on("$routeChangeError", function () {
    $rootScope.loading = false;
    alert("loading Templet Errors");
  });
});
