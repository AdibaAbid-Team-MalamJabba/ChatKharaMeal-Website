// Script For Slider
$(document).ready(function () {
    $('.my-slider').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.prev-btn',
        nextArrow: '.next-btn',
        speed: 1000,
    });
});
