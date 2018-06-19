const fs = require('fs');

class Ticket {
    constructor(numero, cajero) {
        this.numero = numero;
        this.cajero = cajero;
    }
}

class TicketControl {
    constructor() {
        let data = require('../data/data.json');
        this.tickets = [];
        this.ultimos4 = [];
        this.ticketAtendidos = [];

        this.ultimo = 0;
        this.hoy = new Date().getDate();


        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
            this.ticketAtendidos = data.ticketAtendidos;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarData();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    atenderTicket(cajero) {
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, cajero);
        this.ticketAtendidos.push(atenderTicket);

        this.ultimos4.unshift(atenderTicket);

        // Se comprueba que no contenga mas de 4 elementos

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // Se elimina el ultimo elemento
        }
        console.log(this.ultimos4);
        this.grabarData();

        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.ticketAtendidos = [];

        this.grabarData();
    }

    grabarData() {
        let jsonData = {
            "ultimo": this.ultimo,
            "hoy": this.hoy,
            "tickets": this.tickets,
            "ticketAtendidos": this.ticketAtendidos,
            "ultimos4": this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl: TicketControl
}

function newFunction() {
    return null;
}