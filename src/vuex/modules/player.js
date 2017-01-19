/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'

const state = {
    player: {
        playerList:[]
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