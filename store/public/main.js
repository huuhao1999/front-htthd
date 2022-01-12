$(document).ready(function(){
    $('.slick-thumb_produc').slick({
        infinite:false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay:false,
        focusOnSelect: true,
        prevArrow: "<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    });

    $('.slick-related-product').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay:true,
        focusOnSelect: true,
        prevArrow: "<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow:4,
                }
            },
            {
                breakpoint: 801,
                settings: {
                    slidesToShow:3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow:1,
                }
            }
        ]
    });


    $('.slick-tc').slick({
        //vertical:true,//Chay dọc
        slidesToShow: 5,    //Số item hiển thị
        slidesToScroll: 1, //Số item cuộn khi chạy
        autoplay:true,  //Tự động chạy
        autoplaySpeed:3000,  //Tốc độ chạy
        speed:1000,//Tốc độ chuyển slider
        arrows:false, //Hiển thị mũi tên
        dots:false,  //Hiển thị dấu chấm
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow:4,
                }
            },
            {
                breakpoint: 801,
                settings: {
                    slidesToShow:3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow:1,
                }
            }
        ]
    });

    $('.slick-km').slick({
        //vertical:true,//Chay dọc
        slidesToShow: 4,    //Số item hiển thị
        slidesToScroll: 1, //Số item cuộn khi chạy
        autoplay:false,  //Tự động chạy
        autoplaySpeed:3000,  //Tốc độ chạy
        speed:1000,//Tốc độ chuyển slider
        arrows:true, //Hiển thị mũi tên
        dots:false,  //Hiển thị dấu chấm
        prevArrow: "<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow:4,
                }
            },
            {
                breakpoint: 801,
                settings: {
                    slidesToShow:3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow:1,
                }
            }
        ]
    });

    $('.slick-top').slick({
        vertical:true,//Chay dọc
        slidesToShow:1,
        slidesToScroll: 1, //Số item cuộn khi chạy
        autoplay:true,  //Tự động chạy
        autoplaySpeed:3200,  //Tốc độ chạy
        speed:1000,//Tốc độ chuyển slider
        arrows:false, //Hiển thị mũi tên
        dots:false,  //Hiển thị dấu chấm
    });

    
});

