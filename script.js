const produk1 = { id: 1, nama: "Laptop", harga: 7000000, stok: 3 };
const produk2 = { id: 2, nama: "Mouse", harga: 150000, stok: 5 };
const produk3 = { id: 3, nama: "Keyboard", harga: 300000, stok: 2 };
const produk4 = { id: 4, nama: "Headset", harga: 250000, stok: 0 }; 
const produk5 = { id: 5, nama: "Monitor", harga: 1500000, stok: 4 }; 



const produkList = [produk1, produk2, produk3, produk4, produk5];

let keranjang = [];



function renderProduk() {
    const container = document.querySelector("#daftar-produk");
    container.innerHTML = ""; 

    for (let i = 0; i < produkList.length; i++) {
        const prod = produkList[i];


        const card = document.createElement("div");
        card.className = "produk-card";

        const title = document.createElement("h3");
        title.appendChild(document.createTextNode(prod.nama));

        const info = document.createElement("p");
        info.appendChild(document.createTextNode(`Harga: Rp ${prod.harga.toLocaleString()} | Stok: ${prod.stok}`));

        const btnBeli = document.createElement("button");
        btnBeli.appendChild(document.createTextNode("Tambah ke Keranjang"));

        if (prod.stok === 0) {
            card.style.backgroundColor = "#ffe6e6";
            card.style.borderColor = "#ff4d4d";
        }

        btnBeli.onclick = function () {
            tambahKeKeranjang(prod.id);
        };

        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(btnBeli);
        container.appendChild(card);
    }
}



function tambahKeKeranjang(id) {
    const produk = produkList.find(p => p.id === id);

    if (produk.stok <= 0) {
        alert("Maaf, stok produk ini sudah habis!");
        return;
    }

    produk.stok--;
    keranjang.push({ ...produk });

    updateKeranjangView();
    renderProduk();
}

function hitungTotal() {
    let total = 0;
  
    for (let index in keranjang) {
        total += keranjang[index].harga;
    }
    return total;
}


function updateKeranjangView() {
    const listKeranjang = document.getElementById("list-keranjang");
    const infoTotal = document.getElementById("info-total");

    listKeranjang.innerHTML = "";

    for (let i = 0; i < keranjang.length; i++) {
        const item = keranjang[i];

        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${item.nama} - Rp ${item.harga.toLocaleString()} `));

        const btnHapus = document.createElement("button");
        btnHapus.appendChild(document.createTextNode("Hapus"));

        btnHapus.onclick = function () {
            if (confirm(`Hapus ${item.nama} dari keranjang?`)) {
                hapusItem(i, item.id);
            }
        };

        li.appendChild(btnHapus);
        listKeranjang.appendChild(li);
    }

    const totalHarga = hitungTotal();
    infoTotal.innerHTML = `<strong>Total Item:</strong> ${keranjang.length} <br> <strong>Total Harga:</strong> Rp ${totalHarga.toLocaleString()}`;
}

function hapusItem(index, produkId) {
  
    const prod = produkList.find(p => p.id === produkId);
    if (prod) prod.stok++;

    const listItems = document.querySelectorAll("#list-keranjang li");
    if (listItems[index]) {
        document.getElementById("list-keranjang").removeChild(listItems[index]);
    }

    keranjang.splice(index, 1);

    updateKeranjangView();
    renderProduk();
}


document.getElementById("btn-undo").onclick = function () {
    if (keranjang.length === 0) {
        alert("Keranjang belanja kosong!");
        return;
    }

    if (confirm("Batalkan item terakhir yang dimasukkan?")) {
        const itemTerakhir = keranjang.pop();

        const prod = produkList.find(p => p.id === itemTerakhir.id);
        if (prod) prod.stok++;

        updateKeranjangView();
        renderProduk();
    }
};


document.getElementById("btn-checkout").onclick = function () {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    const nama = prompt("Masukkan nama pembeli:");

    if (nama) {

        const daftarItem = keranjang.map(item => item.nama).join(", ");
        const total = hitungTotal();

        document.getElementById("ringkasan").innerHTML = `
            <strong>Ringkasan Pesanan:</strong><br>
            Nama Pembeli: ${nama}<br>
            Item: ${daftarItem}<br>
            Total Bayar: Rp ${total.toLocaleString()}
        `;

        keranjang = [];
        updateKeranjangView();
    }
};

renderProduk();
updateKeranjangView();