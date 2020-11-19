var x; // Array, microstate sequence
var S0; // parsed set of states
var S1; // mapped set of states
var ns; // integer, number of (unique) symbols
var lmap = {}; // dict, map input labels and mapped integers

function parseInput(){
    var s = document.getElementById("paste-input").value;
    //var raw = s.replace(/[^\d-]/g, '').trim(); // integers only
    var raw = s.replace(/[^a-zA-z0-9]/g, '').trim(); // integers only
    //S0 = [...new Set(raw)] // unique values of x
    S0 = Array.from(new Set(raw)); // unique values of x
    S1 = S0.map(a => S0.indexOf(a)); // map to 0,1,...
    S0.forEach(s => lmap[S0.indexOf(s)] = s); //lmap['mapped idx']='parsed idx'
    ns = S1.length;
    x = Array.prototype.map.call(raw, a => S0.indexOf(a));
    let raw_arr = Array.prototype.map.call(raw, a => a);

    document.getElementById("output-sequence-in").innerHTML =
    "<strong>Parsed sequence: </strong>"+raw_arr.slice(0,30).join(', ')+"...";

    document.getElementById("output-symbols-parsed").innerHTML =
    "<strong>Parsed symbols: </strong>" + S0.join(', ');

    document.getElementById("output-symbols-mapped").innerHTML =
    "<strong>Mapped symbols: </strong>" + S1.join(', ');

    document.getElementById("output-sequence-mapped").innerHTML =
    "<strong>Mapped sequence: </strong>" + x.slice(0,30).join(', ') + "...";

    //plotData(x)
}
