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

var request, 
    db, 
    transaction, 
    store, 
    index;

const dataMahasiswa = [];
init();

class Data {
    constructor(nama, nim, prodi, email) {
        this.nama = nama;
        this.nim = nim;
        this.prodi = prodi;
        this.email = email;
    }

    // Getter 
    // GET MAHASISWA PADA INDEX ???
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

function setData(){
    var nama = document.forms["registrasiMhs"]["nama"].value;
    var nim = document.forms["registrasiMhs"]["nim"].value;
    var prodi = document.forms["registrasiMhs"]["prodi"].value;
    var email = document.forms["registrasiMhs"]["email"].value;

    if(validateForm(nama, nim, prodi, email)){
        var data = new Data(nama, nim, prodi, email);
        dataMahasiswa.push({nama: nama, nim: nim, prodi: prodi, email: email});
        console.log(dataMahasiswa);
        addData();
    }
}

function addData() {
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

        store.put(dataMahasiswa[dataMahasiswa.length - 1]);
        var dbMahasiswa = store.getAll();
        
        dbMahasiswa.onsuccess = function(){
            header();
            console.log(dbMahasiswa.result);
            for(var i=0; i<dbMahasiswa.result.length; i++){
                tampilkanData(i, dbMahasiswa.result[i].nama, dbMahasiswa.result[i].nim, dbMahasiswa.result[i].prodi, dbMahasiswa.result[i].email);
            }
        };
    };
}

function hapusData(index){
    db = request.result;
    transaction = db.transaction("dataMahasiswa", "readwrite");
    store = transaction.objectStore("dataMahasiswa");
    // var delDb;
    var dbMahasiswa = store.getAll();

    dbMahasiswa.onsuccess = function(event){
        delDb = store.delete(dbMahasiswa.result[index].nim);
        alert(dbMahasiswa.result[index].nim + " sudah dihapus");
        location.reload();
        header();
        for(var i=0; i<dbMahasiswa.result.length; i++){
            tampilkanData(i, dbMahasiswa.result[i].nama, dbMahasiswa.result[i].nim, dbMahasiswa.result[i].prodi, dbMahasiswa.result[i].email);
        }
    }
}

function init(){
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
        var dbMahasiswa = store.getAll();

        dbMahasiswa.onsuccess = function(event){
            header();
            for(var i=0; i<dbMahasiswa.result.length; i++){
                tampilkanData(i, dbMahasiswa.result[i].nama, dbMahasiswa.result[i].nim, dbMahasiswa.result[i].prodi, dbMahasiswa.result[i].email);
            }
        }
    };
}

function header(){
    var hasilTabel = document.getElementById("hasilTabel");
    hasilTabel.innerHTML = "";
    var trHeader = document.createElement("tr"),
        thNama = document.createElement("th"),
        thNim = document.createElement("th"),
        thProdi = document.createElement("th"),
        thEmail = document.createElement("th");

    thNama.textContent = "Nama";
    trHeader.appendChild(thNama);
    thNim.textContent = "Nim";
    trHeader.appendChild(thNim);
    thProdi.textContent = "Prodi";
    trHeader.appendChild(thProdi);
    thEmail.textContent = "Email";
    trHeader.appendChild(thEmail);

    hasilTabel.appendChild(trHeader);
}

function tampilkanData(index, nama, nim, prodi, email){
    var hasilTabel = document.getElementById("hasilTabel");
    
    var trData = document.createElement("tr"),
        tdNama = document.createElement("td"),
        tdNim = document.createElement("td"),
        tdProdi = document.createElement("td"),
        tdEmail = document.createElement("td"),
        tdHapus = document.createElement("td"),
        hapusBtn = document.createElement("input");
    
    tdHapus.className = "hapus";
    hapusBtn.type = "button"
    hapusBtn.id = "index";
    // hapusBtn.onclick = "hapusData(index)";
    hapusBtn.addEventListener("click", function(){
        hapusData(index);
    });
    hapusBtn.value = "Hapus";

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
    
    hasilTabel.appendChild(trData);
}

function validateForm(nama, nim, prodi, email){
    if(nama == "" || nim == "" || prodi == "" || email == ""){
        alert("Anda harus melengkapi semua data.");
        return false;
    } else{
        return true;
    }
}
