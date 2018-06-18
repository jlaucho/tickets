const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');
let tickectControl = new TicketControl();
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', ( ticket )=>{
        console.log(ticket.numero);
    });

});