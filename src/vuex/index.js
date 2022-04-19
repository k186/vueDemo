import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import alert from './modules/alert'
import history from './modules/searchHistory'
import searchBar from './modules/searchBar'
import user from './modules/user'
import player from './modules/player'
import radio from './modules/personalRadio'
import sheetDetail from './modules/sheetDetail'
import MusicConfig from './modules/musicConfigule'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  modules: {
    loading,
    alert,
    history,
    searchBar,
    user,
    player,
    radio,
    sheetDetail,
    MusicConfig
  }
})
