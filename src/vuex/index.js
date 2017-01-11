import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import loading from './modules/loading'
import alert from './modules/alert'

Vue.use(Vuex);
export default new Vuex.Store({
    actions,
    getters,
    modules:{
        loading,
        alert
    }
})