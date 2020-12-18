$(".tablinks").click(function(){
    $('#about-me ul').hide();
    $('#about-me div').hide();
    $('#'+ $(this).data("link")).show();
    $('.tablinks').css({"border-bottom":"none","font-weight":"normal"});
    $(this).css({"border-bottom":"1px solid black","font-weight":"bolder"});
})
$('#projects-button').click();
particlesJS.load('background', 'data/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });