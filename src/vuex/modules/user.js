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
                        sheetCode: 121,
                        title: '222',
                        total: 82,
                        downloaded: 32,
                        img: 'url',
                        tags: [],
                        summary: '这个是简介',
                        songList: [
                            {
                                "sheetCodes": "2342,32432,43243,2342",
                                "SongCode": 3423,
                                "name": "Mc大队长",
                                "singer": "暴走漫画",
                                "album": "mccc",
                                "url": "sjafdlsajf.mp3",
                                "tag": {
                                    "sq": true,
                                    "hq": true,
                                    "mv": true,
                                    "exclusive": true
                                },
                                "mark": {
                                    "isDownload": true,
                                    "isInternet": true
                                }
                            }
                        ]
                    }
                ]
            },
            playList: [
                {
                    "sheetCodes": "2342,32432,43243,2342",
                    "SongCode": 3423,
                    "name": "Mc大队长",
                    "singer": "暴走漫画",
                    "album": "mccc",
                    "url": "sjafdlsajf.mp3",
                    "tag": {
                        "sq": true,
                        "hq": true,
                        "mv": true,
                        "exclusive": true
                    },
                    "mark": {
                        "isDownload": true,
                        "isInternet": true
                    }
                }
            ],
            totalSong: [
                {
                    "sheetCodes": "2342,32432,43243,2342",
                    "SongCode": 3423,
                    "name": "Mc大队长",
                    "singer": "暴走漫画",
                    "album": "mccc",
                    "url": "sjafdlsajf.mp3",
                    "tag": {
                        "sq": true,
                        "hq": true,
                        "mv": true,
                        "exclusive": true
                    },
                    "mark": {
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

};
const actions = {

};
export default {
    state,
    getters,
    actions,
    mutations
}