$( document ).ready(function() {
var total; 

total = $('.tile').length;
$('#wrapper').prepend(`<h1>Confirmed Guests: ${total}</h1>`)

});