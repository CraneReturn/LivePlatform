const mux = require('mux.js');

function initMUX() {
    const transmuxer = new mux.Transmuxer();
}

self.onmessage = function(event) {

    const data = event.data;

    initMUX();
    
    postMessage(data);

};

