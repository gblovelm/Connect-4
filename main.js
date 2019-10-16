//console.log('here i am');
$(document).ready(function() {
    // TODO grid
    const connect4 = new Connect4('#connect4');  // pass in connect4 id to this object

    connect4.onPlayerMove = function() {  // callback listener
        $('#player').text(connect4.player);
    }

    $('#restart').click(function() {
        connect4.restart();
    })
});