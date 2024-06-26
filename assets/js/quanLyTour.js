app.controller('ThemTourCtrl', function ($timeout) {

    $timeout(function () {

        var diemDi = document.getElementsByClassName("diemDi")[0];
        var diemDen = document.getElementsByClassName("diemDen")[0];

        // Danh sách các tỉnh thành Việt Nam
        var tinhThanhVietNam = [
            "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
            "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
            "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
            "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang",
            "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu",
            "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
            "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi",
            "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình",
            "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh",
            "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", "Phú Yên", "Cần Thơ",
            "Đà Nẵng", "Hải Phòng", "Hà Nội", "Hồ Chí Minh"
        ];

        // Thêm từng tỉnh thành vào dropdown list 
        for (var i = 0; i < tinhThanhVietNam.length; i++) {
            var option = document.createElement('option');
            option.text = tinhThanhVietNam[i];
            diemDi.appendChild(option);
        }

        for (var i = 0; i < tinhThanhVietNam.length; i++) {
            var option = document.createElement('option');
            option.text = tinhThanhVietNam[i];
            diemDen.appendChild(option);
        }

    });
    // đọc ngày đi và về

    // // Lấy các phần tử input ngày đi và ngày về
    // const departureDateInput = document.querySelector('.ngayDi');
    // const returnDateInput = document.querySelector('.ngayVe');

    // // Lắng nghe sự kiện submit form 
    // document.querySelector('form').addEventListener('submit', (e) => {

    //     // Ngăn chặn submit mặc định
    //     e.preventDefault();

    //     // Lấy giá trị ngày đi và ngày về
    //     const departureDate = departureDateInput.value;
    //     const returnDate = returnDateInput.value;

    //     // Chuyển chuỗi ngày thành đối tượng Date
    //     const departure = new Date(departureDate);
    //     const returnn = new Date(returnDate);

    //     // Tính số ngày chênh lệch
    //     const diffTime = Math.abs(returnn - departure);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // // In kết quả ra console
    // console.log(`Số ngày chênh lệch: ${diffDays} ngày`);
    //});
    //thêm form
    
    // Lấy nút submit
    const submitBtn = document.querySelector('form input[type="submit"]');
    const submitBtn1 = document.getElementById('luuTourDuLich');
    let count = 0;
    

    submitBtn.addEventListener('click', (e) => {
        count++;
        // Ngăn chặn submit mặc định
        e.preventDefault();
        
        // Thêm form mới 
        const newForm = `
                    <h6 class="station">Điểm dừng chân ${count}</h6>
                    <form class="cf">
                        <div class="">
                            <select id="input-option">
                                <option value="">Lựa chọn địa điểm dừng chân</option>
                                <option value="option1">TP HCM</option>
                                <option value="option2">Nha Trang</option>
                                <option value="option3">Khánh Hòa</option>
                            </select>
                            <select id="input-option">
                                <option value="">Lựa chọn xe đưa đón</option>
                                <option value="option1"></option>
                            </select>
                            <select id="input-option">
                                <option value="">Lựa chọn khách sạn</option>
                                <option value="option1"></option>
                            </select>
                        </div>
                    </form>
                    `;

                    if(count==1){
                        submitBtn1.removeAttribute('hidden');
                        submitBtn1.style.backgroundColor = '#e74c3c';
                    }
        // Chèn form mới vào trước nút submit
        submitBtn.insertAdjacentHTML('beforebegin', newForm);
        

    });

});