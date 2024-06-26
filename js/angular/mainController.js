app.controller("mainController", function ($scope, $rootScope, $http) {

    $scope.todayRevenue = ''
    $scope.ticketToday = ''
    $scope.countAccount = ''
    $scope.countTour = ''
    $scope.ordersactive = ''
    $scope.ordersUhactive = ''

    function getdate() {
        let a = new Date();

        let year = a.getFullYear();
        let month = String(a.getMonth() + 1).padStart(2, '0'); // Thêm số 0 ở đầu nếu cần
        let day = String(a.getDate()).padStart(2, '0'); // Thêm số 0 ở đầu nếu cần

        let formattedDate = year + '-' + month + '-' + day;
        return formattedDate;
    }

    $http.get($rootScope.url + '/api/v1/staff/countTour', {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.countTour = response.data
    })

    $http.get($rootScope.url + '/api/v1/staff/countAccount', {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.countAccount = response.data
    })



    $http.get($rootScope.url + '/api/v1/staff/TodayRevenue?today=' + getdate(), {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.todayRevenue = response.data
    })

    $http.get($rootScope.url + '/api/v1/staff/ticketToday?today=' + getdate(), {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.ticketToday = response.data
    })


    $scope.dataTodayAccess = ''
    const ctx = document.getElementById('myChart');
    $scope.lineChartAcess = function (day) {

        $http.get($rootScope.url + '/api/v1/staff/access/linchart/' + day, {
            headers: {
                'Authorization': 'Bearer ' + $rootScope.token
            }
        }).then(function (response) {
            $scope.dataTodayAccess = response.data
            if(response.data!== undefined && response.data !== null){
                const data = {
                    labels: $scope.dataTodayAccess.map(item => item[0]),
                    datasets: [{
                        label: 'Biểu đồ theo dõi truy cập',
                        data: $scope.dataTodayAccess,
                        fill: false,
                        borderColor: 'rgb(190, 182, 092)',
                    }]
                };
                const config = {
                    type: 'line',
                    data: data,
                    options: {
                        animations: {
                            tension: {
                                duration: 1000,
                                easing: 'linear',
                                from: 1,
                                to: 0,
                                loop: true
                            }
                        },
                        scales: {
                            y: {
                                min: 0,
                                max: 100
                            }
                        }
                    }
                };
                const chart = new Chart(ctx, config);
            }
        })
    }

    $scope.lineChartAcess(6)


    $http.get($rootScope.url + '/api/v1/staff/orders/countactive', {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.ordersactive = response.data
    })

    $http.get($rootScope.url + '/api/v1/staff/orders/countuhactive', {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.ordersUhactive = response.data
    })
    

    const doughnut = document.getElementById('doughnut');
    $scope.doughnutChartOrders = function () {
        const data = {
            labels: [
                'Tour đã hủy',
                'Tour đã bán',
            ],
            datasets: [{
                label: 'Số lượng',
                data: [$scope.ordersUhactive, $scope.ordersactive],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)'
                ],
                hoverOffset: 3
            }]
        };
        const config = {
            type: 'doughnut',
            data: data,
        };
        try {
            new Chart(doughnut, config);

        } catch (error) {
                  
        }
    }
    
    setInterval(function(){
        $scope.doughnutChartOrders()
    },2000)



    const linemoney = document.getElementById('linemoney');
    $scope.linemoney = ''
    $http.get($rootScope.url + '/api/v1/staff/orders/moneydaily', {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.linemoney = response.data
        const data = {
            labels: $scope.linemoney.map(item => item[0]),
            datasets: [{
                label: ' Số Tiền',
                data: $scope.linemoney.map(item => item[1]),
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
        };
        new Chart(linemoney, config);
    })

    $scope.trending =[]
    $http.get($rootScope.url + '/api/v1/staff/tour/trending', {
        headers: {
            'Authorization': 'Bearer ' + $rootScope.token
        }
    }).then(function (response) {
        $scope.trending = response.data
    
    })


});
