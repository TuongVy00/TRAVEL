app.controller("CRUDHotelController", function ($scope, $location, $http, $rootScope, $routeParams) {
    $scope.check = false
    $scope.save = {}
    let review = document.getElementById('review')
    $scope.image = 'https://s3.amazonaws.com/thumbnails.venngage.com/template/5456834b-ba95-41a9-85b2-4abd4d313c11.png'
    if ($routeParams.id) {
        $scope.hotel = $rootScope.hotelParam.find(function (hotel) {
            return hotel.id === $routeParams.id;
        });
        review.src = $scope.hotel.image
        $scope.check = true
    } else {
        $scope.hotel = {}
        review.src = $scope.image
    }



    $scope.submitForm = function () {
        if ($scope.check) {
            $scope.save = {
                id: $scope.hotel.id,
                title: $scope.hotel.title,
                image: review.src,
                phone: $scope.hotel.phone,
                description: $scope.hotel.description,
                address: $scope.hotel.address,
                createdate: $scope.hotel.createdate,
                email: $rootScope.email
            }
            $http.put($rootScope.url + "/api/v1/hotel/update/" + $scope.hotel.id, $scope.save,
                {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật hotel thành công',
                        text: 'Tuyệt vời!',
                    });
                    $location.url("/QLKhachSan")
                })
                .catch(function (error) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Cập nhật hotel thất bại',
                        text: 'kiểm tra lai dữ liệu',
                    });
                });
        } else {
            $scope.hotel.image = review.src
            if ($scope.hotel.active == null) {
                $scope.hotel.active = 0
            }
            $scope.hotel.email = $rootScope.email
            $http.post($rootScope.url + "/api/v1/hotel/save", $scope.hotel,
                {
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token
                    }
                }).then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thêm hotel thành công',
                        text: 'Tuyệt vời!',
                    });
                    $location.url("/QLKhachSan")
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Thêm hotel thất bại',
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
                review.src = $scope.hotel.image
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