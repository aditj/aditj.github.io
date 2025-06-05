$(".tablinks").click(function(){
    $('#about-me ul').hide();
    $('#about-me div').hide();
    $('#'+ $(this).data("link")).show();
    $('.tablinks').removeClass('selected-tab');
    $(this).toggleClass("selected-tab");//.css({"border":"2px solid black","border-radius":"2px","font-weight":"bolder"});
})
$('.tablinks').first().click()

document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        var setting = localStorage.getItem('dark-mode') === 'true';
        document.body.classList.toggle('dark-mode', setting);
        toggle.checked = setting;
        toggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('dark-mode', this.checked);
        });
    }
});
