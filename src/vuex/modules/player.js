/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'
const state = {
    PlayerComp: {
        visible:true,
        playType: 2, /*1 random order singleLoop*/
        playStatus: 0, /*0 pause 1 play*/
        playOrder:[],
        currentPlay: {
            audio: {},
            currentTime:0,
            process:0,
            buffered:0,
            duration: 0,
            url: '',
            poster:'',
            uid:'',
            title: '',
            artist: '',
            album: '',
            playOrderIndex:0
        },
        playList: {
            visible:false,
            currentPlayList: {
                count:0,
                sheetCode:'',
                title:'',
                list:[]
            },
            historyList: {
                count:0,
                title:'',
                sheetCode:'',
                list:[]
            },
            radioList:{
                count:0,
                title:'',
                sheetCode:'',
                list:[]
            },
        },
        SheetLists:[]
    }
};
const getters = {
    PlayerComp: state => state.PlayerComp
};
const mutations = {
    [TYPE.PLAYER_EVENT_INIT](state, {setCurrentPlay}){
        state.PlayerComp.currentPlay.audio=setCurrentPlay.audio;
    },
    [TYPE.PLAYER_EVENT_PROCESS](state, {setCurrentPlay}){
        state.PlayerComp.currentPlay.process=setCurrentPlay.process;
        state.PlayerComp.currentPlay.duration=setCurrentPlay.duration;
    },
    [TYPE.PLAYER_EVENT_BUFFERED](state, {setCurrentPlay}){
        state.PlayerComp.currentPlay.buffered=setCurrentPlay.buffered;
    },
    [TYPE.PLAYER_EVENT_PLAY](state, {PlayerComp}){
        state.PlayerComp.playStatus = 1;
        state.PlayerComp.currentPlay.audio = PlayerComp.currentPlay.audio;
        state.PlayerComp.currentPlay.duration = PlayerComp.currentPlay.duration;
        state.PlayerComp.currentPlay.currentTime = PlayerComp.currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_UPDATE_PLAYLIST](state, {playList}){
        state.PlayerComp.playList.currentPlayList=playList.currentPlayList;
        state.PlayerComp.playList.historyList=playList.historyList;
        state.PlayerComp.playList.radioList=playList.radioList;

    },
    [TYPE.PLAYER_EVENT_PAUSE](state, {PlayerComp}){
        state.PlayerComp.playStatus = 0;
        state.PlayerComp.currentPlay.audio = PlayerComp.currentPlay.audio;
        state.PlayerComp.currentPlay.duration = PlayerComp.currentPlay.duration;
        state.PlayerComp.currentPlay.currentTime = PlayerComp.currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_NEXT](state, {currentPlay}){
        state.PlayerComp.currentPlay.uid=currentPlay.uid;
        state.PlayerComp.currentPlay.url=currentPlay.url;
        state.PlayerComp.currentPlay.poster=currentPlay.poster;
        state.PlayerComp.currentPlay.title=currentPlay.title;
        state.PlayerComp.currentPlay.artist=currentPlay.artist;
        state.PlayerComp.currentPlay.album=currentPlay.album;
        state.PlayerComp.currentPlay.currentTime=currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_PREVIOUS](state, {currentPlay}){
        state.PlayerComp.currentPlay.uid=currentPlay.uid;
        state.PlayerComp.currentPlay.url=currentPlay.url;
        state.PlayerComp.currentPlay.poster=currentPlay.poster;
        state.PlayerComp.currentPlay.title=currentPlay.title;
        state.PlayerComp.currentPlay.artist=currentPlay.artist;
        state.PlayerComp.currentPlay.album=currentPlay.album;
        state.PlayerComp.currentPlay.currentTime=currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_TOGGLE](state,{toggle}){
        state.PlayerComp.visible=toggle.PlayerVisible;
        state.PlayerComp.playList.visible=!toggle.PlayerVisible;
    },
    [TYPE.PLAYER_EVENT_TOGGLE_PLAY_TYPE](state,{playType}){
        state.PlayerComp.playType=playType.playType;
    },
    [TYPE.PLAYER_EVENT_SET_CURRENT](state,{currentPlay}){
        state.PlayerComp.currentPlay.uid=currentPlay.uid;
        state.PlayerComp.currentPlay.url=currentPlay.url;
        state.PlayerComp.currentPlay.poster=currentPlay.poster;
        state.PlayerComp.currentPlay.title=currentPlay.title;
        state.PlayerComp.currentPlay.artist=currentPlay.artist;
        state.PlayerComp.currentPlay.album=currentPlay.album;
        state.PlayerComp.currentPlay.currentTime=currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_PLAY_ORDER](state,{playOrder}){
        state.PlayerComp.playOrder=playOrder;
    },
    [TYPE.PLAYER_EVENT_UPDATE_lIST](state,{list}){
        state.PlayerComp.SheetLists=list.SheetLists;
        //todo
    },
    [TYPE.PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX](state,{playIndex}){
        state.PlayerComp.currentPlay.playOrderIndex=playIndex.playOrderIndex;
    }
};
const actions = {
    playerInit({commit,dispatch}){
        let audio=document.getElementById('audio');
        audio.preload='none';
        let setCurrentPlay={
            audio: audio
        };
        commit(TYPE.PLAYER_EVENT_INIT, {setCurrentPlay});
        audio.addEventListener('timeupdate', function() {
            dispatch('playerProcess');
        });
        audio.addEventListener('progress', function() {
            dispatch('playerBuffered');
        });
    },
    playerPlay({commit,dispatch}){
        /*get lat play currentTime*/
        state.PlayerComp.currentPlay.audio.currentTime = state.PlayerComp.currentPlay.currentTime;
        /*play*/
        if(state.PlayerComp.currentPlay.url!=''){
            state.PlayerComp.currentPlay.audio.play();
            let PlayerComp = {
                currentPlay: {
                    audio: state.PlayerComp.currentPlay.audio,
                    duration: state.PlayerComp.currentPlay.audio.duration,
                    currentTime: state.PlayerComp.currentPlay.currentTime,
                    playOrderIndex:state.PlayerComp.playOrder.indexOf(state.PlayerComp.currentPlay.uid)
                }
            };
            commit(TYPE.PLAYER_EVENT_PLAY, {PlayerComp});
            let type='start';
            dispatch('playerProcess',{type});
        }
    },
    playerSet({commit,dispatch},{option}){
        //radio 没有history 当前这首歌所在列表放入list  list 放入history
        //from sheet all search   [list history radio] 判断从哪点的  特殊处理radio
        //userData.SheetList.SheetLists 里面获取 如果sheetCode='all'从全部列表获取
        //from playList
        dispatch('playerPause');
        let currentPlay={
            currentTime: 0,
            process:0,
            duration: 0,
            url: '',
            poster:'',
            uid:'',
            title: '',
            artist: '',
            album: '',
        };
        let tmpArr=[];
        if(option.from=='list'){
            tmpArr=state.PlayerComp.playList.currentPlayList.list;
            for (let k=0;k<tmpArr.length;k++ ){
                if(tmpArr[k].song.uid==option.uid){
                    currentPlay.uid=option.uid;
                    currentPlay.url=tmpArr[k].song.url;
                    currentPlay.poster=tmpArr[k].song.poster;
                    currentPlay.title=tmpArr[k].song.title;
                    currentPlay.artist=tmpArr[k].song.artist;
                    currentPlay.album=tmpArr[k].song.album;
                    commit(TYPE.PLAYER_EVENT_SET_CURRENT, {currentPlay});
                    break;
                }
            }
        }else if(option.from=='history'){
            tmpArr=state.PlayerComp.playList.historyList.list;
            for (let k=0;k<tmpArr.length;k++ ){
                if(tmpArr[k].song.uid==option.uid){
                    currentPlay.uid=option.uid;
                    currentPlay.url=tmpArr[k].song.url;
                    currentPlay.poster=tmpArr[k].song.poster;
                    currentPlay.title=tmpArr[k].song.title;
                    currentPlay.artist=tmpArr[k].song.artist;
                    currentPlay.album=tmpArr[k].song.album;
                    commit(TYPE.PLAYER_EVENT_SET_CURRENT, {currentPlay});

                    let currentPlayList=state.PlayerComp.playList.currentPlayList;
                    let historyList=state.PlayerComp.playList.historyList;
                    let playList={
                        currentPlayList:historyList,
                        historyList:currentPlayList,
                        radioList:{
                            count:0,
                            sheetCode:'',
                            list:[],
                            title:''
                        },
                        initOrder:true
                    };
                    dispatch('updatePlaylist',{playList});
                    break;
                }
            }
        }else if(option.from=='radio'){
            tmpArr=state.PlayerComp.playList.radioList.list;
            for (let k=0;k<tmpArr.length;k++ ){
                if(tmpArr[k].song.uid==option.uid){
                    currentPlay.uid=option.uid;
                    currentPlay.url=tmpArr[k].song.url;
                    currentPlay.poster=tmpArr[k].song.poster;
                    currentPlay.title=tmpArr[k].song.title;
                    currentPlay.artist=tmpArr[k].song.artist;
                    currentPlay.album=tmpArr[k].song.album;
                    commit(TYPE.PLAYER_EVENT_SET_CURRENT, {currentPlay});
                    break;
                }
            }
        }else if(option.from=='sheet'){
            /*从 user 那边更新过来*/
            dispatch('updatePlayer');
            let list=state.PlayerComp.SheetLists;
            let sheetCode=null;
            let count=0;
            for(let i=0;i<list.length;i++){
                if(option.sheetCode==list[i].sheetCode){
                    tmpArr=list[i].list;
                    sheetCode=list[i].sheetCode;
                    count=list[i].count;
                    break;
                }
            }
            for (let k=0;k<tmpArr.length;k++ ){
                if(tmpArr[k].song.uid==option.uid){
                    currentPlay.uid=option.uid;
                    currentPlay.url=tmpArr[k].song.url;
                    currentPlay.poster=tmpArr[k].song.poster;
                    currentPlay.title=tmpArr[k].song.title;
                    currentPlay.artist=tmpArr[k].song.artist;
                    currentPlay.album=tmpArr[k].song.album;
                    commit(TYPE.PLAYER_EVENT_SET_CURRENT, {currentPlay});

                    let currentPlayList=state.PlayerComp.playList.currentPlayList;
                    let playList={
                        currentPlayList:{
                            count:count,
                            sheetCode:sheetCode,
                            list:tmpArr,
                            title:currentPlayList.title
                        },
                        historyList:currentPlayList,
                        radioList:{
                            count:0,
                            sheetCode:'',
                            list:[],
                        },
                        initOrder:true
                    };
                    dispatch('updatePlaylist',{playList});
                    break;
                }
            }
        }else if(option.from=='search'){

        }else if(option.from=='all'){

        }
    },
    updateList({commit},{list}){
        commit(TYPE.PLAYER_EVENT_UPDATE_lIST,{list})
    },
    updatePlaylist({commit,dispatch},{playList}){
        commit(TYPE.PLAYER_EVENT_UPDATE_PLAYLIST,{playList});
        if(playList.initOrder){
            dispatch('initPlayOrder')
        }
    },
    updatePlayOrderIndex({commit},{playIndex}){
        commit(TYPE.PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX,{playIndex})
    },
    initPlayOrder({commit}){
        let playOrder = [];
        let DataArr = state.PlayerComp.playList.currentPlayList.list;
        for (let i = 0; i < DataArr.length; i++) {
            playOrder[i] = DataArr[i].song.uid;
        }
        /*set playOrder list*/
        if (state.PlayerComp.playType == 1) {
            /*random*/
            playOrder.sort(function () {
                return 0.5 - Math.random()
            });
        } else if (state.PlayerComp.playType == 2 || state.PlayerComp.playType == 3) {
            /*order*/
        }
        commit(TYPE.PLAYER_EVENT_PLAY_ORDER,{playOrder})
    },
    playerPause({commit}){
        /*play*/
        state.PlayerComp.currentPlay.audio.pause();
        let PlayerComp = {
            currentPlay: {
                audio: state.PlayerComp.currentPlay.audio,
                duration: state.PlayerComp.currentPlay.audio.duration,
                currentTime: state.PlayerComp.currentPlay.audio.currentTime,/*set currentTime*/
            }
        };
        commit(TYPE.PLAYER_EVENT_PAUSE, {PlayerComp})
    },
    playerNext({commit,dispatch}){
        let currentPlay={
            currentTime: 0,
            process:0,
            duration: 0,
            url: '',
            poster:'',
            uid:'',
            title: '',
            artist: '',
            album: '',
        };
        let $index=state.PlayerComp.currentPlay.playOrderIndex;
        if(state.PlayerComp.playType!=3){/*3 loop*/
            $index+=1;
            if($index>state.PlayerComp.playOrder.length-1){
                $index=0;
            }
        }
        let playIndex={
            playOrderIndex:$index
        };
        dispatch('updatePlayOrderIndex',{playIndex});
        let uid=state.PlayerComp.playOrder[state.PlayerComp.currentPlay.playOrderIndex];
        if(state.PlayerComp.playList.currentPlayList.list.length!=0){
            let songList=state.PlayerComp.playList.currentPlayList.list;
            for(let i=0;i<songList.length;i++){
                if(songList[i].song.uid==uid){
                    currentPlay.uid=uid;
                    currentPlay.url=songList[i].song.url;
                    currentPlay.poster=songList[i].song.poster;
                    currentPlay.title=songList[i].song.title;
                    currentPlay.artist=songList[i].song.artist;
                    currentPlay.album=songList[i].song.album;
                }
            }
        }
        commit(TYPE.PLAYER_EVENT_NEXT, {currentPlay});
    },
    playerPrevious({commit,dispatch}){
        let currentPlay={
            currentTime: 0,
            process:0,
            duration: 0,
            url: '',
            poster:'',
            uid:'',
            title: '',
            artist: '',
            album: '',
        };
        let $index=state.PlayerComp.currentPlay.playOrderIndex;
        if(state.PlayerComp.playType!=3){/*3 loop*/
            $index-=1;
            if($index<0){
                $index=state.PlayerComp.playOrder.length-1;
            }
        }
        let playIndex={
            playOrderIndex:$index
        };
        dispatch('updatePlayOrderIndex',{playIndex});
        let uid=state.PlayerComp.playOrder[state.PlayerComp.currentPlay.playOrderIndex];
        if(state.PlayerComp.playList.currentPlayList.list.length!=0){
            let songList=state.PlayerComp.playList.currentPlayList.list;
            for(let i=0;i<songList.length;i++){
                if(songList[i].song.uid==uid){
                    currentPlay.uid=uid;
                    currentPlay.url=songList[i].song.url;
                    currentPlay.poster=songList[i].song.poster;
                    currentPlay.title=songList[i].song.title;
                    currentPlay.artist=songList[i].song.artist;
                    currentPlay.album=songList[i].song.album;
                }
            }
        }
        commit(TYPE.PLAYER_EVENT_PREVIOUS, {currentPlay});
    },
    playerProcess({commit}){
        let currentTime = state.PlayerComp.currentPlay.audio.currentTime;
        let duration =  state.PlayerComp.currentPlay.audio.duration;
        if (duration > 0) {
            let setCurrentPlay={
                process:currentTime / duration,
                duration:duration
            };
            commit(TYPE.PLAYER_EVENT_PROCESS,{setCurrentPlay})
        }
    },
    playerBuffered({commit}){
        let audio=state.PlayerComp.currentPlay.audio;
        let duration =  state.PlayerComp.currentPlay.audio.duration;
        if (duration > 0&&audio.buffered.length!=0) {
            let bufferedEnd = state.PlayerComp.currentPlay.audio.buffered.end(audio.buffered.length - 1);
            let setCurrentPlay={
                buffered:bufferedEnd / duration
            };
            commit(TYPE.PLAYER_EVENT_BUFFERED,{setCurrentPlay})
        }
    },
    playerToggle({commit},{toggle}){
        commit(TYPE.PLAYER_EVENT_TOGGLE,{toggle})
    },
    playerTogglePlayType({commit,dispatch}){
        let currentPlayType=state.PlayerComp.playType;
        currentPlayType+=1;
        currentPlayType=currentPlayType>3?1:currentPlayType;
        let playType={
            playType:currentPlayType
        };
        commit(TYPE.PLAYER_EVENT_TOGGLE_PLAY_TYPE,{playType});
        dispatch('initPlayOrder');
    },
};
export default {
    state,
    getters,
    actions,
    mutations
}