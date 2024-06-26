app.controller("informationController", function ($scope, $http, $rootScope) {
    let previewImage = document.getElementById('previewImage');
    $scope.account = {}

    $scope.find = function () {
        if ($rootScope.token !== "") {
            $http.get($rootScope.url + "/api/v1/account/" + $rootScope.email, {
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.token
                }
            })
                .then(respone => {
                    $scope.account = respone.data

                    console.log($scope.account)
                    if ($scope.account.image === null) {
                        $scope.account.image = 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg'
                    } else {
                        previewImage.src = $scope.account.image
                    }
                })
                .catch(error => {
               
                })
        }
    }


    document.getElementById('fileInput').onchange = function (e) {
        if (e.target.files.length > 0) {
            let fileType = e.target.files[0].type;

            if (fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/jpg') {
                alert('Chỉ chấp nhận file ảnh có định dạng .png hoặc .jpg');
                e.target.value = '';
                return;
            }
            let reader = new FileReader();
            reader.onload = function (event) {
                previewImage.src = event.target.result;
                $scope.uploadfirebase(e.target.files[0])
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            previewImage.src = 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg';
            $scope.account.image = previewImage.src
        }
    };

    $scope.uploadfirebase = function (file) {
        const ref = firebase.storage().ref();
        const files = file
        const metadata = {
            contentType: files.type,
        };
        const name = files.name;
        const uploadIMG = ref.child(name).put(files, metadata);
        return uploadIMG.then((snapshot) => snapshot.ref.getDownloadURL())
            .then((url) => {
                $scope.account.image = url
                return url;
            });

    }

    $scope.save = function(){
        console.log($scope.account.birthday)
        console.log($scope.account.createdate)
        $http.post($rootScope.url+"/api/v1/account/save",$scope.account,{
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        } ).then(resoponse =>{
            $scope.account = resoponse.data
            if ($scope.account.image === null) {
                $scope.account.image = 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg'
            } else {
                previewImage.src = $scope.account.image
            }
            Swal.fire({
                title: "Lưu Thành Công",
                text: "Thông tin của bạn",
                icon: "success"
            });

        }).catch(error =>{
            Swal.fire({
                title: "Lưu Thất Bại",
                text: "Thông tin của bạn",
                icon: "error"
            });
          
        })
    }

    $scope.find()
});