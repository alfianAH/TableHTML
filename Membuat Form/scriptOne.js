function getBanyakData(){
	var number = 0;
	number = document.forms["inputNilai"]["banyakData"].value;
	number = parseInt(number);

	return number;
}

function printNilai(){
	var banyakData = getBanyakData();

	for(var i=0; i<banyakData; i++){
		document.getElementById('printData').innerHTML = "<p>Nilai " + (i+1) ": <input type=\"text\" name=\"value1\"/></p>";
		document.getElementById('printData').innerHTML = "";
	}
}

function getNumber(){
	var number = [];
	var banyakData = getBanyakData();

	for(var i=0; i<banyakData; i++){
		number[i] = document.forms["inputNilai"]["value"+(i+1)].value;
		number[i] = parseInt(number[i]);
	}
	return number;
}

// function average: menghitung nilai rata-rata
function averageInput(){
	var number = getNumber();
	var sum = 0;
	var average = 0;

	for(var i=0; i<number.length; i++){
		sum += number[i];
	}
	average = sum/number.length;
	
	document.getElementById('average').innerHTML = "Nilai rata-rata = " + average;
	 
}

// function median: menghitung nilai tengah
function median(values){
	// Sort ascending
	values.sort( function(a,b) {return a - b;} );

	// Dapatkan nilai tengah
    var half = Math.floor(values.length/2);

    // Jika length dibagi 2 sisa 1 (true), maka kembalikan nilai tengah
    if(values.length % 2)
        return values[half];
    // Jika length dibagi 2 sisa 0 (false), maka kembalikan (a+b)/2
    else
        return (values[half-1] + values[half]) / 2.0;
}

// function hitungMedian: menghitung nilai tengah
function hitungMedian(){
	var number = getNumber();
	var nilaiMedian = median(number);

	document.getElementById('median').innerHTML = "Median = " + nilaiMedian;
}

// function nilaiTerbesar: mendapatkan nilai terbesar dari nilai yang diinput
function nilaiTerbesar(){
	var number = getNumber();
	var nilaiMax = Math.max(...number);

	document.getElementById('maxValue').innerHTML = "Nilai terbesar = " + nilaiMax;
}

// function nilaiTerbesar: mendapatkan nilai terkeci; dari nilai yang diinput
function nilaiTerkecil(){
	var number = getNumber();
	var nilaiMin = Math.min(...number);
	
	document.getElementById('minValue').innerHTML = "Nilai terkecil = " + nilaiMin;
}

// function hasil: menampilkan hasil dari average, median, nilaiTerbesar, nilaiTerkecil
function hasil(){
	averageInput();
	hitungMedian();
	nilaiTerbesar();
	nilaiTerkecil();
}

// function reset: mereset array
function resetValue(){
	document.getElementById('average').innerHTML = "";
	document.getElementById('median').innerHTML = "";
	document.getElementById('maxValue').innerHTML = "";
	document.getElementById('minValue').innerHTML = "";
}