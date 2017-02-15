/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'
import urlMapping from '../../api/urlMapping'

const state = {
    userData: {
        basicInfo: {
            name: 'K186 Studio',
            img: 'url',
            vip: 3,
            SheetList: {
                count: 32,
                list: [
                    {
                        sheetCode: 2,
                        title: '22223423432',
                        downloaded: 2,
                        count: 4,
                        playHistory: 30,
                        poster: '../../../static/imgs/poster/1232.jpg',
                        author: {
                            name:'k186 Studio',
                            head:''
                        },
                        mark: '', /*介绍*/
                        tags: [1, 2, 3],/*数组映射*/
                        list: [
                            {
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
                                },
                                mark: {
                                    "isDownload": true,
                                    "isInternet": true
                                }
                            },
                            {
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
                                },
                                mark: {
                                    "isDownload": true,
                                    "isInternet": true
                                }
                            },
                        ]
                    }
                ]
            },
            totalSong: [
                {
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
                    },
                    mark: {
                        "isDownload": true,
                        "isInternet": true
                    }
                },
                {
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
                    },
                    mark: {
                        "isDownload": true,
                        "isInternet": true
                    }
                },
                {
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
                    },
                    mark: {
                        "isDownload": true,
                        "isInternet": true
                    }
                },
                {
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
                    },
                    mark: {
                        "isDownload": true,
                        "isInternet": true
                    }
                }
            ],
            favourite: {
                count: 4,
                uidFilter:{
                    "8545":true,
                    "8548":true,
                    "8546":true,
                    "8543":true
                },
                list: [
                    {
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
                        },
                        mark: {
                            "isDownload": true,
                            "isInternet": true
                        }
                    },
                    {
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
                        },
                        mark: {
                            "isDownload": true,
                            "isInternet": true
                        }
                    },
                    {
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
                        },
                        mark: {
                            "isDownload": true,
                            "isInternet": true
                        }
                    },
                    {
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
                        },
                        mark: {
                            "isDownload": true,
                            "isInternet": true
                        }
                    },
                ]
            },
            purchased: [],
        },

    }
};
/*api getters can use all*/
const getters = {
    userData: state => state.userData
};
const mutations = {
    [TYPE.USER_EVENT_UPDATE_PLAY_LIST](state){
        //todo maybe use timeFlag tu update user data
    },
    [TYPE.USER_EVENT_UPDATE_FAVOURITE](state,{favourite}){
        state.userData.basicInfo.favourite=favourite
    },
    [TYPE.USER_EVENT_UPDATE_FAVOURITE_FILTER](state,{uid}){
        state.userData.basicInfo.favourite.uidFilter[uid]=!state.userData.basicInfo.favourite.uidFilter[uid]
    }
};
const actions = {
    updatePlayer({commit,dispatch}, {sheetCode}){
        let currentPlayListData = null;
        function returnList() {
            let currentPlayList = null;
            let dataObj = state.userData.basicInfo.SheetList.list;
            for (let i = 0; i < dataObj.length; i++) {
                if (dataObj[i].sheetCode == sheetCode) {
                    currentPlayList = {
                        count: dataObj[i].count,
                        sheetCode: sheetCode,
                        list: dataObj[i].list,
                        title: dataObj[i].title
                    };
                    break;
                }
            }
            return currentPlayList;
        }
        currentPlayListData = returnList();
        let playList = {
            currentPlayList: currentPlayListData ? currentPlayListData : {count: 0, sheetCode: '', list: [], title: ''},
            historyList: null,
            initOrder: true
        };
        dispatch('updatePlaylist', {playList});
        commit(TYPE.USER_EVENT_UPDATE_PLAY_LIST)
    },
    updateFavourite({commit}){
        let Map = new urlMapping();
        Map.ajaxGetData({
            url: 'GET_UPDATE_FAVOURITE',
            type: 'get',
            data: state.userData.basicInfo.favourite.uidFilter,
            callback: function (data) {
                if (data.success) {
                    if(data.model){
                        let favourite=data.model;
                        commit(TYPE.USER_EVENT_UPDATE_FAVOURITE,{favourite})
                    }
                } else {
                    let loadingControl = {type: 'failed', message: data.message};
                    dispatch('loadingShow', {loadingControl});
                    setTimeout(function () {
                        dispatch('loadingClose');
                    }, 1500)
                }
            }
        })
    },
    updateFilter({commit,dispatch},{uid}){
        commit(TYPE.USER_EVENT_UPDATE_FAVOURITE_FILTER,{uid});
        dispatch('updateFavourite')
    },
    isLikeFilter({commit,dispatch},{uid}){
        console.log(state.userData.basicInfo.favourite.uidFilter);
        return !!state.userData.basicInfo.favourite.uidFilter[uid];
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}