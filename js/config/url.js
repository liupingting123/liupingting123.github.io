define('config/url', function () {
    var self = this;

    return (function() {
        //租赁服务本地服务
        var RentlocalUrl = '//m.muyingzhijia.com/api/';
        //静态文件地址
        var LocalUrl = '//static.boodoll.cn/wap/v1/';
        //本地服务
        var localloginDomain = '//m.muyingzhijia.com/';
        //母婴之家会员中心
        var memberDomain = '//vip.api.muyingzhijia.com/json/reply/'; 
        //订单相关操作
        var orderDomain = '//buy.api.muyingzhijia.com/json/reply/'; 
        //订单物流
        var logsticsDomain = '//dcs.api.muyingzhijia.com/json/reply/'; 
 	//砍价团接口
	var mkmsDomain = '//mkms.api.muyingzhijia.com/json/reply/'; 
        //首页爆款
        var indexDomain = '//goods.api.muyingzhijia.com/json/reply/'; 
        //价格替换
        var raplacePriceDomain = '//buy.api.muyingzhijia.com/json/reply/';
        //首页活动地址
        var indexActiveDomsin = "//m.muyingzhijia.com/T/SpecialProductInfo?id={0}&productId={1}&productSkuId={2}";
        //图片域名
        var imgDomain = '//img.boodoll.cn/';
	//跳转的支付链接
        var gotoPayUrl = "//pay.api.muyingzhijia.com/UnionPay/UnionPay?";
	//第一妈咪发券服务
	var sendCoupon = "//mkms.api.muyingzhijia.com/json/reply/"
        var re = {
            RentlocalUrl:RentlocalUrl,
            localloginDomain: localloginDomain,
            memberDomain: memberDomain,
            imgDomain: imgDomain,
            orderDomain: orderDomain,
            logsticsDomain: logsticsDomain,
            indexDomain: indexDomain,
            raplacePriceDomain: raplacePriceDomain,
            indexActiveDomsin: indexActiveDomsin,
            LocalUrl: LocalUrl,
            gotoPayUrl: gotoPayUrl,
            //提示app下载的有效期1天
            downloadcookieday:1,
	    sendCoupon:sendCoupon,
   	    mkmsDomain: mkmsDomain
        };
     return re;
    }).call(self);
})
