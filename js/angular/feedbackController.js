app.controller("feedbackController", function ($scope, $http, $rootScope, $location) {

    $scope.feedback = {}
    

    document.getElementById('fileInputfb').onchange = function (e) {
        if (e.target.files.length > 0) {
            let fileType = e.target.files[0].type;

            if (fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/jpg') {
                alert('Chỉ chấp nhận file ảnh có định dạng .png hoặc .jpg');
                e.target.value = '';
                return;
            }
            let reader = new FileReader();
            reader.onload = function () {
                $scope.uploadfirebase(e.target.files[0])
                
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            $scope.feedback.images = 'N/A'
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
                $scope.feedback.images = url
                return url;
            });

    }

    $scope.send = function () {
        if ($rootScope.token == '') {
            Swal.fire({
                icon: "error",
                title: "Vui lòng đăng nhập",
                text: "Để có thể gửi phản hồi!",
            });
            $location.url("/login")
        } else {
            $scope.feedback.email = $rootScope.email
            $http.post($rootScope.url + "/api/v1/feedback/send-feedback", $scope.feedback,{
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.token
                }
            })
                .then(respone => {
                    Swal.fire({
                        title: "Gửi phản hồi thành công",
                        width: 600,
                        icon: "success",
                        padding: "3em",
                        color: "#716add",
                        background: "#fff url(/images/trees.png)",
                        backdrop: `
                      rgba(0,0,123,0.4)
                      url("https://i.pinimg.com/originals/4e/bf/f3/4ebff34bb96f7d7b0c157d64bd116085.gif")
                      left top
                      no-repeat
                    `
                    });
                    $location.url("/main")
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire({
                        icon: "error",
                        title: "Gửi phản hồi thất bại",
                        text: "Kiểm tra lại thông tin!",
                    });
                })
        }
    }
});