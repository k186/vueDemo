/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'

const state = {
    PlayerComp: {
        playType: 3, /*1 random order singleLoop*/
        playStatus: 0, /*0 pause 1 play*/
        currentPlay: {
            audio: {},
            currentTime:195,
            process:0,
            duration: 0,
            url: '',
            poster:'',
            uid:'',
            title: '',
            artist: '',
            album: '',
        },
        playList: {
            list: [
                {
                    isPlay: true,
                    song: {
                        url: 'http://k186studio.com/static/music/8545.mp3',
                        poster: '../../../static/imgs/poster/8545.jpg',
                        title: 'Try Everything (尝试一切)',
                        artist: 'Shakira',
                        album: 'Zootopia (Original Motion Picture Soundtrack) (疯狂动物城 电影原声带)',
                        uid: 8545, /*用这个去匹配下载列表 HASH 来设置isDownload*/
                        markTitle: {
                            quality: 1, /*0 normal 1 hq 2 sq */
                            exclusive: 1, /* 独家 0 1*/
                            mv: 1/*mv 0 1*/
                        }
                    }
                },
                {
                    isPlay: false,
                    song: {
                        url: 'http://k186studio.com/static/music/8548.mp3',
                        poster: '../../../static/imgs/poster/8548.jpg',
                        title: 'El Mismo Sol (Under The Same Sun) (B-Case Remix)',
                        artist: 'Alvaro Soler',
                        album: 'El Mismo Sol (Under The Same Sun) (B-Case Remix)',
                        uid: 8548, /*用这个去匹配下载列表 HASH 来设置isDownload*/
                        markTitle: {
                            quality: 1, /*0 normal 1 hq 2 sq */
                            exclusive: 1, /* 独家 0 1*/
                            mv: 1/*mv 0 1*/
                        }
                    }
                },
                {
                    isPlay: false,
                    song: {
                        url: 'http://k186studio.com/static/music/8546.mp3',
                        poster: '../../../static/imgs/poster/8546.jpg',
                        title: 'I Like Chopin',
                        artist: 'Gazebo',
                        album: 'Portrait',
                        uid: 8546, /*用这个去匹配下载列表 HASH 来设置isDownload*/
                        markTitle: {
                            quality: 1, /*0 normal 1 hq 2 sq */
                            exclusive: 1, /* 独家 0 1*/
                            mv: 1/*mv 0 1*/
                        }
                    }
                },
                {
                    isPlay: false,
                    song: {
                        url: 'http://k186studio.com/static/music/8543.mp3',
                        poster: '../../../static/imgs/poster/8543.jpg',
                        title: 'Heroes',
                        artist: 'Alesso',
                        album: 'Heroes (we could be)',
                        uid: 8543, /*用这个去匹配下载列表 HASH 来设置isDownload*/
                        markTitle: {
                            quality: 1, /*0 normal 1 hq 2 sq */
                            exclusive: 1, /* 独家 0 1*/
                            mv: 1/*mv 0 1*/
                        }
                    }
                },
                {
                    isPlay: false,
                    song: {
                        /*http://okzvi7b4z.bkt.clouddn.com*/
                        url: 'http://k186studio.com/static/music/1232.mp3',
                        poster: '../../../static/imgs/poster/1232.jpg',
                        title: 'Reality',
                        artist: 'A.M.7',
                        album: 'Reality (Single Version)',
                        uid: 1232, /*用这个去匹配下载列表 HASH 来设置isDownload*/
                        markTitle: {
                            quality: 1, /*0 normal 1 hq 2 sq */
                            exclusive: 1, /* 独家 0 1*/
                            mv: 1/*mv 0 1*/
                        }
                    }
                }
            ]
        }
    }
};
const getters = {
    PlayerComp: state => state.PlayerComp
};
const mutations = {
    [TYPE.PLAYER_EVENT_INIT](state, {currentPlay}){
        if(currentPlay!=null){
            state.PlayerComp.currentPlay.url=currentPlay.url;
            state.PlayerComp.currentPlay.title=currentPlay.title;
            state.PlayerComp.currentPlay.artist=currentPlay.artist;
            state.PlayerComp.currentPlay.album=currentPlay.album;
            state.PlayerComp.currentPlay.uid=currentPlay.uid;
            state.PlayerComp.currentPlay.poster=currentPlay.poster;
        }else {
            if(state.PlayerComp.playList.list.length!=0){
                state.PlayerComp.currentPlay.url=state.PlayerComp.playList.list[0].song.url;
                state.PlayerComp.currentPlay.title=state.PlayerComp.playList.list[0].song.title;
                state.PlayerComp.currentPlay.artist=state.PlayerComp.playList.list[0].song.artist;
                state.PlayerComp.currentPlay.album=state.PlayerComp.playList.list[0].song.album;
                state.PlayerComp.currentPlay.uid=state.PlayerComp.playList.list[0].song.uid;
                state.PlayerComp.currentPlay.poster=state.PlayerComp.playList.list[0].song.poster;
            }
        }
    },
    [TYPE.PLAYER_EVENT_PROCESS](state, {PlayerComp}){
        state.PlayerComp.currentPlay.process=PlayerComp.currentPlay.process;
        state.PlayerComp.currentPlay.duration=PlayerComp.currentPlay.duration;
    },
    [TYPE.PLAYER_EVENT_PLAY](state, {PlayerComp}){
        state.PlayerComp.playStatus = 1;
        state.PlayerComp.currentPlay.audio = PlayerComp.currentPlay.audio;
        state.PlayerComp.currentPlay.duration = PlayerComp.currentPlay.duration;
        state.PlayerComp.currentPlay.currentTime = PlayerComp.currentPlay.currentTime;
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
    }
};
const actions = {
    playerInit({commit}, {currentPlay}){
        commit(TYPE.PLAYER_EVENT_INIT, {currentPlay})
    },
    playerPlay({commit}, {PlayerComp}){
        commit(TYPE.PLAYER_EVENT_PLAY, {PlayerComp})
    },
    playerPause({commit}, {PlayerComp}){
        commit(TYPE.PLAYER_EVENT_PAUSE, {PlayerComp})
    },
    playerNext({commit}, {uid}){
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
        if(state.PlayerComp.playList.list.length!=0){
            let songList=state.PlayerComp.playList.list;
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
        commit(TYPE.PLAYER_EVENT_NEXT, {currentPlay})
    },
    playerProcess({commit}, {PlayerComp}){
        commit(TYPE.PLAYER_EVENT_PROCESS, {PlayerComp})
    },
};
export default {
    state,
    getters,
    actions,
    mutations
}