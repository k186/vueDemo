/**
 * Created by k186 on 2017/2/16.
 */
import * as TYPE from '../mutation-types'

const state = {
  sheetDetailList: {
    sheetCode: null,
    title: '',
    downloaded: 0,
    count: 0,
    playHistory: 0,
    poster: '',
    author: {
      name: '',
      head: ''
    },
    mark: '', /* 介绍 */
    tags: [], /* 数组映射 */
    list: []
  }
}
const getters = {
  sheetDetailList: state => state.sheetDetailList
}
const mutations = {
  [TYPE.SHEET_DETAIL_INIT] (state, {Detail}) {
    state.sheetDetailList = Detail
  }
}
const actions = {
  sheetDetailInit ({commit}, {Detail}) {
    commit(TYPE.SHEET_DETAIL_INIT, {Detail})
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
