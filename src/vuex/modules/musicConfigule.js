/**
 * Created by k186 on 2017/2/17.
 */
const state = {
  MusicConfig: {
    iconVip: 'http://okzvi7b4z.bkt.clouddn.com/music/icon/vip/',
    poster: 'http://okzvi7b4z.bkt.clouddn.com/music/poster/',
    music: 'http://okzvi7b4z.bkt.clouddn.com/music/',
    userHead: 'http://k186studio.com/static/music/img/',
    dpr: window.dpr
  }
}
const getters = {
  MusicConfig: state => state.MusicConfig
}
export default {
  state,
  getters
}
