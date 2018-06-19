//Se inicializa el SocketIO
var socket = io();

socket.on('usuarioAtendido', function(data){
    if ( !data.ultimos ){
        return;
    }
    for(var i=1; i < data.ultimos.length + 1; i++) {
        $('#lblTicket'+i).html( data.ultimos[(i - 1)].numero );
        $('#lblEscritorio'+i).html( 'Cajero ' + data.ultimos[(i - 1)].cajero );
    }

});