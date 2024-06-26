// Thêm sự kiện click cho nút in
document.addEventListener('DOMContentLoaded', function () {
    const printBtn = document.getElementById('printTicket');
    
    if (printBtn) {
        printBtn.addEventListener('click', function () {
            printTicket();
        });
    }
});

function printTicket() {
    // Đường dẫn đến trang printTicket.html
    const url = './printTicket.html';

    // Sử dụng fetch để tải nội dung của trang
    fetch(url)
        .then(response => response.text())
        .then(htmlContent => {
            // Tạo một đối tượng jsPDF
            const pdf = new jsPDF();

            // Thêm nội dung của trang vào file PDF
            pdf.fromHTML(htmlContent, 15, 15);

            // Tải xuống file PDF với tên là "VeDatCho.pdf"
            pdf.save('VeDatCho.pdf');
        })
        .catch(error => {
            console.error('Error fetching HTML content:', error);
        });
}
