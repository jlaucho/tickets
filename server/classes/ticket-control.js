const fs = require('fs');

class TicketControl {
    constructor() {
        let data = require('../data/data.json');
        console.log( data );
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        if( data.hoy === this.hoy ) { 
            this.ultimo = data.ultimo;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo++;
        this.grabarData();

        return `Ticket ${ this.ultimo }`;
    }
    
    reiniciarConteo(){
        
        this.ultimo = 0;
        
        this.grabarData();
    }

    grabarData(){
        let jsonData = {
            "ultimo" : this.ultimo,
            "hoy" : this.hoy
        }
        let jsonDataString = JSON.stringify( jsonData );
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl: TicketControl
}

function newFunction() {
    return null;
}
