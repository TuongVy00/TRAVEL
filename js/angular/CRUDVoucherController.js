app.controller("CRUDVoucherController", function ($scope, $location, $http, $rootScope, $routeParams) {
    $scope.check = false
    $scope.save = {}
    let review = document.getElementById('review')
    $scope.image = 'https://s3.amazonaws.com/thumbnails.venngage.com/template/5456834b-ba95-41a9-85b2-4abd4d313c11.png'
    if ($routeParams.id) {
        $scope.voucher = $rootScope.voucherParam.find(function (voucher) {
            return voucher.id === $routeParams.id;
        });
        review.src = $scope.voucher.image
        $scope.check = true
    } else {
        $scope.voucher = {}
        review.src = $scope.image
    }



    $scope.submitForm = function () {
        if ($scope.check) {
            $scope.save = {
                id: $scope.voucher.id,
                title: $scope.voucher.title,
                image: review.src,
                discount: $scope.voucher.discount,
                condition: $scope.voucher.condition,
                quanity: $scope.voucher.quanity,
                createdate: $scope.voucher.createdate,
                enddate: $scope.voucher.enddate,
                email: $rootScope.email
            }
            $http.put($rootScope.url + "/api/v1/staff/voucher/update/" + $scope.voucher.id, $scope.save,
                {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật voucher thành công',
                        text: 'Tuyệt vời!',
                    });
                    $location.url("/QuanLyVouCher")
                })
                .catch(function (error) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Cập nhật voucher thất bại',
                        text: 'kiểm tra lai dữ liệu',
                    });
                });
        } else {
            $scope.voucher.image = review.src
            if ($scope.voucher.condition == null) {
                $scope.voucher.condition = 0
            }
            $scope.voucher.email = $rootScope.email
            $http.post($rootScope.url + "/api/v1/staff/voucher/save", $scope.voucher,
                {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thêm voucher thành công',
                        text: 'Tuyệt vời!',
                    });
                    $location.url("/QuanLyVouCher")
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Thêm voucher thất bại',
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
                review.src = $scope.voucher.image
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