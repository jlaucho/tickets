//Comando para establecer la conexion activa al servidor
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(ticket) {
    $('#lblNuevoTicket').html(ticket.numero);
});

$('button').click(function() {
    socket.emit('siguienteTicket', {}, function(siguienteTicket) {
        $('#lblNuevoTicket').html(siguienteTicket);
    });
});