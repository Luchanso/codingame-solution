/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
var N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
var L = parseInt(inputs[1]); // the number of links
var E = parseInt(inputs[2]); // the number of exit gateways

var graph = [];
var gate = [];

var getCriticalNode = function(virus) {
    printErr('Virus position: ' + virus);
    
    for (var i = 0; i < graph[virus].length; i++) {
        printErr('Now i am checking: ' + graph[virus][i]);
        if (gate.indexOf(graph[virus][i]) != -1) {
            return graph[virus][i] + ' ' + virus;
        }
    }
    
    var rnd = Math.round(Math.random() * N);
    return rnd + ' ' + graph[rnd][0];
}

for (var i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    var N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    var N2 = parseInt(inputs[1]);
    
    if (!graph[N1])
        graph[N1] = new Array();
    
    if (!graph[N2])
        graph[N2] = new Array();
    
    graph[N1].push(N2);
    graph[N2].push(N1);
}

for (var i = 0; i < E; i++) {
    var EI = parseInt(readline()); // the index of a gateway node
    
    gate.push(EI);
}

while (true) {
    
    var SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn
    
    print(getCriticalNode(SI));
}