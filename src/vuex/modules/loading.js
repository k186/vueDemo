import * as TYPE from '../mutation-types'

const state = {
    loadingControl: {
        visible: true,
        type: 'success',
        message: '请稍候...',
        mask: false,
    }
};
/*api getters can use all*/
const getters = {
    /*loading:state=>state.loading*/
    loadingControl: function (state) {
        return state.loadingControl;
    }
};
const mutations = {
    [TYPE.LOADING_OPEN](state, loadingControl){
        loadingControl.visible = true;
        state.loadingControl = loadingControl
    },
    [TYPE.LOADING_CLOSED](state, loadingControl){
        loadingControl.visible = false;
        state.loadingControl = loadingControl
    }
};
const actions = {
    loadingShow({commit}, loadingControl){
        commit(TYPE.LOADING_OPEN, loadingControl)
    },
    loadingClose({commit}, loadingControl){
        commit(TYPE.LOADING_CLOSED, loadingControl)
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}