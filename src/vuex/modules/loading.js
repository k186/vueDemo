import * as TYPE from '../mutation-types'

const state = {
  loadingControl: {
    visible: false,
    type: '', // success  failed loading
    message: '',
    mask: false
  }
}
/* api getters can use all */
const getters = {
  /* loading:state=>state.loading */
  loadingControl: function (state) {
    return state.loadingControl
  }
}
const mutations = {
  [TYPE.LOADING_OPEN] (state, {loadingControl}) {
    state.loadingControl.visible = true
    state.loadingControl.type = loadingControl.type ? loadingControl.type : 'loading'
    state.loadingControl.message = loadingControl.message ? loadingControl.message : '请稍候...'
    state.loadingControl.mask = loadingControl.mask ? loadingControl.mask : false
  },
  [TYPE.LOADING_CLOSED] (state) {
    state.loadingControl.visible = false
  }
}
const actions = {
  loadingShow ({commit}, {loadingControl}) {
    commit(TYPE.LOADING_OPEN, {loadingControl})
  },
  loadingClose ({commit}) {
    commit(TYPE.LOADING_CLOSED)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
