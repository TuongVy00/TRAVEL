angular.module('app').controller('Addlocation', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    // Your controller's code...
    // Controller logic

    $scope.s = ''
    $scope.headerText = "Thêm địa điểm"; 
    document.getElementById('save').disabled = true
    $scope.email = $rootScope.email;
    var firebaseConfig = {
        apiKey: "AIzaSyBnSgLNQca9x6g5SFN8CU9YA1tBz5gGn6c",
        authDomain: "travel-bee-e0b59.firebaseapp.com",
        projectId: "travel-bee-e0b59",
        storageBucket: "travel-bee-e0b59.appspot.com",
        messagingSenderId: "991526403311",
        appId: "1:991526403311:web:24e7a3ba76e7d0d769af1a",
        measurementId: "G-DE29CFQQMY"
    };
    var config = firebase.initializeApp(firebaseConfig);
    $scope.image = ''
    document.getElementById('fileInputfb').onchange = function (e) {
        let files = e.target.files;
        $scope.uploadfirebase(files)

    }



    $scope.uploadfirebase = function (files) {
        const ref = firebase.storage().ref();

        if (files.length === 0) {
            console.log("Vui lòng chọn ít nhất một tệp hình ảnh.");
            return;
        }

        Swal.fire({
            title: 'Vui lòng đợi upload ảnh!',
            text: 'Có thể mấy khoản 3s - 5s.',
            icon: 'warning',
            timer: 3000
           
        });

        const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const metadata = {
                contentType: file.type,
            };
            const name = file.name;
            const uploadIMG = ref.child(name).put(file, metadata);

            const promise = uploadIMG
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((url) => {
                    return url;
                });

            uploadPromises.push(promise);
        }

        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                list = downloadURLs;

                console.log(list.join(","))
                Swal.fire({
                    title: 'Success!',
                    text: 'Upload image thành công',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

               document.getElementById('save').disabled = false
            })

            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to upload images: ' + error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }


    // Function to submit form
    $scope.submitForm = function () {
        var imagesString = list.join(",");
        // Assuming you have model bindings for these fields in your form
        var locationData = {
            title: $scope.title,
            address: $scope.address,
            description: $scope.description,
            images: imagesString, // Array of image URLs from Firebase
            latitude: $scope.latitude,
            longitude: $scope.longitude,
            email: $scope.email // Assuming you have the user's email
        };


        $http.post($rootScope.url+'/api/v1/location/save', locationData, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        })
            .then(function (response) {
                console.log('Data submitted successfully:', response.data);
                Swal.fire({
                    title: 'Cập nhật thành công!',
                    text: 'Bạn sẽ được đưa về trang chính sau 3s.',
                    icon: 'success',
                    timer: 3000,
                    willClose: () => {
                        $location.path('/quanLyDiaDiem');
                        $scope.$apply(); // Needed to trigger a digest cycle
                    }
                });
                // Add any success notification or actions here
            })
            .catch(function (error) {
                console.error('Error submitting data:', error);
                // Add error handling logic here, possibly similar to quanlydiadiemController
                Swal.fire({
                    title: 'Submission Error!',
                    text: 'There was a problem saving the location: ' + error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }
    
}]);

