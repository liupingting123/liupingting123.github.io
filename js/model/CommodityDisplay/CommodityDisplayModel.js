define('model/CommodityDisplay/CommodityDisplayModel', ['lib/common', 'api/CommodityDisplay/CommodityDisplayAPI'],
    function ($, apiAccount) {
        function GoodsSearchStatisticsObj() {
            var bizGoodsSearchStatisticsData = {
                post: {
                    word: '',
                    hit: ''
                }
            };
            return bizGoodsSearchStatisticsData;
        }
        function GetGoodsSearchStatistics(dataInfo, callback) {
            var bizDataObj = GoodsSearchStatisticsObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.GoodsSearchStatistics, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

         function ProductCategoryRequestObj() {
            var bizProductCategoryRequestData = {
                post: {
                    UserId: '',
                    SourceTypeSysNo: '2'
                }
            };
            return bizProductCategoryRequestData;
        }
        function GetProductCategoryRequest(dataInfo, callback) {
            var bizDataObj = ProductCategoryRequestObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.ProductCategoryRequest, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

        function UnifyGoodsReqObj() {
            var bizUnifyGoodsReqData = {
                post: {
                    GoodsID: '',
                    DisplayLabel: '',
                    PromID:'',
                    ClientIp: ''
                }
            };
            return bizUnifyGoodsReqData;
        }

        function GetUnifyGoodsReq(dataInfo, callback) {
            var bizDataObj = UnifyGoodsReqObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.UnifyGoodsReq, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

        function GoodsSearchModelObj() {
            var bizGoodsSearchModelData = {
                post: {
                    k: '',
                    pi: '',
                    pz: '',
                    sn: '',
                    ds: '',
                    bid: "",
                    cateId: "",
                    pic: "",
                    pd: "",
                    promids:"",
                }
            };
            return bizGoodsSearchModelData;
        }
        function GoodsSearchModel(dataInfo, callback) {
            var bizDataObj = GoodsSearchModelObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };
            $.xsr($.makeUrl(apiAccount.GoodsSearchModel, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
           });
        }

        function QueryProductByPromAndProdObj() {
            var bizQueryProductByPromAndProdData = {
                post: {
                    ProductId: "?",
                    PromSysNo: "?"
                }
            };
            return bizQueryProductByPromAndProdData;
        }
        function QueryProductByPromAndProd(dataInfo, callback) {
            var bizDataObj = QueryProductByPromAndProdObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.QueryProductByPromAndProd, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

          function QueryGiftByPromAndProdObj() {
            var bizQueryGiftByPromAndProdData = {
                post: {
                    ProductId: "?",
                    PromSysNo: "?"
                }
            };
            return bizQueryGiftByPromAndProdData;
        }
        function QueryGiftByPromAndProd(dataInfo, callback) {
            var bizDataObj = QueryGiftByPromAndProdObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.QueryGiftByPromAndProd, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }

        function QueryLatestCommentAndTotalRequestObj() {
            var bizQueryLatestCommentAndTotalRequestData = {
                post: {
                    ProductId:''
                }
            };
            return bizQueryLatestCommentAndTotalRequestData;
        }
        function QueryLatestCommentAndTotalRequest(dataInfo, callback) {
            var bizDataObj = QueryLatestCommentAndTotalRequestObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.QueryLatestCommentAndTotalRequest, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }


        function QueryCommentNumRequestObj() {
            var bizQueryCommentNumRequestData = {
                post: {
                    ProductId: ''
                }
            };
            return bizQueryCommentNumRequestData;
        }
        function QueryCommentNumRequest(dataInfo, callback) {
            var bizDataObj = QueryCommentNumRequestObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.QueryCommentNumRequest, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }


        function QueryCommentListRequestObj() {
            var bizQueryCommentListRequestData = {
                post: {
                    ProductId: '',
                    CommentType:'',
                    PageSize: "",
                    PageIndex: ""
                }
            };
            return bizQueryCommentListRequestData;
        }
        function QueryCommentListRequest(dataInfo, callback) {
            var bizDataObj = QueryCommentListRequestObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.QueryCommentListRequest, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }


        function UnifyGoodsListReqObj() {
            var bizUnifyGoodsListReqData = {
                post: {
                    GoodsID: "?",
                    DisplayLabel: "?",
                    ClientIp: '?'
                }
            };
            return bizUnifyGoodsListReqData;
        }
        function UnifyGoodsListReq(dataInfo, callback) {
            var bizDataObj = UnifyGoodsListReqObj();
            var dataInfo = dataInfo || {};
            if (dataInfo.post) {
                $.merge(bizDataObj.post, dataInfo.post);
            };

            $.xsr($.makeUrl(apiAccount.UnifyGoodsListReq, bizDataObj.post), function (res) {
                try {
                    callback && callback(res);
                } catch (e) {
                    //TODO handle the exception
                    throw e;
                }
            });
        }


        

        return {
            GetUnifyGoodsReq: GetUnifyGoodsReq, //商品详情
            GetGoodsSearchStatistics: GetGoodsSearchStatistics, //搜索框智能提示
            GetProductCategoryRequest: GetProductCategoryRequest, //商品分类
            GoodsSearchModel: GoodsSearchModel, //商品列表
            QueryProductByPromAndProd: QueryProductByPromAndProd,//查询活动商品列表
            QueryLatestCommentAndTotalRequest: QueryLatestCommentAndTotalRequest,//查询商品评论
            QueryCommentNumRequest: QueryCommentNumRequest,//查询评论数量
            QueryCommentListRequest: QueryCommentListRequest,//查询评论列表
            UnifyGoodsListReq: UnifyGoodsListReq,//查询促销价格和评星
            QueryGiftByPromAndProd: QueryGiftByPromAndProd,//查赠品
        }
    });
