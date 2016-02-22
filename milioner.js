/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var N = parseInt(readline());
var billioners = {};
var citys = {};

var City = function(name) {
    this.name = name;
    this.money = 0;
    this.timeLider = 0;
}

var Billioner = function(name, money, city) {
    this.name = name;
    this.money = money;
    this.city = city;
}

var move = function(billioner, cityname) {
    billioner.city = cityname;
}

for (var i = 0; i < N; i++) {
    var row = readline().split(' ');
    var billioner = new Billioner(row[0], parseFloat(row[2]), row[1]);
    var city = row[1];
    
    if (!citys.hasOwnProperty(city)) {        
        citys[city] = new City(city);
    }
    
    billioners[billioner.name] = billioner;
}

var sortLowToHight = function(a, b) {
    return b.money - a.money;
}

var calcLiderCity = function(n) {
    var list = [];
    var tempCitys = {};
    
    for (var i in billioners) {
        if (!tempCitys[billioners[i].city]) {
            tempCitys[billioners[i].city] = 0;
        }
        tempCitys[billioners[i].city] += billioners[i].money * n;
    }
    
    for (var j in tempCitys) {
        list.push({money: tempCitys[j], name: j});
    }
    
    list.sort(sortLowToHight);
    
    list.forEach(function(i) {
        printErr(i.name + ' ' + i.money / 10e9);
    });
    
    printErr('n: ' + n);
    printErr()
    
    if (list[0].money == list[1].money) {
        return null;
    } else {
        return list[0].name;
    }
}

var data = readline().split(' ');
var summaryDays = parseInt(data[0]); // Ne zabit' pro eto
var rowsCount = parseInt(data[1]);

var countDay = 0;
var lastDay = 0;
for (var i = 0; i < rowsCount; i++) {
    var row = readline().split(' ');
    var city = row[2];
    var nameBilioner = row[1];    
    
    move(billioners[nameBilioner], city);
    
    if (!citys.hasOwnProperty(city)) {        
        citys[city] = new City(city);
    }
    
    countDay = parseInt(row[0]) - lastDay;
    lastDay = parseInt(row[0]);
    
    var lider = calcLiderCity(countDay);
    if (lider !== null) {
        citys[lider].timeLider += countDay;
    }
}

var list = [];
for (var city in citys) {
    if (citys[city].timeLider !== 0)
        list.push(city + ' ' + citys[city].timeLider);
}

list.sort();

for (var i in list) {
    print(list[i]);
}