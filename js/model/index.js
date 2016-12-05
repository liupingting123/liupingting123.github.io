define('model/index', ['lib/common', 'api/index', 'config/url', 'model/token'],
    function ($, apiIndex, configUrl, modelToken) {

        //服务器接口
        //var apiObj = apiAccount.getToken;
        /**
		 * 领域对象，传递给服务器的数据
		 */


        //查询爆款列表
        function queryHotProductPageList(dataInfo, callback) {
            $.xsr($.makeUrl(apiIndex.queryHotProductPageList, dataInfo), function (res) {
                try {
                    if (res.DoFlag) {
                        //$.each(res.QueryHotProductListDtos, function(j) {
                            
                        //    var productArry = { ProductIdList: $.trim(res.QueryHotProductListDtos[j].ProductId) };//传参对象
                        //    modelToken.queryPromPriceByProdId(productArry, function (data) {
                        //        if (data.DoFlag) {
                        //            //待修改
                        //            res.QueryHotProductListDtos[j].NowPrice = data.PromPriceList[0].PromPriceShow;
                        //            res.QueryHotProductListDtos[j].PromPriceShow = data.PromPriceList[0].PromPriceShow;

                        //        }
                        //    });

                        //});
                        
                    }
                    callback && callback(res);
                  
                } catch (e) {

                    throw e;
                }
            });

        }

        //查询特卖商品
        function queryHotProductSpecialList(callback) {


            $.xsr($.makeUrl(apiIndex.queryHotProductSpecialList), function (res) {
                try {
                   
                    callback && callback(res);

                } catch (e) {

                    throw e;
                }
            });

        }

        //查询特卖商品
        function queryTopSpecialShow(dataInfo,callback) {
            $.xsr($.makeUrl(apiIndex.queryTopSpecialShow, dataInfo), function (res) {
                try {

                    callback && callback(res);

                } catch (e) {

                    throw e;
                }
            });

        }
        //查询首页广告
        function getHomeAdModuleDataList(dataInfo,callback) {

            $.xsr($.makeUrl(apiIndex.getHomeAdModuleDataList, dataInfo), function (res) {
                try {

                    callback && callback(res);

                } catch (e) {

                    throw e;
                }
            });

        }

        function QueryPromPriceByProdIdObj() {
            var bizQueryPromPriceByProdIdData = {
                post: {
                    UserId: '',
                    ProductIdList: "",
                    Guid: "",
                    DisplayLabel: ""
                }
            };
            return bizQueryPromPriceByProdIdData;
        }
        function QueryPromPriceByProdId(dataInfo, callback) {
            var bizDataObj = QueryPromPriceByProdIdObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiIndex.QueryPromPriceByProdId, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

        function QueryHotProductSpecialPageListTransObj() {
            var bizQueryHotProductSpecialPageListTransData = {
                post: {
                    ApplyPlace: "",
                    PageIndex: "",
                    PageSize: "",
                    UserId: "",
                    Guid: "",
                    AreaSysNo: "",
                    ChannelID: "",
                    ClientIp: "",
                    DisplayLabel:""
                }
            };
            return bizQueryHotProductSpecialPageListTransData;
        }
        function QueryHotProductSpecialPageListTrans(dataInfo, callback) {
            var bizDataObj = QueryHotProductSpecialPageListTransObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiIndex.QueryHotProductSpecialPageListTrans, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

        return {
            queryHotProductPageList: queryHotProductPageList,
            queryHotProductSpecialList: queryHotProductSpecialList,
            queryTopSpecialShow: queryTopSpecialShow,
            getHomeAdModuleDataList: getHomeAdModuleDataList,
            QueryPromPriceByProdId: QueryPromPriceByProdId,//查询爆款活动
            QueryHotProductSpecialPageListTrans: QueryHotProductSpecialPageListTrans//查询今日专场
        };

    });