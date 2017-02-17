/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'
import urlMapping from '../../api/urlMapping'
const state = {
    PlayerComp: {
        visible: true,
        playType: 2, /*1 random order singleLoop*/
        playStatus: 0, /*0 pause 1 play*/
        playOrder: [],
        currentPlay: {
            audio: {},
            currentTime: 0,
            process: 0,
            buffered: 0,
            duration: 0,
            url: '',
            poster: '',
            uid: '',
            title: '',
            artist: '',
            album: '',
            playOrderIndex: 0
        },
        playList: {
            visible: false,
            currentPlayList: {
                count: 0,
                sheetCode: '',
                title: '',
                list: []
            },
            historyList: {
                count: 0,
                title: '',
                sheetCode: '',
                list: []
            }
        },
    }
};
const getters = {
    PlayerComp: state => state.PlayerComp
};
const mutations = {
    [TYPE.PLAYER_EVENT_INIT](state, {setCurrentPlay}){
        state.PlayerComp.currentPlay.audio = setCurrentPlay.audio;
    },
    [TYPE.PLAYER_EVENT_PLAY](state, {PlayerComp}){
        state.PlayerComp.playStatus = 1;
        state.PlayerComp.currentPlay.audio = PlayerComp.currentPlay.audio;
        state.PlayerComp.currentPlay.duration = PlayerComp.currentPlay.duration;
        state.PlayerComp.currentPlay.currentTime = PlayerComp.currentPlay.currentTime;
        state.PlayerComp.currentPlay.playOrderIndex = PlayerComp.currentPlay.playOrderIndex;
    },
    [TYPE.PLAYER_EVENT_PAUSE](state, {PlayerComp}){
        state.PlayerComp.playStatus = 0;
        state.PlayerComp.currentPlay.audio = PlayerComp.currentPlay.audio;
        state.PlayerComp.currentPlay.duration = PlayerComp.currentPlay.duration;
        state.PlayerComp.currentPlay.currentTime = PlayerComp.currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_PROCESS](state, {setCurrentPlay}){
        state.PlayerComp.currentPlay.process = setCurrentPlay.process;
        state.PlayerComp.currentPlay.duration = setCurrentPlay.duration;
    },
    [TYPE.PLAYER_EVENT_NEXT](state, {currentPlay}){
        state.PlayerComp.currentPlay.uid = currentPlay.uid;
        state.PlayerComp.currentPlay.url = currentPlay.url;
        state.PlayerComp.currentPlay.poster = currentPlay.poster;
        state.PlayerComp.currentPlay.title = currentPlay.title;
        state.PlayerComp.currentPlay.artist = currentPlay.artist;
        state.PlayerComp.currentPlay.album = currentPlay.album;
        state.PlayerComp.currentPlay.currentTime = currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_PREVIOUS](state, {currentPlay}){
        state.PlayerComp.currentPlay.uid = currentPlay.uid;
        state.PlayerComp.currentPlay.url = currentPlay.url;
        state.PlayerComp.currentPlay.poster = currentPlay.poster;
        state.PlayerComp.currentPlay.title = currentPlay.title;
        state.PlayerComp.currentPlay.artist = currentPlay.artist;
        state.PlayerComp.currentPlay.album = currentPlay.album;
        state.PlayerComp.currentPlay.currentTime = currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_TOGGLE](state, {toggle}){
        state.PlayerComp.visible = toggle.PlayerVisible;
        state.PlayerComp.playList.visible = !toggle.PlayerVisible;
    },
    [TYPE.PLAYER_EVENT_TOGGLE_PLAY_TYPE](state, {playType}){
        state.PlayerComp.playType = playType.playType;
    },
    [TYPE.PLAYER_EVENT_BUFFERED](state, {setCurrentPlay}){
        state.PlayerComp.currentPlay.buffered = setCurrentPlay.buffered;
    },
    [TYPE.PLAYER_EVENT_PLAY_ORDER](state, {playOrder}){
        state.PlayerComp.playOrder = playOrder;
    },
    [TYPE.PLAYER_EVENT_SET_CURRENT](state, {currentPlay}){
        state.PlayerComp.currentPlay.uid = currentPlay.uid;
        state.PlayerComp.currentPlay.url = currentPlay.url;
        state.PlayerComp.currentPlay.poster = currentPlay.poster;
        state.PlayerComp.currentPlay.title = currentPlay.title;
        state.PlayerComp.currentPlay.artist = currentPlay.artist;
        state.PlayerComp.currentPlay.album = currentPlay.album;
        state.PlayerComp.currentPlay.currentTime = currentPlay.currentTime;
    },
    [TYPE.PLAYER_EVENT_UPDATE_PLAYLIST](state, {playList}){
        if(playList.currentPlayList.sheetCode==state.PlayerComp.playList.currentPlayList.sheetCode){
            state.PlayerComp.playList.currentPlayList = playList.currentPlayList;
        }else {
            state.PlayerComp.playList.historyList = playList.historyList ? playList.historyList : state.PlayerComp.playList.currentPlayList;
            state.PlayerComp.playList.currentPlayList = playList.currentPlayList;
        }
    },
    [TYPE.PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX](state, {playIndex}){
        state.PlayerComp.currentPlay.playOrderIndex = playIndex.playOrderIndex;
    },
    [TYPE.PLAYER_EVENT_DELETE_SINGLE](state, {updateData}){
        state.PlayerComp.playList.currentPlayList =updateData.currentPlayList;
        state.PlayerComp.playOrder =updateData.playOrder;
    },
    [TYPE.PLAYER_EVENT_CLEAR_PLAY_LIST](state){
        state.PlayerComp.playList.currentPlayList={
            count: 0,
            sheetCode: '',
            title: '',
            list: []
        };
        state.PlayerComp.currentPlay={
            currentTime: 0,
            process: 0,
            duration: 0,
            url: '',
            poster: '',
            uid: '',
            title: '',
            artist: '',
            album: '',
        }
    }
};
const actions = {
    playerInit({commit, dispatch}){
        let audio = document.getElementById('audio');
        audio.preload = 'none';
        let setCurrentPlay = {
            audio: audio
        };
        commit(TYPE.PLAYER_EVENT_INIT, {setCurrentPlay});
        audio.addEventListener('timeupdate', function () {
            //dispatch('playerProcess');
        });
        audio.addEventListener('progress', function () {
            //dispatch('playerBuffered');
        });
    },
    playerPlay({commit}){
        /*get lat play currentTime*/
        state.PlayerComp.currentPlay.audio.currentTime = state.PlayerComp.currentPlay.currentTime;
        /*play*/
        if (state.PlayerComp.currentPlay.url != '') {
            setTimeout(function () {/*这里设置 延迟播放*/
                state.PlayerComp.currentPlay.audio.play();
            }, 50);
            let PlayerComp = {
                currentPlay: {
                    audio: state.PlayerComp.currentPlay.audio,
                    duration: state.PlayerComp.currentPlay.audio.duration,
                    currentTime: state.PlayerComp.currentPlay.currentTime,
                    playOrderIndex: state.PlayerComp.playOrder.indexOf(state.PlayerComp.currentPlay.uid)
                }
            };
            commit(TYPE.PLAYER_EVENT_PLAY, {PlayerComp});
        }
        console.log('play')
    },
    playerPause({commit}){
        /*play*/
        state.PlayerComp.currentPlay.audio.pause();
        let PlayerComp = {
            currentPlay: {
                audio: state.PlayerComp.currentPlay.audio,
                duration: state.PlayerComp.currentPlay.audio.duration,
                currentTime: state.PlayerComp.currentPlay.audio.currentTime, /*set currentTime*/
            }
        };
        commit(TYPE.PLAYER_EVENT_PAUSE, {PlayerComp});
        console.log('pause')
    },
    playerProcess({commit,dispatch}){
        let currentTime = state.PlayerComp.currentPlay.audio.currentTime;
        let duration = state.PlayerComp.currentPlay.audio.duration;
        if (duration > 0) {
            let setCurrentPlay = {
                process: currentTime / duration,
                duration: duration
            };
            commit(TYPE.PLAYER_EVENT_PROCESS, {setCurrentPlay});
            if(setCurrentPlay.process==1){
                dispatch('playerNext')
            }
        }
    },
    playerNext({commit, dispatch}){
        dispatch('playerPause');
        let currentPlay = {
            currentTime: 0,
            process: 0,
            duration: 0,
            url: '',
            poster: '',
            uid: '',
            title: '',
            artist: '',
            album: '',
        };
        let $index = state.PlayerComp.currentPlay.playOrderIndex;
        $index += 1;
        if ($index > state.PlayerComp.playOrder.length - 1) {
            $index = 0;
        }
        let playIndexObj = {
            playOrderIndex: $index
        };
        dispatch('updatePlayOrderIndex', {playIndexObj});
        let uid = state.PlayerComp.playOrder[state.PlayerComp.currentPlay.playOrderIndex];
        if (state.PlayerComp.playList.currentPlayList.list.length != 0) {
            let songList = state.PlayerComp.playList.currentPlayList.list;
            for (let i = 0; i < songList.length; i++) {
                if (songList[i].song.uid == uid) {
                    currentPlay.uid = uid;
                    currentPlay.url = songList[i].song.url;
                    currentPlay.poster = songList[i].song.poster;
                    currentPlay.title = songList[i].song.title;
                    currentPlay.artist = songList[i].song.artist;
                    currentPlay.album = songList[i].song.album;
                    break;
                }
            }
        }
        commit(TYPE.PLAYER_EVENT_NEXT, {currentPlay});
        dispatch('playerPlay');
    },
    playerPrevious({commit, dispatch}){
        dispatch('playerPause');
        let currentPlay = {
            currentTime: 0,
            process: 0,
            duration: 0,
            url: '',
            poster: '',
            uid: '',
            title: '',
            artist: '',
            album: '',
        };
        let $index = state.PlayerComp.currentPlay.playOrderIndex;
        $index -= 1;
        if ($index < 0) {
            $index = state.PlayerComp.playOrder.length - 1;
        }
        let playIndexObj = {
            playOrderIndex: $index
        };
        dispatch('updatePlayOrderIndex', {playIndexObj});
        let uid = state.PlayerComp.playOrder[state.PlayerComp.currentPlay.playOrderIndex];
        if (state.PlayerComp.playList.currentPlayList.list.length != 0) {
            let songList = state.PlayerComp.playList.currentPlayList.list;
            for (let i = 0; i < songList.length; i++) {
                if (songList[i].song.uid == uid) {
                    currentPlay.uid = uid;
                    currentPlay.url = songList[i].song.url;
                    currentPlay.poster = songList[i].song.poster;
                    currentPlay.title = songList[i].song.title;
                    currentPlay.artist = songList[i].song.artist;
                    currentPlay.album = songList[i].song.album;
                    break;
                }
            }
        }
        commit(TYPE.PLAYER_EVENT_PREVIOUS, {currentPlay});
        dispatch('playerPlay');
    },
    playerToggle({commit}, {toggle}){
        commit(TYPE.PLAYER_EVENT_TOGGLE, {toggle})
    },
    playerTogglePlayType({commit, dispatch},{setPlayType}){
        if(!setPlayType){
            let currentPlayType = state.PlayerComp.playType;
            currentPlayType += 1;
            currentPlayType = currentPlayType > 3 ? 1 : currentPlayType;
            let playType = {
                playType: currentPlayType
            };
            commit(TYPE.PLAYER_EVENT_TOGGLE_PLAY_TYPE, {playType});
        }else {
            let playType = {
                playType: setPlayType
            };
            commit(TYPE.PLAYER_EVENT_TOGGLE_PLAY_TYPE, {playType});
        }
        dispatch('initPlayOrder');
        dispatch('updatePlayOrderIndex',{});
    },
    playerBuffered({commit}){
        let audio = state.PlayerComp.currentPlay.audio;
        let duration = state.PlayerComp.currentPlay.audio.duration;
        if (duration > 0 && audio.buffered.length != 0) {
            let bufferedEnd = state.PlayerComp.currentPlay.audio.buffered.end(audio.buffered.length - 1);
            let setCurrentPlay = {
                buffered: bufferedEnd / duration
            };
            commit(TYPE.PLAYER_EVENT_BUFFERED, {setCurrentPlay})
        }
    },
    initPlayOrder({commit}){
        let playOrder = [];
        console.log('before:'+state.PlayerComp.playOrder);
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
        commit(TYPE.PLAYER_EVENT_PLAY_ORDER, {playOrder});
        console.log('after:'+state.PlayerComp.playOrder)
    },
    playerSet({commit, dispatch}, {option}){
        //只从自己的 playList.currentPlayList 取歌曲 todo 对应列表组件都要有一个方法来往currentPlayList 填充数据 根据不同的标识符 from 调用对应组件的方法 来自radio的不设置历史记录
        //from sheet all search favorite  [list history radio]{playList} 判断从哪点的
        /*options
         * uid String 需要播放歌曲的uid
         * sheetCode String 列表编码
         * from String  sheet all search favorite  [list history radio] 来源
         * playType 播放类型 1 random order singleLoop
         * */
        function isPlayCurrent(uid) {
            return state.PlayerComp.currentPlay.uid == uid
        }

        function playPause() {
            dispatch('playerPause');
        }

        function playPlay() {
            dispatch('playerPlay');
        }

        function setCurrent(callback) {
            let currentPlay = {
                currentTime: 0,
                process: 0,
                duration: 0,
                url: '',
                poster: '',
                uid: '',
                title: '',
                artist: '',
                album: '',
            };
            let tmpArr = state.PlayerComp.playList.currentPlayList.list;
            if(option.uid){
                for (let k = 0; k < tmpArr.length; k++) {
                    if (tmpArr[k].song.uid == option.uid) {
                        currentPlay.uid = option.uid;
                        currentPlay.url = tmpArr[k].song.url;
                        currentPlay.poster = tmpArr[k].song.poster;
                        currentPlay.title = tmpArr[k].song.title;
                        currentPlay.artist = tmpArr[k].song.artist;
                        currentPlay.album = tmpArr[k].song.album;
                        break;
                    }
                }
            }else {
                currentPlay.uid = tmpArr[0].song.uid;
                currentPlay.url = tmpArr[0].song.url;
                currentPlay.poster = tmpArr[0].song.poster;
                currentPlay.title = tmpArr[0].song.title;
                currentPlay.artist = tmpArr[0].song.artist;
                currentPlay.album = tmpArr[0].song.album;
            }

            commit(TYPE.PLAYER_EVENT_SET_CURRENT, {currentPlay});
            if (callback) {
                callback();
            }
        }

        function updatePlayList(currentPlayList, historyList, initOrder, callback) {
            let playList = {
                currentPlayList: currentPlayList ? currentPlayList : {count: 0, sheetCode: '', list: [], title: ''},
                historyList: historyList ? historyList : {count: 0, sheetCode: '', list: [], title: ''},
                initOrder: initOrder ? initOrder : false
            };
            dispatch('updatePlaylist', {playList});
            if (callback) {
                callback();
            }
        }

        if (option.from == 'list') {
            if (!isPlayCurrent(option.uid)) {
                playPause();
                setCurrent();
                playPlay();
            }
        } else if (option.from == 'history') {
            let currentPlayList = state.PlayerComp.playList.currentPlayList;
            let historyList = state.PlayerComp.playList.historyList;
            updatePlayList(historyList, currentPlayList, true, function () {
                if (!isPlayCurrent(option.uid)) {
                    playPause();
                    setCurrent();
                    playPlay();
                }
            });
        } else if (option.from == 'radio') {
            dispatch('updateRadioToPlayList',{callback:function () {
                if (!isPlayCurrent(option.uid)) {
                    playPause();
                    setCurrent();
                    playPlay();
                }
            }});
        } else if (option.from == 'sheet') {
            /*get data from user sheet whit sheet code*/
            dispatch('updatePlayer', {sheetCode: option.sheetCode});
            if (!isPlayCurrent(option.uid)) {
                playPause();
                setCurrent();
                playPlay();
            }
            if(option.playType){
                dispatch('playerTogglePlayType',{setPlayType:option.playType})
            }
        } else if (option.from == 'search') {

        } else if (option.from == 'all') {

        } else if(option.from=='favourite'){
            dispatch('setFavouriteToPlayList',{callback:function () {
                if (!isPlayCurrent(option.uid)) {
                    playPause();
                    setCurrent();
                    playPlay();
                }
            }})
        }

    },
    updatePlaylist({commit, dispatch}, {playList}){
        commit(TYPE.PLAYER_EVENT_UPDATE_PLAYLIST, {playList});
        if (playList.initOrder) {
            dispatch('initPlayOrder')
        }
    },
    updatePlayOrderIndex({commit}, {playIndexObj}){
        let playIndex=playIndexObj?playIndexObj:{ playOrderIndex:state.PlayerComp.playOrder.indexOf(state.PlayerComp.currentPlay.uid)};
        console.log('index:'+playIndex.playOrderIndex);
        commit(TYPE.PLAYER_EVENT_UPDATE_PLAY_ORDER_INDEX, {playIndex})
    },
    deleteSingleInPlayList({commit,dispatch},{uid}){
        let playOrder=JSON.parse(JSON.stringify(state.PlayerComp.playOrder));
        let $index= playOrder.indexOf(uid);
        playOrder.splice(playOrder.indexOf(uid),1);
        let currentPlayList=JSON.parse(JSON.stringify(state.PlayerComp.playList.currentPlayList));
        for(let i=0;i<currentPlayList.list.length;i++){
            if(currentPlayList.list[i].song.uid==uid){
                currentPlayList.list.splice(i,1);
                currentPlayList.count-=1;
                if(currentPlayList.count<0){
                    currentPlayList.count=0
                }
                break;
            }
        }
        let updateData={
            currentPlayList:currentPlayList,
            playOrder:playOrder
        };
        /*first to update playlist and play order then update current play index and song*/
        commit(TYPE.PLAYER_EVENT_DELETE_SINGLE,{updateData});
        if(uid==state.PlayerComp.currentPlay.uid){
            $index-=1;
            if($index<0){
                $index=0;
            }
            let playIndexObj = {
                playOrderIndex: $index
            };
            dispatch('updatePlayOrderIndex', {playIndexObj});
            dispatch('playerNext')
        }else {
            let playIndexObj = {
                playOrderIndex: state.PlayerComp.playOrder.indexOf(state.PlayerComp.currentPlay.uid)
            };
            dispatch('updatePlayOrderIndex', {playIndexObj});
        }
    },
    clearPlayList({commit,dispatch}){
        if(window.confirm('确定清空播放列表？')){
            dispatch('playerPause');
            commit(TYPE.PLAYER_EVENT_CLEAR_PLAY_LIST)
        }

    }
};
export default {
    state,
    getters,
    actions,
    mutations
}