//Comando para establecer la conexion activa al servidor
var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('cajero')) {
    window.location = 'index.html';
    throw new Error('El Cajero es necesario');

}

var escritorio = searchParams.get('cajero');
$('h1').text('Cajero ' + escritorio);
console.log('Cajero', escritorio);

$('button').click(function() {
    socket.emit('atenderTicket', { "cajero": escritorio }, function(callback) {
        console.log(callback);
        $('small').html(callback.numero);
    });
});