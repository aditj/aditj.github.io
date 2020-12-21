$(".tablinks").click(function(){
    $('#about-me ul').hide();
    $('#about-me div').hide();
    $('#'+ $(this).data("link")).show();
    $('.tablinks').css({"border":"none","font-weight":"normal"});
    $(this).css({"border":"2px solid black","border-radius":"2px","font-weight":"bolder"});
})
$('#projects-button').click();
particlesJS.load('background', 'data/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });