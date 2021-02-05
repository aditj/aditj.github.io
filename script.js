$(".tablinks").click(function(){
    $('#about-me ul').hide();
    $('#about-me div').hide();
    $('#'+ $(this).data("link")).show();
    $('.tablinks').removeClass('selected-tab');
    $(this).toggleClass("selected-tab");//.css({"border":"2px solid black","border-radius":"2px","font-weight":"bolder"});
})
$('.tablinks').first().click()
particlesJS.load('background', 'data/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });