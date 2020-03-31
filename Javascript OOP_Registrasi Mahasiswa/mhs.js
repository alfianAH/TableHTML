/*
Gunakan pendekatan OOP, IndexDB API
Minimal ada:
1. constructor
2. getter & setter
3. fungsi tampilkanData()
4. fungsi hapusData()
*/

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// check for support
if(!(window.indexedDB)){
    alert("This browser doesn't support IndexedDB");
}

// Deklarasi variabel
var request, 
    db, 
    transaction, 
    store, 
    index;

const dataMahasiswa = [];

// Panggil init() saat pertama load web
init();

class Data {
    // Constructor
    constructor(nama, nim, prodi, email) {
        this.nama = nama;
        this.nim = nim;
        this.prodi = prodi;
        this.email = email;
    }

    // Getter 
    getNama = function () {
        return this.nama;
    };
    getNim = function () {
        return this.nim;
    };
    getProdi = function () {
        return this.prodi;
    };
    getEmail = function () {
        return this.email;
    };
}

// init: untuk menampilkan data pada saat web di load
function init(){
    // Buka database
    request = window.indexedDB.open("database", 1); 

    request.onupgradeneeded = function(event){
        var db = request.result,
            store = db.createObjectStore("dataMahasiswa"),
            index = store.createIndex("nama", "nama", {unique: false});
    };

    request.onerror = function(event){
        console.log("Error: " + event.target.errorCode);
    };

    request.onsuccess = function(event){
        db = request.result;
        transaction = db.transaction("dataMahasiswa", "readwrite");
        store = transaction.objectStore("dataMahasiswa");
        // dapatkan semua isi database
        var dbMahasiswa = store.getAll();

        dbMahasiswa.onsuccess = function(event){
            header(); // tampilkan header
            // Tampilkan semua isi database
            for(var i=0; i<dbMahasiswa.result.length; i++){
                tampilkanData(i, dbMahasiswa.result[i].nama, dbMahasiswa.result[i].nim, dbMahasiswa.result[i].prodi, dbMahasiswa.result[i].email);
            }
        }
    };
}

// setData: untuk mengambil value dari input
function setData(){
    // Ambil value input user
    var nama = document.forms["registrasiMhs"]["nama"].value;
    var nim = document.forms["registrasiMhs"]["nim"].value;
    var prodi = document.forms["registrasiMhs"]["prodi"].value;
    var email = document.forms["registrasiMhs"]["email"].value;

    // Cek apakah input user valid. Jika ya, maka ...
    if(validateForm(nama, nim, prodi, email)){
        var data = new Data(nama, nim, prodi, email);
        // Masukkan data ke array dalam bentuk dictionary
        dataMahasiswa.push({nama: data.getNama(), nim: data.getNim(), prodi: data.getProdi(), email: data.getEmail()});
        console.log(dataMahasiswa);
        // Tambahkan data ke database
        addData();
    }
}

// addData: menambahkan data ke database
function addData() {
    // Buka database
    request = window.indexedDB.open("database", 1); 
        // db, 
        // transaction, 
        // store, 
        // index;
    
    request.onupgradeneeded = function(event){
        var db = request.result,
            store = db.createObjectStore("dataMahasiswa"),
            index = store.createIndex("nama", "nama", {unique: false});
    };

    request.onerror = function(event){
        console.log("Error: " + event.target.errorCode);
    };
    
    request.onsuccess= function(event){
        db = request.result;
        transaction = db.transaction("dataMahasiswa", "readwrite");
        store = transaction.objectStore("dataMahasiswa");
        index = store.index("nama");
        // dataMahasiswa.push(store.getAll());

        db.onerror = function(event){
            console.log("ERROR: " + event.target.errorCode);
        };

        // Masukkan data ke database
        store.put(dataMahasiswa[dataMahasiswa.length - 1]);
        // Dapatkan isi seluruh database
        var dbMahasiswa = store.getAll();
        
        dbMahasiswa.onsuccess = function(){
            // Munculkan header
            header();
            console.log(dbMahasiswa.result);
            // Tampilkan seluruh data dalam database
            for(var i=0; i<dbMahasiswa.result.length; i++){
                tampilkanData(i, dbMahasiswa.result[i].nama, dbMahasiswa.result[i].nim, dbMahasiswa.result[i].prodi, dbMahasiswa.result[i].email);
            }
        };
    };
}

