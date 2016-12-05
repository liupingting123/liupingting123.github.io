define('api/CommodityDisplay/CommodityDisplayAPI', ['config/url', 'api/CommonAPI'], function (configUrl,o) {
    return {
        //搜索框智能提示
        GoodsSearchStatistics: {
            url: configUrl.localloginDomain + 'Home/IntelliSense', //url: configUrl.searchDomain + 'SerachSugges',
            post: {
                word: '?',
                hit: '?'
            }
        },
        //商品分类接
        ProductCategoryRequest: {
            url: configUrl.indexDomain + 'QueryCategoryListReq',
            post: {
                UserId: o.commonObj.UserId,
                SourceTypeSysNo: o.commonObj.SourceTypeSysNo
            }
        },
        //商品详情
        UnifyGoodsReq: {
            url: configUrl.indexDomain + 'UnifyGoodsReq',
            post: {
                UserId: o.commonObj.UserId,
                GoodsID: '?',
                DisplayLabel: o.commonObj.DisplayLabel,
                SourceTypeSysNo: o.commonObj.SourceTypeSysNo,
                ClientIp: o.commonObj.ClientIp,
                PromID: '?',
                HasPromInfo: true
            }
        }, //搜索商品
        GoodsSearchModel: {
            url: configUrl.localloginDomain + 'Product/GoodsSearchPageList',
            post: {
                k: '?',
                pi: '?',
                pz: '?',
                sn: '?',
                ds: '?',
                bid: '?',
                cateId: '?',
                pic: '?',
                pd: '?',
                promids: "?"
            }
        },
        //查询商品促销列表
        QueryProductByPromAndProd: {
            url: configUrl.orderDomain + 'QueryProductByPromAndProd',
            post: {
                UserId: o.commonObj.UserId,
                ProductId: "?",
                PromSysNo: "?",
                SourceTypeSysNo: "2",
                DisplayLabel: o.commonObj.DisplayLabel
            }
        },
        //查询赠品
        QueryGiftByPromAndProd: {
            url: configUrl.orderDomain + 'QueryGiftByPromAndProd',
            post: {
                UserId: o.commonObj.UserId,
                ProductId: "?",
                PromSysNo: "?",
                SourceTypeSysNo: o.commonObj.SourceTypeSysNo
            }
        },
        //查询最新评论
        QueryLatestCommentAndTotalRequest: {
            url: configUrl.indexDomain + 'QueryLatestCommentAndTotalRequest',
            post: {
                SourceTypeSysNo: o.commonObj.SourceTypeSysNo,
                ProductId: "?"
            }
        },
        //查询评论数量
        QueryCommentNumRequest: {
            url: configUrl.indexDomain + 'QueryCommentNumRequest',
            post: {
                SourceTypeSysNo: o.commonObj.SourceTypeSysNo,
                ProductId: "?"
            }
        },
        QueryCommentListRequest: {
            url: configUrl.indexDomain + 'QueryCommentListRequest',
            post: {
                SourceTypeSysNo: o.commonObj.SourceTypeSysNo,
                ProductId: "?",
                CommentType: "?",
                UserId: o.commonObj.UserId,
                PageSize: "?",
                PageIndex: "?"
            }
        },
        //查询促销价格
        UnifyGoodsListReq: {
            url: configUrl.indexDomain + 'UnifyGoodsListReq',
            post: {
                UserId: o.commonObj.UserId,
                SourceTypeSysNo: o.commonObj.SourceTypeSysNo,
                GoodsID: "?",
                DisplayLabel: o.commonObj.DisplayLabel,
                ClientIp: o.commonObj.ClientIp,
                HasSaleInfo: true,
                HasPromInfo: true
            }
        }
    }
});
