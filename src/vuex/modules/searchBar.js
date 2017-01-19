import * as TYPE from '../mutation-types'

const state = {
    searchBar:{
       value:''
    }
};
/*api getters can use all*/
const getters = {
    searchBar:state=>state.searchBar
};
const mutations = {
    [TYPE.SEARCH_EVENT](state, {searchBar}){
        state.alertBox.value = searchBar.value;
    }
};
const actions = {
    searchEvt({commit}, {searchBar}){
        commit(TYPE.SEARCH_EVENT,{searchBar});
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}