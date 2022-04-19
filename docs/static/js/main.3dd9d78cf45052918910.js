webpackJsonp([9],{1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.LOADING_OPEN="LOADING_OPEN",e.LOADING_CLOSED="LOADING_CLOSED",e.ALERT_INIT="ALERT_INIT",e.ALERT_CANCEL="ALERT_CANCEL",e.SEARCH_HISTORY_INIT="SEARCH_HISTORY_INIT",e.SEARCH_HISTORY_UPDATE="SEARCH_HISTORY_UPDATE",e.SEARCH_EVENT="SEARCH_EVENT",e.PLAYER_EVENT_INIT="PLAYER_EVENT_INIT",e.PLAYER_EVENT_PLAY="PLAYER_EVENT_PLAY",e.PLAYER_EVENT_PAUSE="PLAYER_EVENT_PAUSE",e.PLAYER_EVENT_PROCESS="PLAYER_EVENT_PROCESS",e.PLAYER_EVENT_NEXT="PLAYER_EVENT_NEXT",e.PLAYER_EVENT_PREVIOUS="PLAYER_EVENT_PREVIOUS",e.PLAYER_EVENT_TOGGLE="PLAYER_EVENT_TOGGLE",e.PLAYER_EVENT_TOGGLE_PLAY_TYPE="PLAYER_EVENT_TOGGLE_PLAY_TYPE",e.PLAYER_EVENT_BUFFERED="PLAYER_EVENT_BUFFERED",e.PLAYER_EVENT_PLAY_ORDER="PLAYER_EVENT_PLAY_ORDER",e.PLAYER_EVENT_SET_CURRENT="PLAYER_EVENT_SET_CURRENT",e.PLAYER_EVENT_UPDATE_PLAYLIST="PLAYER_EVENT_UPDATE_PLAYLIST",e.PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX="PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX",e.PLAYER_EVENT_DELETE_SINGLE="PLAYER_EVENT_DELETE_SINGLE",e.PLAYER_EVENT_CLEAR_PLAY_LIST="PLAYER_EVENT_CLEAR_PLAY_LIST",e.PLAYER_EVENT_SET_PLAY_PROCESS="PLAYER_EVENT_SET_PLAY_PROCESS",e.PLAYER_EVENT_FULL_SCREEN="PLAYER_EVENT_FULL_SCREEN",e.USER_EVENT_UPDATE_PLAY_LIST="USER_EVENT_UPDATE_PLAY_LIST",e.USER_EVENT_UPDATE_FAVOURITE="USER_EVENT_UPDATE_FAVOURITE",e.USER_EVENT_UPDATE_FAVOURITE_FILTER="USER_EVENT_UPDATE_FAVOURITE_FILTER",e.USER_EVENT_FIND_SHEET_WITH_CODE="USER_EVENT_FIND_SHEET_WITH_CODE",e.USER_EVENT_INIT="USER_EVENT_INIT",e.PERSONAL_RADIO_INIT="PERSONAL_RADIO_INIT",e.PERSONAL_RADIO_UPDATE_PLAY_LIST="PERSONAL_RADIO_UPDATE_PLAY_LIST",e.SHEET_DETAIL_INIT="SHEET_DETAIL_INIT"},100:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"router-change"}},[a("router-view",{staticStyle:{position:"absolute",width:"100%",height:"100%"}})],1)},staticRenderFns:[]}},34:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var l=a(68),n=r(l),i=a(69),o=r(i),u=a(54),s=r(u),c=function(){function t(){(0,n.default)(this,t),this.isLocal="LOCALHOST"===window.location.hostname.toUpperCase()}return(0,o.default)(t,[{key:"Mapping",value:function(t){return{GET_SEARCH_HISTORY:(this.isLocal?"":"http://olpmg8rkp.bkt.clouddn.com")+"/static/mokData/musicPlayer/history"+(this.isLocal,".json"),GET_SEARCH_RESULT:(this.isLocal?"":"http://olpmg8rkp.bkt.clouddn.com")+"/static/mokData/musicPlayer/searchResult"+(this.isLocal,".json"),GET_PERSONAL_RADIO:(this.isLocal?"":"http://olpmg8rkp.bkt.clouddn.com")+"/static/mokData/musicPlayer/personalRadio"+(this.isLocal,".json"),GET_PERSONAL_RADIO_INIT:(this.isLocal?"":"http://olpmg8rkp.bkt.clouddn.com")+"/static/mokData/musicPlayer/radioInit"+(this.isLocal,".json"),GET_UPDATE_FAVOURITE:(this.isLocal?"":"http://olpmg8rkp.bkt.clouddn.com")+"/static/mokData/musicPlayer/updatefavourite"+(this.isLocal,".json"),GET_INIT_USER_DATA:(this.isLocal?"":"http://olpmg8rkp.bkt.clouddn.com")+"/static/mokData/musicPlayer/userdata"+(this.isLocal,".json")}[t]}},{key:"ajaxGetData",value:function(t){var e=this,a=e.Mapping(t.url);if(!a)return t.callback({success:!1,message:"路由错误"});s.default.ajax({url:a,type:t.type||"get",data:t.data,cache:!1,async:!0,contentType:"application/x-www-form-urlencoded;charset=UTF-8",success:function(e){if(e.constructor===String)try{e=JSON.parse(e)}catch(t){""===e&&(e={success:!1,message:"请求错误"})}t.callback(e)},error:function(){t.callback({success:!1,message:"请求错误"})}})}}]),t}();e.default=c},43:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t){return a.e(0).then(function(){var e=[a(109)];t.apply(null,e)}.bind(this)).catch(a.oe)},l=function(t){return a.e(4).then(function(){var e=[a(111)];t.apply(null,e)}.bind(this)).catch(a.oe)},n=function(t){return a.e(2).then(function(){var e=[a(108)];t.apply(null,e)}.bind(this)).catch(a.oe)},i=function(t){return a.e(6).then(function(){var e=[a(110)];t.apply(null,e)}.bind(this)).catch(a.oe)},o=function(t){return a.e(1).then(function(){var e=[a(105)];t.apply(null,e)}.bind(this)).catch(a.oe)},u=function(t){return a.e(3).then(function(){var e=[a(106)];t.apply(null,e)}.bind(this)).catch(a.oe)},s=function(t){return a.e(7).then(function(){var e=[a(107)];t.apply(null,e)}.bind(this)).catch(a.oe)},c=function(t){return a.e(5).then(function(){var e=[a(104)];t.apply(null,e)}.bind(this)).catch(a.oe)};e.default={name:"routerMapping",routes:function(){return[{path:"/",name:"rHome",redirect:"/home"},{path:"/home",name:"home",component:r,meta:{title:"K186 Studio"}},{path:"/ios",name:"iosPicker",component:l,meta:{title:"ios Picker"}},{path:"/pcPicker",name:"pcPicker",component:n,meta:{title:"pc Picker"}},{path:"/number2words",name:"number2words",component:i,meta:{title:"数字转换"}},{path:"/Music/:userToken",component:o,children:[{path:"main",name:"Music",component:u,meta:{title:"MusicPlayer"}},{path:"songSheet",name:"songSheet",component:s,meta:{title:"歌单列表"}},{path:"detailList/:sheetCode/:from",name:"detailList",component:c,meta:{title:"列表详情"}}]},{path:"*",name:"all",redirect:"/home"}]}}},44:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var l=a(30),n=r(l),i=a(49),o=r(i),u=a(57),s=r(u),c=a(56),d=r(c),E=a(62),p=r(E),y=a(61),P=r(y),_=a(64),f=r(_),m=a(60),T=r(m),L=a(59),C=r(L),R=a(63),A=r(R),h=a(58),v=r(h);n.default.use(o.default),e.default=new o.default.Store({strict:!0,modules:{loading:s.default,alert:d.default,history:p.default,searchBar:P.default,user:f.default,player:T.default,radio:C.default,sheetDetail:A.default,MusicConfig:v.default}})},46:function(t,e,a){a(96);var r=a(48)(null,a(100),"data-v-782a5ec2",null);t.exports=r.exports},54:function(t,e){t.exports=jQuery},55:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var l=a(45),n=r(l),i=a(30),o=r(i),u=a(47),s=r(u),c=a(46),d=r(c),E=a(43),p=r(E),y=a(44),P=r(y);o.default.use(s.default);var _=new s.default({routes:p.default.routes()}),f=function(t){document.title=t;var e=navigator.userAgent;if(/\bMicroMessenger\/([\d.]+)/.test(e)&&/ip(hone|od|ad)/i.test(e)){var a=document.createElement("iframe");a.src="/favicon.ico",a.style.display="none",a.onload=function(){setTimeout(function(){a.remove()},9)},document.body.appendChild(a)}};_.afterEach(function(t){void 0!==(0,n.default)(t.meta.title)&&f(t.meta.title)}),new o.default({router:_,store:P.default,render:function(t){return t(d.default)}}).$mount("#app")},56:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,l=a(2),n=function(t){return t&&t.__esModule?t:{default:t}}(l),i=a(1),o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(i),u={alertBox:{visible:!1,title:"提示信息",body:"",type:"",btn:{ok:"",cancel:""},callbackConfirm:null,callbackCancel:null}},s={alertBox:function(t){return t.alertBox}},c=(r={},(0,n.default)(r,o.ALERT_INIT,function(t,e){var a=e.alertBox;t.alertBox.visible=!0,t.alertBox.title=a.title?a.title:"提示信息",t.alertBox.body=a.body?a.body:"",t.alertBox.type=a.type?a.type:"confirm",t.alertBox.btn.ok=a.btn&&a.btn.ok?a.btn.ok:"确认",t.alertBox.btn.cancel=a.btn&&a.btn.cancel?a.btn.cancel:"取消",t.alertBox.callbackConfirm=a.callbackConfirm?a.callbackConfirm:null,t.alertBox.callbackCancel=a.callbackCancel?a.callbackCancel:null}),(0,n.default)(r,o.ALERT_CANCEL,function(t){t.alertBox.visible=!1}),r),d={alertInit:function(t,e){var a=t.commit,r=e.alertBox;a(o.ALERT_INIT,{alertBox:r})},alertConfirm:function(t,e){var a=t.commit,r=e.alertBox;a(o.ALERT_CANCEL,{alertBox:r}),u.alertBox.callbackConfirm.constructor===Function&&u.alertBox.callbackConfirm()},alertCancel:function(t){(0,t.commit)(o.ALERT_CANCEL),u.alertBox.callbackCancel.constructor===Function&&u.alertBox.callbackCancel()}};e.default={state:u,getters:s,actions:d,mutations:c}},57:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,l=a(2),n=function(t){return t&&t.__esModule?t:{default:t}}(l),i=a(1),o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(i),u={loadingControl:{visible:!1,type:"",message:"",mask:!1}},s={loadingControl:function(t){return t.loadingControl}},c=(r={},(0,n.default)(r,o.LOADING_OPEN,function(t,e){var a=e.loadingControl;t.loadingControl.visible=!0,t.loadingControl.type=a.type?a.type:"loading",t.loadingControl.message=a.message?a.message:"请稍候...",t.loadingControl.mask=!!a.mask&&a.mask}),(0,n.default)(r,o.LOADING_CLOSED,function(t){t.loadingControl.visible=!1}),r),d={loadingShow:function(t,e){var a=t.commit,r=e.loadingControl;a(o.LOADING_OPEN,{loadingControl:r})},loadingClose:function(t){(0,t.commit)(o.LOADING_CLOSED)}};e.default={state:u,getters:s,actions:d,mutations:c}},58:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={MusicConfig:{iconVip:"http://okzvi7b4z.bkt.clouddn.com/music/icon/vip/",poster:"http://okzvi7b4z.bkt.clouddn.com/music/poster/",music:"http://okzvi7b4z.bkt.clouddn.com/music/",userHead:"http://k186studio.com/static/music/img/",dpr:window.dpr}},l={MusicConfig:function(t){return t.MusicConfig}};e.default={state:r,getters:l}},59:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var l,n=a(2),i=r(n),o=a(1),u=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(o),s=a(34),c=r(s),d={personalRadio:{sheetCode:"radio",title:"个性电台",described:"来听听和「Tik Tau」一样好听的歌曲吧",poster:"",count:3,list:[]}},E={personalRadio:function(t){return t.personalRadio}},p=(l={},(0,i.default)(l,u.PERSONAL_RADIO_INIT,function(t,e){var a=e.initData;t.personalRadio.title=a.title,t.personalRadio.described=a.described,t.personalRadio.poster=a.poster,t.personalRadio.count=a.count,t.personalRadio.list=a.list}),(0,i.default)(l,u.PERSONAL_RADIO_UPDATE_PLAY_LIST,function(t){t.state}),l),y={initRadio:function(t,e){var a=t.commit,r=t.dispatch,l=e.callback;(new c.default).ajaxGetData({url:"GET_PERSONAL_RADIO_INIT",type:"get",data:{},callback:function(t){if(t.success){var e=t.model;a(u.PERSONAL_RADIO_INIT,{initData:e}),l&&l()}else{var n={type:"failed",message:t.message};r("loadingShow",{loadingControl:n}),setTimeout(function(){r("loadingClose")},1500)}}})},updateRadioToPlayList:function(t,e){function a(t){var e=d.personalRadio,a={count:e.count?e.count:0,sheetCode:e.sheetCode?e.sheetCode:"",list:e.list?e.list:[],title:e.title?e.title:""};i=a,l("updatePlaylist",{playList:{currentPlayList:null!==i?i:{count:0,sheetCode:"",list:[],title:""},historyList:{count:0,sheetCode:"",list:[],title:""},initOrder:!0}}),t&&t()}var r=t.commit,l=t.dispatch,n=e.callback,i=null;r(u.PERSONAL_RADIO_UPDATE_PLAY_LIST),0===d.personalRadio.list.length?l("initRadio",{callback:function(){a(n)}}):a(n)}};e.default={state:d,getters:E,actions:y,mutations:p}},60:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var l,n=a(65),i=r(n),o=a(2),u=r(o),s=a(1),c=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(s),d={PlayerComp:{visible:!0,fullScreen:!1,playType:2,playStatus:0,playOrder:[],currentPlay:{audio:{},currentTime:0,process:0,buffered:0,duration:0,url:"",poster:"",uid:"",title:"",artist:"",album:"",playOrderIndex:0},playList:{visible:!1,currentPlayList:{count:0,sheetCode:"",title:"",list:[]},historyList:{count:0,title:"",sheetCode:"",list:[]}}}},E={PlayerComp:function(t){return t.PlayerComp}},p=(l={},(0,u.default)(l,c.PLAYER_EVENT_INIT,function(t,e){var a=e.setCurrentPlay;t.PlayerComp.currentPlay.audio=a.audio}),(0,u.default)(l,c.PLAYER_EVENT_PLAY,function(t,e){var a=e.PlayerComp;t.PlayerComp.playStatus=1,t.PlayerComp.currentPlay.audio=a.currentPlay.audio,t.PlayerComp.currentPlay.duration=a.currentPlay.duration,t.PlayerComp.currentPlay.currentTime=a.currentPlay.currentTime,t.PlayerComp.currentPlay.playOrderIndex=a.currentPlay.playOrderIndex}),(0,u.default)(l,c.PLAYER_EVENT_PAUSE,function(t,e){var a=e.PlayerComp;t.PlayerComp.playStatus=0,t.PlayerComp.currentPlay.audio=a.currentPlay.audio,t.PlayerComp.currentPlay.duration=a.currentPlay.duration,t.PlayerComp.currentPlay.currentTime=a.currentPlay.currentTime}),(0,u.default)(l,c.PLAYER_EVENT_PROCESS,function(t,e){var a=e.setCurrentPlay;t.PlayerComp.currentPlay.process=a.process,t.PlayerComp.currentPlay.duration=a.duration}),(0,u.default)(l,c.PLAYER_EVENT_NEXT,function(t,e){var a=e.currentPlay;t.PlayerComp.currentPlay.uid=a.uid,t.PlayerComp.currentPlay.url=a.url,t.PlayerComp.currentPlay.poster=a.poster,t.PlayerComp.currentPlay.title=a.title,t.PlayerComp.currentPlay.artist=a.artist,t.PlayerComp.currentPlay.album=a.album,t.PlayerComp.currentPlay.currentTime=a.currentTime}),(0,u.default)(l,c.PLAYER_EVENT_PREVIOUS,function(t,e){var a=e.currentPlay;t.PlayerComp.currentPlay.uid=a.uid,t.PlayerComp.currentPlay.url=a.url,t.PlayerComp.currentPlay.poster=a.poster,t.PlayerComp.currentPlay.title=a.title,t.PlayerComp.currentPlay.artist=a.artist,t.PlayerComp.currentPlay.album=a.album,t.PlayerComp.currentPlay.currentTime=a.currentTime}),(0,u.default)(l,c.PLAYER_EVENT_TOGGLE,function(t,e){var a=e.toggle;t.PlayerComp.visible=a.PlayerVisible,t.PlayerComp.playList.visible=!a.PlayerVisible}),(0,u.default)(l,c.PLAYER_EVENT_TOGGLE_PLAY_TYPE,function(t,e){var a=e.playType;t.PlayerComp.playType=a.playType}),(0,u.default)(l,c.PLAYER_EVENT_BUFFERED,function(t,e){var a=e.setCurrentPlay;t.PlayerComp.currentPlay.buffered=a.buffered}),(0,u.default)(l,c.PLAYER_EVENT_PLAY_ORDER,function(t,e){var a=e.playOrder;t.PlayerComp.playOrder=a}),(0,u.default)(l,c.PLAYER_EVENT_SET_CURRENT,function(t,e){var a=e.currentPlay;t.PlayerComp.currentPlay.uid=a.uid,t.PlayerComp.currentPlay.url=a.url,t.PlayerComp.currentPlay.poster=a.poster,t.PlayerComp.currentPlay.title=a.title,t.PlayerComp.currentPlay.artist=a.artist,t.PlayerComp.currentPlay.album=a.album,t.PlayerComp.currentPlay.currentTime=a.currentTime}),(0,u.default)(l,c.PLAYER_EVENT_UPDATE_PLAYLIST,function(t,e){var a=e.playList;a.currentPlayList.sheetCode===t.PlayerComp.playList.currentPlayList.sheetCode?t.PlayerComp.playList.currentPlayList=a.currentPlayList:(t.PlayerComp.playList.historyList=a.historyList?a.historyList:t.PlayerComp.playList.currentPlayList,t.PlayerComp.playList.currentPlayList=a.currentPlayList)}),(0,u.default)(l,c.PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX,function(t,e){var a=e.playIndex;t.PlayerComp.currentPlay.playOrderIndex=a.playOrderIndex}),(0,u.default)(l,c.PLAYER_EVENT_DELETE_SINGLE,function(t,e){var a=e.updateData;t.PlayerComp.playList.currentPlayList=a.currentPlayList,t.PlayerComp.playOrder=a.playOrder}),(0,u.default)(l,c.PLAYER_EVENT_CLEAR_PLAY_LIST,function(t){t.PlayerComp.playList.currentPlayList={count:0,sheetCode:"",title:"",list:[]},t.PlayerComp.currentPlay={currentTime:0,process:0,duration:0,url:"",poster:"",uid:"",title:"",artist:"",album:""}}),(0,u.default)(l,c.PLAYER_EVENT_SET_PLAY_PROCESS,function(t,e){var a=e.process;t.PlayerComp.currentPlay.currentTime=a*t.PlayerComp.currentPlay.duration}),(0,u.default)(l,c.PLAYER_EVENT_FULL_SCREEN,function(t){t.PlayerComp.fullScreen=!t.PlayerComp.fullScreen}),l),y={playerInit:function(t){var e=t.commit,a=t.dispatch,r=document.getElementById("audio");r.preload="none";var l={audio:r};e(c.PLAYER_EVENT_INIT,{setCurrentPlay:l}),r.addEventListener("timeupdate",function(){a("playerProcess")}),r.addEventListener("progress",function(){a("playerBuffered")})},playerPlay:function(t){var e=t.commit;if(d.PlayerComp.currentPlay.audio.currentTime=d.PlayerComp.currentPlay.currentTime,""!==d.PlayerComp.currentPlay.url){setTimeout(function(){d.PlayerComp.currentPlay.audio.play()},50);var a={currentPlay:{audio:d.PlayerComp.currentPlay.audio,duration:d.PlayerComp.currentPlay.audio.duration,currentTime:d.PlayerComp.currentPlay.currentTime,playOrderIndex:d.PlayerComp.playOrder.indexOf(d.PlayerComp.currentPlay.uid)}};e(c.PLAYER_EVENT_PLAY,{PlayerComp:a})}},playerPause:function(t){var e=t.commit;d.PlayerComp.currentPlay.audio.pause();var a={currentPlay:{audio:d.PlayerComp.currentPlay.audio,duration:d.PlayerComp.currentPlay.audio.duration,currentTime:d.PlayerComp.currentPlay.audio.currentTime}};e(c.PLAYER_EVENT_PAUSE,{PlayerComp:a})},playerProcess:function(t){var e=t.commit,a=t.dispatch,r=d.PlayerComp.currentPlay.audio.currentTime,l=d.PlayerComp.currentPlay.audio.duration;if(l>0){var n={process:r/l,duration:l};e(c.PLAYER_EVENT_PROCESS,{setCurrentPlay:n}),1===n.process&&a("playerNext",{from:"auto"})}},playerNext:function(t,e){var a=t.commit,r=t.dispatch,l=e.from;r("playerPause");var n={currentTime:0,process:0,duration:0,url:"",poster:"",uid:"",title:"",artist:"",album:""},i=d.PlayerComp.currentPlay.playOrderIndex;"auto"===l&&3===d.PlayerComp.playType||(i+=1),i>d.PlayerComp.playOrder.length-1&&(i=0),r("updatePlayOrderIndex",{playIndexObj:{playOrderIndex:i}});var o=d.PlayerComp.playOrder[d.PlayerComp.currentPlay.playOrderIndex];if(0!==d.PlayerComp.playList.currentPlayList.list.length)for(var u=d.PlayerComp.playList.currentPlayList.list,s=0;s<u.length;s++)if(u[s].song.uid===o){n.uid=o,n.url=u[s].song.url,n.poster=u[s].song.poster,n.title=u[s].song.title,n.artist=u[s].song.artist,n.album=u[s].song.album;break}a(c.PLAYER_EVENT_NEXT,{currentPlay:n}),r("playerPlay")},playerPrevious:function(t){var e=t.commit,a=t.dispatch;a("playerPause");var r={currentTime:0,process:0,duration:0,url:"",poster:"",uid:"",title:"",artist:"",album:""},l=d.PlayerComp.currentPlay.playOrderIndex;(l-=1)<0&&(l=d.PlayerComp.playOrder.length-1),a("updatePlayOrderIndex",{playIndexObj:{playOrderIndex:l}});var n=d.PlayerComp.playOrder[d.PlayerComp.currentPlay.playOrderIndex];if(0!==d.PlayerComp.playList.currentPlayList.list.length)for(var i=d.PlayerComp.playList.currentPlayList.list,o=0;o<i.length;o++)if(i[o].song.uid===n){r.uid=n,r.url=i[o].song.url,r.poster=i[o].song.poster,r.title=i[o].song.title,r.artist=i[o].song.artist,r.album=i[o].song.album;break}e(c.PLAYER_EVENT_PREVIOUS,{currentPlay:r}),a("playerPlay")},playerToggle:function(t,e){var a=t.commit,r=e.toggle;a(c.PLAYER_EVENT_TOGGLE,{toggle:r})},playerTogglePlayType:function(t,e){var a=t.commit,r=t.dispatch,l=e.setPlayType;if(l){var n={playType:l};a(c.PLAYER_EVENT_TOGGLE_PLAY_TYPE,{playType:n})}else{var i=d.PlayerComp.playType;i+=1,i=i>3?1:i;var o={playType:i};a(c.PLAYER_EVENT_TOGGLE_PLAY_TYPE,{playType:o})}r("initPlayOrder"),r("updatePlayOrderIndex",{})},playerBuffered:function(t){var e=t.commit,a=d.PlayerComp.currentPlay.audio,r=d.PlayerComp.currentPlay.audio.duration;if(r>0&&0!==a.buffered.length){var l=d.PlayerComp.currentPlay.audio.buffered.end(a.buffered.length-1),n={buffered:l/r};e(c.PLAYER_EVENT_BUFFERED,{setCurrentPlay:n})}},initPlayOrder:function(t){for(var e=t.commit,a=[],r=d.PlayerComp.playList.currentPlayList.list,l=0;l<r.length;l++)a[l]=r[l].song.uid;1===d.PlayerComp.playType?a.sort(function(){return.5-Math.random()}):2===d.PlayerComp.playType||d.PlayerComp.playType,e(c.PLAYER_EVENT_PLAY_ORDER,{playOrder:a})},playerSet:function(t,e){function a(t){return d.PlayerComp.currentPlay.uid===t}function r(){o("playerPause")}function l(){o("playerPlay")}function n(t){var e={currentTime:0,process:0,duration:0,url:"",poster:"",uid:"",title:"",artist:"",album:""},a=d.PlayerComp.playList.currentPlayList.list;if(u.uid){for(var r=0;r<a.length;r++)if(a[r].song.uid===u.uid){e.uid=u.uid,e.url=a[r].song.url,e.poster=a[r].song.poster,e.title=a[r].song.title,e.artist=a[r].song.artist,e.album=a[r].song.album;break}}else e.uid=a[0].song.uid,e.url=a[0].song.url,e.poster=a[0].song.poster,e.title=a[0].song.title,e.artist=a[0].song.artist,e.album=a[0].song.album;i(c.PLAYER_EVENT_SET_CURRENT,{currentPlay:e}),t&&t()}var i=t.commit,o=t.dispatch,u=e.option;if("list"===u.from)a(u.uid)||(r(),n(),l());else if("history"===u.from){var s=d.PlayerComp.playList.currentPlayList,E=d.PlayerComp.playList.historyList;!function(t,e,a,r){o("updatePlaylist",{playList:{currentPlayList:null!==t?t:{count:0,sheetCode:"",list:[],title:""},historyList:null!==e?e:{count:0,sheetCode:"",list:[],title:""},initOrder:!0===a&&a}}),r&&r()}(E,s,!0,function(){a(u.uid)||(r(),n(),l())})}else"radio"===u.from?o("updateRadioToPlayList",{callback:function(){a(u.uid)||(r(),n(),l())}}):"sheet"===u.from?(o("updatePlayer",{sheetCode:u.sheetCode}),a(u.uid)||(r(),n(),l()),u.playType&&o("playerTogglePlayType",{setPlayType:u.playType})):"search"===u.from||"all"===u.from||"favourite"===u.from&&o("setFavouriteToPlayList",{callback:function(){a(u.uid)||(r(),n(),l())}})},updatePlaylist:function(t,e){var a=t.commit,r=t.dispatch,l=e.playList;a(c.PLAYER_EVENT_UPDATE_PLAYLIST,{playList:l}),l.initOrder&&r("initPlayOrder")},updatePlayOrderIndex:function(t,e){var a=t.commit,r=e.playIndexObj,l=null!=r?r:{playOrderIndex:d.PlayerComp.playOrder.indexOf(d.PlayerComp.currentPlay.uid)};a(c.PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX,{playIndex:l})},deleteSingleInPlayList:function(t,e){var a=t.commit,r=t.dispatch,l=e.uid,n=JSON.parse((0,i.default)(d.PlayerComp.playOrder)),o=n.indexOf(l);n.splice(n.indexOf(l),1);for(var u=JSON.parse((0,i.default)(d.PlayerComp.playList.currentPlayList)),s=0;s<u.list.length;s++)if(u.list[s].song.uid===l){u.list.splice(s,1),u.count-=1,u.count<0&&(u.count=0);break}var E={currentPlayList:u,playOrder:n};if(a(c.PLAYER_EVENT_DELETE_SINGLE,{updateData:E}),l===d.PlayerComp.currentPlay.uid){o-=1,o<0&&(o=0);r("updatePlayOrderIndex",{playIndexObj:{playOrderIndex:o}}),r("playerNext",{})}else{r("updatePlayOrderIndex",{playIndexObj:{playOrderIndex:d.PlayerComp.playOrder.indexOf(d.PlayerComp.currentPlay.uid)}})}},clearPlayList:function(t){var e=t.commit,a=t.dispatch;window.confirm("确定清空播放列表？")&&(a("playerPause"),e(c.PLAYER_EVENT_CLEAR_PLAY_LIST))},setProcess:function(t,e){var a=t.commit,r=t.dispatch,l=e.process,n=e.callback;r("playerPause"),a(c.PLAYER_EVENT_SET_PLAY_PROCESS,{process:l}),n&&n(),r("playerPlay")},toggleFullScreen:function(t){(0,t.commit)(c.PLAYER_EVENT_FULL_SCREEN)}};e.default={state:d,getters:E,actions:y,mutations:p}},61:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(2),l=function(t){return t&&t.__esModule?t:{default:t}}(r),n=a(1),i=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(n),o={searchBar:{value:""}},u={searchBar:function(t){return t.searchBar}},s=(0,l.default)({},i.SEARCH_EVENT,function(t,e){var a=e.searchBar;t.alertBox.value=a.value}),c={searchEvt:function(t,e){var a=t.commit,r=e.searchBar;a(i.SEARCH_EVENT,{searchBar:r})}};e.default={state:o,getters:u,actions:c,mutations:s}},62:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,l=a(2),n=function(t){return t&&t.__esModule?t:{default:t}}(l),i=a(1),o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(i),u={searchHistory:{hotData:[],historyData:[],timeStamp:""}},s={searchHistory:function(t){return t.searchHistory}},c=(r={},(0,n.default)(r,o.SEARCH_HISTORY_INIT,function(t,e){var a=e.searchHistory;t.searchHistory.hotData=a.hotData,t.searchHistory.historyData=a.historyData,t.searchHistory.timeStamp=a.timeStamp}),(0,n.default)(r,o.SEARCH_HISTORY_UPDATE,function(t,e){var a=e.searchHistory;t.searchHistory.historyData=a.historyData}),r),d={intHistory:function(t,e){var a=t.commit,r=e.searchHistory;a(o.SEARCH_HISTORY_INIT,{searchHistory:r})},updateHistory:function(t,e){var a=t.commit,r=e.searchHistory;a(o.SEARCH_HISTORY_UPDATE,{searchHistory:r})}};e.default={state:u,getters:s,actions:d,mutations:c}},63:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(2),l=function(t){return t&&t.__esModule?t:{default:t}}(r),n=a(1),i=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(n),o={sheetDetailList:{sheetCode:null,title:"",downloaded:0,count:0,playHistory:0,poster:"",author:{name:"",head:""},mark:"",tags:[],list:[]}},u={sheetDetailList:function(t){return t.sheetDetailList}},s=(0,l.default)({},i.SHEET_DETAIL_INIT,function(t,e){var a=e.Detail;t.sheetDetailList=a}),c={sheetDetailInit:function(t,e){var a=t.commit,r=e.Detail;a(i.SHEET_DETAIL_INIT,{Detail:r})}};e.default={state:o,getters:u,actions:c,mutations:s}},64:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var l,n=a(2),i=r(n),o=a(1),u=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e.default=t,e}(o),s=a(34),c=r(s),d={userData:{basicInfo:{name:"",img:"",vip:{vip:1,nvip:1,nsvip:1,svip:1,xvip:1,nxvip:1,nsui:1,sui:1},SheetList:{count:0,list:[]},totalSong:{count:0,list:[]},favourite:{count:0,uidFilter:{},list:[]},purchased:[]}}},E={userData:function(t){return t.userData}},p=(l={},(0,i.default)(l,u.USER_EVENT_UPDATE_PLAY_LIST,function(t){}),(0,i.default)(l,u.USER_EVENT_UPDATE_FAVOURITE,function(t,e){var a=e.favourite;t.userData.basicInfo.favourite=a}),(0,i.default)(l,u.USER_EVENT_UPDATE_FAVOURITE_FILTER,function(t,e){var a=e.uid;t.userData.basicInfo.favourite.uidFilter[a]=!t.userData.basicInfo.favourite.uidFilter[a]}),(0,i.default)(l,u.USER_EVENT_FIND_SHEET_WITH_CODE,function(t){}),(0,i.default)(l,u.USER_EVENT_INIT,function(t,e){var a=e.userData;t.userData=a}),l),y={updatePlayer:function(t,e){var a=t.commit,r=t.dispatch,l=e.sheetCode,n=null;n=function(){for(var t=null,e=d.userData.basicInfo.SheetList.list,a=0;a<e.length;a++)if(e[a].sheetCode===l){t={count:e[a].count,sheetCode:l,list:e[a].list,title:e[a].title};break}return t}(),r("updatePlaylist",{playList:{currentPlayList:null!==n?n:{count:0,sheetCode:"",list:[],title:""},historyList:null,initOrder:!0}}),a(u.USER_EVENT_UPDATE_PLAY_LIST)},updateFavourite:function(t){var e=t.commit,a=t.dispatch;(new c.default).ajaxGetData({url:"GET_UPDATE_FAVOURITE",type:"get",data:d.userData.basicInfo.favourite.uidFilter,callback:function(t){if(t.success){if(t.model){var r=t.model;e(u.USER_EVENT_UPDATE_FAVOURITE,{favourite:r})}}else{var l={type:"failed",message:t.message};a("loadingShow",{loadingControl:l}),setTimeout(function(){a("loadingClose")},1500)}}})},updateFilter:function(t,e){var a=t.commit,r=t.dispatch,l=e.uid;a(u.USER_EVENT_UPDATE_FAVOURITE_FILTER,{uid:l}),r("updateFavourite")},isLikeFilter:function(t,e){var a=(t.commit,e.uid);return!!d.userData.basicInfo.favourite.uidFilter[a]},findSheetWithCode:function(t,e){var a=t.commit,r=t.dispatch,l=e.sheetCode,n=e.from;a(u.USER_EVENT_FIND_SHEET_WITH_CODE);var i={},o=null;o=function(t){if("favourite"===n)i={sheetCode:"favourite",title:"我的喜爱",count:d.userData.basicInfo.favourite.count,list:d.userData.basicInfo.favourite.list};else if("all"===n);else if("sheet"===n)for(var e=d.userData.basicInfo.SheetList.list,a=0;a<e.length;a++)if(e[a].sheetCode===t){i=e[a];break}return i}(l),r("sheetDetailInit",{Detail:o})},initUserData:function(t,e){var a=t.commit,r=e.token,l=e.callback;(new c.default).ajaxGetData({url:"GET_INIT_USER_DATA",type:"get",data:{userToken:r},callback:function(t){t.success&&t.model&&(a(u.USER_EVENT_INIT,{userData:t.model.userData}),l&&l())}})},setFavouriteToPlayList:function(t,e){var a=t.commit,r=t.dispatch,l=e.callback,n=null,i=d.userData.basicInfo.favourite;n={count:i.count,sheetCode:"favourite",list:i.list,title:"我的喜爱"},r("updatePlaylist",{playList:{currentPlayList:null!=n?n:{count:0,sheetCode:"",list:[],title:""},historyList:null,initOrder:!0}}),a(u.USER_EVENT_UPDATE_PLAY_LIST),l&&l()}};e.default={state:d,getters:E,actions:y,mutations:p}},96:function(t,e){}},[55]);