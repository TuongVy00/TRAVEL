app.controller("mainController", function ($scope, $http, $rootScope) {
    $scope.weather = function () {
        $http.get('https://weatherapi-com.p.rapidapi.com/forecast.json?q=Đà Nẵng&days=1&lang=vi', {
            headers: {
                'X-RapidAPI-Key': '75c8fc4128msh9315e23595e054fp1afc18jsnd70e35f96655',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then(response => {
            $scope.today = {
                location: response.data.location.localtime,
                name: response.data.location.name,
                status: response.data.current.condition.text,
                C: response.data.current.temp_c
            }

        }).catch(error => {

        })
    }

    $scope.findAll = function () {
        $http.get($rootScope.url + "/api/v1/tour/all"
          
        )
            .then(response => {
                $rootScope.toursfirst = response.data;
                $scope.tours = $rootScope.toursfirst

               
                $scope.tours.sort(function (a, b) {
                    return b.views - a.views;
                });
                $scope.tourOutstanding = $scope.tours.slice(0, 6);
                $rootScope.toursfirst.forEach(tour => {
                    if (tour.images) {
                        let imageUrls = tour.images.split(',');
                        imageUrls = imageUrls.map(url => url.trim());
                        tour.images = imageUrls;
                    }
                });
            })
            .catch(error => {
                console.log(error)
            });
    };
    $scope.findAll();
    $http.get($rootScope.url + "/api/v1/home/update/access").then(response => {
    }).catch(error => { })



    $scope.weather()
});