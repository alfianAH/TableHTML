/*
Gunakan pendekatan OOP, IndexDB API
Minimal ada:
1. constructor
2. getter & setter
3. fungsi tampilkanData()
4. fungsi hapusData()
*/

function Data(nama, nim, prodi, email){
    this.nama = nama;
    this.nim = nim;
    this.prodi = prodi;
    this.email = email;

    this.getNama = function(){
        return this.nama;
    }

    this.getNim = function(){
        return this.nim;
    }

    this.getProdi = function(){
        return this.prodi;
    }

    this.getEmail = function(){
        return this.email;
    }
}

function setData(){
    var nama = document.forms["registrasiMhs"]["nama"].value;
    var nim = document.forms["registrasiMhs"]["nim"].value;
    var prodi = document.forms["registrasiMhs"]["prodi"].value;
    var email = document.forms["registrasiMhs"]["email"].value;

    var data = new Data(nama, nim, prodi, email);
    
    return data;
}