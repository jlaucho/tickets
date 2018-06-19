const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');
let tickectControl = new TicketControl();
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = tickectControl.siguiente();
        callback(siguiente);
        console.log(siguiente);
    });

    client.emit('estadoActual', {
        "numero": tickectControl.getUltimoTicket()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.cajero) {
            return callback({
                error: true,
                message: 'El Cajero es necesario'
            });
        }
        let atenderticket = tickectControl.atenderTicket(data.cajero);
        callback(atenderticket);

        // Actualizar la pantalla

    });
});