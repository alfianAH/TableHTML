function indexDB() {
    return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() {
    if (!indexDB) return;
    // Mebuka database
    var request = indexedDB.open("registrasi_mahasiswa", 1);
    
    request.onupgradeneeded = function(event) {
        var thisDB = event.target.result;
        if (!thisDB.objectStoreNames.contains("mahasiswa")) {
            thisDB.createObjectStore("mahasiswa", { autoIncrement: true });
        }
    }
    request.onsuccess = function(event) {
        db = event.target.result;
        document.querySelector("#submit").addEventListener("click", tampilkanData, false);
    }
}, false);

class Mahasiswa {
    // Constructor
    constructor(nama, nim, prodi, email) {
        this._nama = nama;
        this._nim = nim;
        this._prodi = prodi;
        this._email = email;
    }
    // Getter
    get nama() {
        return this._nama;
    }
    get nim() {
        return this._nim;
    }
    get prodi() {
        return this._prodi;
    }
    get email() {
        return this._email;
    }
    //Setter
    set nama(isi) {
        this._nama = isi;
    }
    set nim(isi) {
        this._nim = isi;
    }
    set prodi(isi) {
        this._prodi = isi;
    }
    set email(isi) {
        this._email = isi;
    }
}

// tampilkanData: untuk menampilkan data yang sudah ada
function tampilkanData() {
    const data = new Mahasiswa();
    // Dapatkan data dari input user
    data.nama = document.getElementById("isiNama").value;
    data.nim = document.getElementById("isiNim").value;
    data.prodi = document.getElementById("isiProdi").value;
    data.email = document.getElementById("isiEmail").value;

    if(validateForm(data.nama, data.nim, data.prodi, data.email)){
        var transaction = db.transaction(["mahasiswa"], "readwrite");
        var store = transaction.objectStore("mahasiswa");
        var dataMahasiswa = {
            nama: data.nama,
            nim: data.nim,
            prodi: data.prodi,
            email: data.email
        };
        // Masukkan data ke database
        var request = store.add(dataMahasiswa);
        request.onsuccess = function(event) {
            console.log("berhasil")
        };
        request.onerror = function(event) {
            console.log("tidak");
        };
        var outs = "";
        // Buat tabelnya
        db.transaction(["mahasiswa"], "readonly").objectStore("mahasiswa").openCursor().onsuccess = function(event) {
            var out = event.target.result;
            if (out) {
                outs += "<tr>";
                for (var field in out.value) {
                    outs += "<td class=tabel> ";
                    outs += out.value[field];
                    outs += " </td>";
                }
                outs += "<td class=\"hapus\"><button onclick=hapusData(" + out.key + ")>Hapus</button></td>";
                outs += "</tr>";
                out.continue();
            }
            document.querySelector("#output").innerHTML = outs;
        };
    }
}

// hapusData untuk menghapus data yang diinginkan
function hapusData(key) {
    var transaction = db.transaction(["mahasiswa"], "readwrite");
    var store = transaction.objectStore("mahasiswa");
    
    var request = store.delete(key); // Hapus data

    // Buat tabelnya
    request.onsuccess = function(event) {
        var outs = "";
        db.transaction(["mahasiswa"], "readonly").objectStore("mahasiswa").openCursor().onsuccess = function(event) {
            var out = event.target.result;
            if (out) {
                outs += "<tr>";
                for (var field in out.value) {
                    outs += "<td class=tabel> ";
                    outs += out.value[field];
                    outs += " </td>";
                }
                outs += "<td class=\"hapus\"><button onclick=hapusData(" + out.key + ")>Hapus</button></td>";
                outs += "</tr>";
                out.continue();
            }
            document.querySelector("#output").innerHTML = outs;
        }
    }
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