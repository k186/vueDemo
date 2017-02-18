/**
 * Created by k186 on 2017/2/17.
 */
const state={
    MusicConfig:{
        iconVip:"http://www.k186studio.com/static/music/icon/vip/",
        poster:"",
        music:"",
        userHead:"http://k186studio.com/static/music/img/",
        dpr:window.dpr
    }
};
const getters = {
    MusicConfig: state => state.MusicConfig
};
export default {
    state,
    getters
}