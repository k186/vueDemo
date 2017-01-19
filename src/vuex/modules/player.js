/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'

const state = {
    player: {
        "lyric":'urls',
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
};
/*api getters can use all*/
const getters = {
    player: state => state.player
};
const mutations = {};
const actions = {};
export default {
    state,
    getters,
    actions,
    mutations
}