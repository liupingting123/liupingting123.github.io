define("api/index",["config/url"],function(e){return{queryHotProductPageList:{url:e.indexDomain+"QueryHotProductPageList",post:{PageIndex:"?",PageSize:"?",SourceTypeSysNo:"2",ApplyPlace:"9"}},queryHotProductSpecialList:{url:e.indexDomain+"QueryHotProductSpecialList",post:{SourceTypeSysNo:"2",ApplyPlace:"1"}},queryTopSpecialShow:{url:e.localloginDomain+"Home/QueryTopSpecial",post:{Top:"3",PageIndex:"?",PageSize:"?"}},getHomeAdModuleDataList:{url:e.localloginDomain+"Home/GetHomeAdModuleDataList",post:{adkey:"?"}},QueryPromPriceByProdId:{url:e.orderDomain+"QueryPromPriceByProdId",post:{SourceTypeSysNo:"2",ProductIdList:"?",Guid:"?",DisplayLabel:"?"}},QueryHotProductSpecialPageListTrans:{url:e.indexDomain+"QueryHotProductSpecialPageListTrans",post:{ApplyPlace:"?",PageIndex:"?",PageSize:"?",UserId:"?",Guid:"?",DisplayLabel:"?",SourceTypeSysNo:2,AreaSysNo:"?",ChannelID:"?",ExtensionSysNo:"[0]",ClientIp:"?"}}}});