/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'

const state = {
    userData: {
        basicInfo: {
            name: 'K186 Studio',
            img: 'url',
            vip:3,
            SheetList: {
                count: 32,
                SheetLists: [
                    {
                        sheetCode: 1,
                        title: '222',
                        count: 82,
                        downloaded: 32,
                        img: 'url',
                        tags: [],
                        summary: '这个是简介',
                        list: [
                            {
                                isLike:true,
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
                                isLike:true,
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
                                isPlay: false,
                                isLike:true,
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
                                isPlay: false,
                                isLike:true,
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
                        ]
                    },
                    {
                        sheetCode: 2,
                        title: '222',
                        count: 33,
                        downloaded: 32,
                        img: 'url',
                        tags: [],
                        summary: '这个是简介',
                        list: [
                            {
                                isPlay: false,
                                isLike:true,
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
                                isPlay: false,
                                isLike:true,
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
                            {
                                isLike:true,
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
                                isLike:true,
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
                            }
                        ]
                    }
                ]
            },
            totalSong: [
                {
                    isLike:true,
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
                    isLike:true,
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
                    isPlay: false,
                    isLike:true,
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
                    isPlay: false,
                    isLike:true,
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
            favourite:[],
            purchased:[],
        },

    }
};
/*api getters can use all*/
const getters = {
    userData: state => state.userData
};
const mutations = {
    [TYPE.USER_EVENT_UPDATE_PLAYER](state){
       state.PlayerComp.SheetLists=list.SheetList;
       //todo  more list
    },
};
const actions = {
    updatePlayer({dispatch}){
        let list={
            SheetLists:state.userData.basicInfo.SheetList.SheetLists
        };
        dispatch('updateList',{list})
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}