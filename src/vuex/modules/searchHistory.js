import * as TYPE from '../mutation-types'

const state = {
  searchHistory: {
    hotData: [],
    historyData: [],
    timeStamp: ''
  }
}
/* api getters can use all */
const getters = {
  searchHistory: state => state.searchHistory
}
const mutations = {
  [TYPE.SEARCH_HISTORY_INIT] (state, {searchHistory}) {
    state.searchHistory.hotData = searchHistory.hotData
    state.searchHistory.historyData = searchHistory.historyData
    state.searchHistory.timeStamp = searchHistory.timeStamp
  },
  [TYPE.SEARCH_HISTORY_UPDATE] (state, {searchHistory}) {
    state.searchHistory.historyData = searchHistory.historyData
  }
}
const actions = {
  intHistory ({commit}, {searchHistory}) {
    commit(TYPE.SEARCH_HISTORY_INIT, {searchHistory})
  },
  updateHistory ({commit}, {searchHistory}) {
    commit(TYPE.SEARCH_HISTORY_UPDATE, {searchHistory})
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
