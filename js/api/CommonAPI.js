define("api/CommonAPI",["model/token","lib/cookie"],function(e,t){var n=e.getUserInfo();return(t.get("_displaylabelids")==""||t.get("_displaylabelids")==null)&&t.add("_displaylabelids",["8"],"/",86400),n.DisplayLabel=JSON.stringify(t.get("_displaylabelids").split(",")),{commonObj:{UserId:n.UserId||0,Guid:n.UserGuid||"",DisplayLabel:n.DisplayLabel||"",SourceTypeSysNo:2,ExtensionSysNo:n.ExtensionSysNo||"",AreaSysNo:n.AreaSysNo||"",ChannelID:n.ChannelID||"",ClientIp:n.ClientIp||""}}});