// hapusData: untuk menghapus data berdasarkan index
function hapusData(index){
    db = request.result;
    transaction = db.transaction("dataMahasiswa", "readwrite");
    store = transaction.objectStore("dataMahasiswa");
    // var delDb;
    // Dapatkan semua isi database
    var dbMahasiswa = store.getAll();

    dbMahasiswa.onsuccess = function(event){
        // Hapus isi database pada index yang ditentukan
        delDb = store.delete(dbMahasiswa.result[index].nim);
        alert(dbMahasiswa.result[index].nim + " sudah dihapus");
        location.reload(); // Reload page
        header(); // Munculkan header
        // Tampilkan semua isi database
        for(var i=0; i<dbMahasiswa.result.length; i++){
            tampilkanData(i, dbMahasiswa.result[i].nama, dbMahasiswa.result[i].nim, dbMahasiswa.result[i].prodi, dbMahasiswa.result[i].email);
        }
    }
}

// header: untuk menampilkan header tabel
function header(){
    // dapatkan id hasilTabel
    var hasilTabel = document.getElementById("hasilTabel");
    // Kosongkan
    hasilTabel.innerHTML = "";
    // Buat elemen tr dan th
    var trHeader = document.createElement("tr"),
        thNama = document.createElement("th"),
        thNim = document.createElement("th"),
        thProdi = document.createElement("th"),
        thEmail = document.createElement("th");

    // Masukkan teks pada th lalu masukkan ke dalam tr
    thNama.textContent = "Nama";
    trHeader.appendChild(thNama);
    thNim.textContent = "Nim";
    trHeader.appendChild(thNim);
    thProdi.textContent = "Prodi";
    trHeader.appendChild(thProdi);
    thEmail.textContent = "Email";
    trHeader.appendChild(thEmail);

    // Masukkan tr ke dalam tabel
    hasilTabel.appendChild(trHeader);
}

// tampilkanData: untuk menampilkan data
function tampilkanData(index, nama, nim, prodi, email){
    // Dapatkan id hasilTabel
    var hasilTabel = document.getElementById("hasilTabel");
    
    // Buat elemen tr td dan input
    var trData = document.createElement("tr"),
        tdNama = document.createElement("td"),
        tdNim = document.createElement("td"),
        tdProdi = document.createElement("td"),
        tdEmail = document.createElement("td"),
        tdHapus = document.createElement("td"),
        hapusBtn = document.createElement("input");
    
    tdHapus.className = "hapus"; // td untuk hapus diberi class hapus
    hapusBtn.type = "button" // jenis input: button
    hapusBtn.id = "index"; // id untuk button
    // Tambahkan event click pada button
    hapusBtn.addEventListener("click", function(){
        hapusData(index);
    });
    hapusBtn.value = "Hapus"; // Teks button

    // Masukkan isi ke dalam td dan masukkan ke dalam tr
    tdNama.textContent = nama;
    trData.appendChild(tdNama);
    tdNim.textContent = nim;
    trData.appendChild(tdNim);
    tdProdi.textContent = prodi;
    trData.appendChild(tdProdi);
    tdEmail.textContent = email;
    trData.appendChild(tdEmail);
    tdHapus.appendChild(hapusBtn);
    trData.appendChild(tdHapus);
    
    // Masukkan tr ke dalam tabel
    hasilTabel.appendChild(trData);
}

// validateForm: mengecek apakah data yang dimasukkan sudah betul dan tidak kosong
function validateForm(nama, nim, prodi, email){
    // Jika kosong, maka alert dan masukkan lagi
    if(nama == "" || nim == "" || prodi == "" || email == ""){
        alert("Anda harus melengkapi semua data.");
        return false;
    } 
    // Jika email tidak memiliki @, maka alert dan masukkan lagi
    else if(email.search("@") == -1){
        alert("Masukkan email yang benar dengan menggunakan @");
        return false;
    } 
    // Selain itu benar.
    else{
        return true;
    }
}
