// Data menu makanan
const menuMakanan = [
    {
        nama: "Chicken Boneless Blackpepper",
        harga: "Rp 12.000",
        deskripsi: "Ayam tanpa tulang dengan saus lada hitam yang lezat",
        gambar: "images/pic3.JPG"
    },
    {
        nama: "Chicken Boneless BBQ",
        harga: "Rp 12.000",
        deskripsi: "Ayam tanpa tulang dengan saus BBQ yang lezat",
        gambar: "images/pic4.JPG"
    },
    {
        nama: "Chicken Boneless Geprek",
        harga: "Rp 12.000",
        deskripsi: "Ayam tanpa tulang dengan sambal geprek yang pedas",
        gambar: "images/pic5.JPG"
    },
    {
        nama: "Cheese Burger",
        harga: "Rp 12.000",
        deskripsi: "Burger dengan keju leleh, daging sapi panggang, sayuran segar, dan saus spesial",
        gambar: "images/pic6.JPG"
    },
    {
        nama: "Spaghetti Vegetables",
        harga: "Rp 12.000",
        deskripsi: "Spaghetti dengan sayuran segar dan saus spesial",
        gambar: "images/pic11.JPG"
    },
    {
        nama: "Tornado",
        harga: "Rp 12.000",
        deskripsi: "Fillet ayam crispy, dikombinasikan dengan sayuran campur, saus tomat dan mayonaise yang dibungkus dengan tortilla sehat",
        gambar: "images/pic13.JPG"
    },
    {
        nama: "Baso Unik Kuah Tomyam",
        harga: "Rp 12.000",
        deskripsi: "Bakso dengan kuah tom yam yang pedas dan segar khas Thailand",
        gambar: "images/pic14.JPG"
    },
    {
        nama: "Chicken Crispy Boneless",
        harga: "Rp 12.000",
        deskripsi: "Ayam tanpa tulang yang digoreng garing dengan tepung renyah",
        gambar: "images/pic15.JPG"
    },
    {
        nama: "Chicken Boneless Cheese",
        harga: "Rp 12.000",
        deskripsi: "Ayam tanpa tulang dengan keju leleh yang gurih",
        gambar: "images/pic19.JPG"
    },
    {
        nama: "French Fries",
        harga: "Rp 12.000",
        deskripsi: "Kentang goreng renyah yang disajikan dengan saus sambal dan mayonaise",
        gambar: "images/pic20.JPG"
    },
    {
        nama: "Giant Burger",
        harga: "Rp 12.000",
        deskripsi: "Burger jumbo dengan daging sapi tebal, keju, sayuran segar, dan saus spesial",
        gambar: "images/pic21.JPG"
    }
];

// Data menu minuman
const menuMinuman = [
    {
        nama: "Green Tea",
        harga: "Rp 12.000",
        deskripsi: "Teh hijau yang menyegarkan dengan aroma khas dan manfaat antioksidan",
        gambar: "images/pic7.JPG"
    },
    {
        nama: "Ice Milky Dark Chocolate",
        harga: "Rp 12.000",
        deskripsi: "Minuman coklat dingin dengan susu yang creamy dan lembut",
        gambar: "images/pic8.JPG"
    },
    {
        nama: "Lemon Mango Squash",
        harga: "Rp 12.000",
        deskripsi: "Perpaduan segar jus mangga dan lemon yang menyegarkan dengan sentuhan squash",
        gambar: "images/pic9.JPG"
    },
    {
        nama: "Red Velvet",
        harga: "Rp 12.000",
        deskripsi: "Minuman red velvet yang lembut dan creamy dengan rasa khas yang menggoda",
        gambar: "images/pic10.JPG"
    },
    {
        nama: "Stroberry Probiotik",
        harga: "Rp 12.000",
        deskripsi: "Minuman probiotik rasa stroberi yang menyegarkan dan baik untuk kesehatan pencernaan",
        gambar: "images/pic12.JPG"
    },
    {
        nama: "Black Coffee",
        harga: "Rp 12.000",
        deskripsi: "Kopi hitam murni dengan cita rasa kuat dan aroma yang menggoda",
        gambar: "images/pic18.JPG"
    },
    {
        nama: "Ice Lemon Tea",
        harga: "Rp 12.000",
        deskripsi: "Es teh lemon segar yang menyegarkan dengan perpaduan rasa teh dan lemon yang pas",
        gambar: "images/pic22.JPG"
    },
    {
        nama: "Thai Tea",
        harga: "Rp 12.000",
        deskripsi: "Minuman teh khas Thailand dengan rasa manis dan creamy yang menyegarkan",
        gambar: "images/pic23.JPG"
    }
];

// Fungsi untuk membuat kartu menu
function buatKartuMenu(item) {
    return `
        <div class="menu-card">
            <img src="${item.gambar}" alt="${item.nama}">
            <div class="menu-info">
                <h3>${item.nama}</h3>
                <p>${item.deskripsi}</p>
                <p class="harga">${item.harga}</p>
            </div>
        </div>
    `;
}

// Fungsi untuk menampilkan menu
function tampilkanMenu() {
    const makananContainer = document.getElementById('makanan-container');
    const minumanContainer = document.getElementById('minuman-container');

    // Menampilkan menu makanan
    makananContainer.innerHTML = menuMakanan
        .map(item => buatKartuMenu(item))
        .join('');

    // Menampilkan menu minuman
    minumanContainer.innerHTML = menuMinuman
        .map(item => buatKartuMenu(item))
        .join('');
}

// Memanggil fungsi tampilkan menu saat halaman dimuat
document.addEventListener('DOMContentLoaded', tampilkanMenu); 