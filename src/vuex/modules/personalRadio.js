import * as TYPE from '../mutation-types'
import UrlMapping from '../../api/urlMapping'
const state = {
  personalRadio: {
    sheetCode: 'radio',
    title: '个性电台',
    described: '来听听和「Tik Tau」一样好听的歌曲吧',
    poster: '',
    count: 3,
    list: []
  }
}
const getters = {
  /* loading:state=>state.loading */
  personalRadio: function (state) {
    return state.personalRadio
  }
}
const mutations = {
  [TYPE.PERSONAL_RADIO_INIT] (state, {initData}) {
    state.personalRadio.title = initData.title
    state.personalRadio.described = initData.described
    state.personalRadio.poster = initData.poster
    state.personalRadio.count = initData.count
    state.personalRadio.list = initData.list
  },
  [TYPE.PERSONAL_RADIO_UPDATE_PLAY_LIST] ({state}) {

  }
}
const actions = {
  initRadio ({commit, dispatch}, {callback}) {
    let Map = new UrlMapping()
    Map.ajaxGetData({
      url: 'GET_PERSONAL_RADIO_INIT',
      type: 'get',
      data: {},
      callback: function (data) {
        /* if success set playlist */
        if (data.success) {
          let initData = data.model
          commit(TYPE.PERSONAL_RADIO_INIT, {initData})
          if (callback) {
            callback()
          }
        } else {
          let loadingControl = {type: 'failed', message: data.message}
          dispatch('loadingShow', {loadingControl})
          setTimeout(function () {
            dispatch('loadingClose')
          }, 1500)
        }
      }
    })
  },
  updateRadioToPlayList ({commit, dispatch}, {callback}) {
    let currentPlayListData = null

    function updateToPlayList (callback) {
      let dataObj = state.personalRadio
      let currentPlayList = {
        count: dataObj.count ? dataObj.count : 0,
        sheetCode: dataObj.sheetCode ? dataObj.sheetCode : '',
        list: dataObj.list ? dataObj.list : [],
        title: dataObj.title ? dataObj.title : ''
      }
      currentPlayListData = currentPlayList
      let playList = {
        currentPlayList: currentPlayListData !== null ? currentPlayListData : {count: 0, sheetCode: '', list: [], title: ''},
        historyList: {count: 0, sheetCode: '', list: [], title: ''}, /* radio must set like this other set null */
        initOrder: true
      }
      dispatch('updatePlaylist', {playList})
      if (callback) {
        callback()
      }
    }

    commit(TYPE.PERSONAL_RADIO_UPDATE_PLAY_LIST)
    if (state.personalRadio.list.length === 0) {
      dispatch('initRadio', {
        callback: function () {
          updateToPlayList(callback)
        }
      })
    } else {
      updateToPlayList(callback)
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
