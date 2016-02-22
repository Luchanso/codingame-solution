/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var LON = parseFloat(readline().replace(',', '.'));
var LAT = parseFloat(readline().replace(',', '.'));
var N = parseInt(readline());
var minimal, place;

function calcDistance(defib) {
    var LONp = parseFloat(defib[4].replace(',', '.'));
    var LATp = parseFloat(defib[5].replace(',', '.'));
    
    var x = (LONp - LON) * Math.cos((LATp + LAT) / 2.0);
    var y = (LATp - LAT);
    
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 6371.0;
}

for (var i = 0; i < N; i++) {
    var DEFIB = readline().split(';');
    
    var distance = calcDistance(DEFIB);
    
    if (minimal === undefined || distance < minimal) {
        minimal = distance;
        place = DEFIB[1];
    }
}

print(place);