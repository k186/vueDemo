import * as TYPE from '../mountion-type'

const state = {
    loading: {
        visible: false,
        type: 'success',
        message: 'loading',
        mask: false,
    }
};
const getters = {};
const mutations = {};
const actions = {
    [TYPE.LOADING_OPEN](){

    },
    [TYPE.LOADING_CLOSED](){

    }
};

export default {
    state,
    getters,
    actions,
    mutations
}