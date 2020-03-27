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

    // Getter
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

    if(validateForm(nama, nim, prodi, email)){
        var data = new Data(nama, nim, prodi, email);
    
        tampilkanData(data.getNama(), data.getNim(), data.getProdi(), data.getEmail());
    }
}

function validateForm(nama, nim, prodi, email){
    if(nama == "" || nim == "" || prodi == "" || email == ""){
        alert("Anda harus melengkapi semua data.");
        return false;
    } else{
        return true;
    }
}

function tampilkanData(nama, nim, prodi, email){
    var namaHtml = "<td class=\"nama\">" + nama + "</td>";
    var nimHtml = "<td class=\"nim\">" + nim + "</td>";
    var prodiHtml = "<td class=\"prodi\">" + prodi + "</td>";
    var emailHtml = "<td class=\"email\">" + email + "</td>";
    var hapusHtml = "<td class=\"hapus\">" + "<input type=\"button\" value=\"Hapus\" onclick=\"hapusData()\"/>" + "</td>";

    document.getElementById('hasil').innerHTML += "<tr>" + namaHtml + nimHtml + prodiHtml + emailHtml + hapusHtml + "</tr>";
}