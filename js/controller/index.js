define(['lib/zepto', 'lib/template', 'api/iconlistApi','api/today_activityapi','api/todaySpecialAPI','api/bk-select','api/tm-sale','api/bannerapi','lib/swiper.min'], 
	   function(undefined, tpl, indexapi,today_activityapi,today_specialapi,bk_selectapi,today_Saleapi,nav_bannerapi) {

		
	   	var banner = tpl("slider_list",nav_bannerapi);
		$(".swiper-container").html(banner);

		var icon= tpl("test",indexapi);
		$(".nav").html(icon);

		var actity = tpl("today_list",today_activityapi);
		$(".today_list").html(actity);

		var special = tpl("test_main_list",today_specialapi);
		$(".main_list").html(special);

		var jx_list = tpl("jx_main_list",bk_selectapi);
		$(".jinxuan_main_list").html(jx_list);

		var td_sale = tpl("sp_main_list",today_Saleapi);
		$(".special_sale").html(td_sale);

		
		




        var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable :true,
        effect: 'cube',
        loop : true,
        // grabCursor: true,
        autoplay: 3000,
        autoplayDisableOnInteraction : false,
        cube: {
            shadow: false,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
        }

     });

        
})

