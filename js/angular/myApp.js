app.config(function ($routeProvider) {
  $routeProvider
    .when("/main", {
      templateUrl: "./pages/main.html",
      controller: "mainController",
    })
    .when("/QuanLyPhanHoi", {
      templateUrl: "./pages/QuanLyPhanHoi.html"

    })
    .when("/modalFeedback", {
      templateUrl: "./pages/modalFeedback.html",
      controller: "modalFeedbackController",
    })
    .when("/profile", {
      templateUrl: "./pages/profile.html",
    })
    .when("/QuanLyVouCher", {
      templateUrl: "./pages/QuanLyVouCher.html",
      controller: "voucherController"

    })
    .when("/CRUDVoucher", {
      templateUrl: "./pages/CRUDVoucher.html",
      controller: "CRUDVoucherController",
    })

    .when("/CRUDVoucher/:id", {
      templateUrl: "./pages/CRUDVoucher.html",
      controller: "CRUDVoucherController",
    })

    .when("/login", {
      templateUrl: "./pages/sign-in.html",
      controller: "loginController",
    })

    .when('/account', {
      templateUrl: './pages/QLTaiKhoan.html'
    })
    .when('/CRUDaccount', {
      templateUrl: './pages/ThemTaiKhoan.html',
      controller:'TaiKhoanController'

    })
    .when("/changeplantour/:id", {
      templateUrl: "./pages/thaydoithongtinplantour.html"      
    })
    
    .when('/danhsachve', {
      templateUrl: './pages/DanhSachVe.html'
    })

    .when('/ThayDoiThongTinVe', {
      templateUrl: './pages/ThayDoiThongTinVe.html'
    })

    .when('/themDiaDiem', {
      templateUrl: './pages/formThemDiaDiem.html'
    })
    .when('/UpdateLoation', {
      templateUrl: './pages/UpdateLoation.html',
      controller: 'UpdateLoation'
    })
    .when('/ThayDoiThongTintour', {
      templateUrl: './pages/thayDoiThongTinTour.html'
    })
    .when('/themtourdulich', {
      templateUrl: './pages/themTourDuLich.html'
    })

    .when('/QuanLyTour', {
      templateUrl: './pages/QuanLyTour.html'
    })
    .when('/quanLyDiaDiem', {
      templateUrl: './pages/quanLyDiaDiem.html',
      
    })
    .when('/ticket', {
      templateUrl: './pages/QLVe.html'
    })

    .otherwise({
      redirectTo: "/login",
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
