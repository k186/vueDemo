/**
 * Created by k186 on 2017/1/19.
 */
import * as TYPE from '../mutation-types'
import urlMapping from '../../api/urlMapping'

const state = {
    userData: {
        basicInfo: {
            name: '',
            img: '',
            vip: 0,
            SheetList: {
                count: 0,
                list: []
            },
            totalSong: [],
            favourite: {
                count: 0,
                uidFilter:{},
                list: []
            },
            purchased: []
        }
    }
};
/*api getters can use all*/
const getters = {
    userData: state => state.userData
};
const mutations = {
    [TYPE.USER_EVENT_UPDATE_PLAY_LIST](state){
        //todo maybe use timeFlag tu update user data
    },
    [TYPE.USER_EVENT_UPDATE_FAVOURITE](state,{favourite}){
        state.userData.basicInfo.favourite=favourite
    },
    [TYPE.USER_EVENT_UPDATE_FAVOURITE_FILTER](state,{uid}){
        state.userData.basicInfo.favourite.uidFilter[uid]=!state.userData.basicInfo.favourite.uidFilter[uid]
    },
    [TYPE.USER_EVENT_FIND_SHEET_WITH_CODE](state){

    },
    [TYPE.USER_EVENT_INIT](state,{userData}){
        state.userData=userData
    }
};
const actions = {
    updatePlayer({commit,dispatch}, {sheetCode}){
        let currentPlayListData = null;
        function returnList() {
            let currentPlayList = null;
            let dataObj = state.userData.basicInfo.SheetList.list;
            for (let i = 0; i < dataObj.length; i++) {
                if (dataObj[i].sheetCode == sheetCode) {
                    currentPlayList = {
                        count: dataObj[i].count,
                        sheetCode: sheetCode,
                        list: dataObj[i].list,
                        title: dataObj[i].title
                    };
                    break;
                }
            }
            return currentPlayList;
        }
        currentPlayListData = returnList();
        let playList = {
            currentPlayList: currentPlayListData ? currentPlayListData : {count: 0, sheetCode: '', list: [], title: ''},
            historyList: null,
            initOrder: true
        };
        dispatch('updatePlaylist', {playList});
        commit(TYPE.USER_EVENT_UPDATE_PLAY_LIST)
    },
    updateFavourite({commit}){
        let Map = new urlMapping();
        Map.ajaxGetData({
            url: 'GET_UPDATE_FAVOURITE',
            type: 'get',
            data: state.userData.basicInfo.favourite.uidFilter,
            callback: function (data) {
                if (data.success) {
                    if(data.model){
                        let favourite=data.model;
                        commit(TYPE.USER_EVENT_UPDATE_FAVOURITE,{favourite})
                    }
                } else {
                    let loadingControl = {type: 'failed', message: data.message};
                    dispatch('loadingShow', {loadingControl});
                    setTimeout(function () {
                        dispatch('loadingClose');
                    }, 1500)
                }
            }
        })
    },
    updateFilter({commit,dispatch},{uid}){
        commit(TYPE.USER_EVENT_UPDATE_FAVOURITE_FILTER,{uid});
        dispatch('updateFavourite')
    },
    isLikeFilter({commit,dispatch},{uid}){
        return !!state.userData.basicInfo.favourite.uidFilter[uid];
    },
    findSheetWithCode({commit,dispatch},{sheetCode}){
       commit(TYPE.USER_EVENT_FIND_SHEET_WITH_CODE);
        let Detail=null;
        function findSheetDetail (sheetCode) {
            let Data=state.userData.basicInfo.SheetList.list;
            let DetailF={};
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].sheetCode == sheetCode) {
                    DetailF=Data[i];
                    break;
                }
            }
            return DetailF;
        }
        Detail=findSheetDetail(sheetCode);
        dispatch('sheetDetailInit',{Detail:Detail})
    },
    initUserData({commit},{token}){
        let Map = new urlMapping();
        Map.ajaxGetData({
            url: 'GET_INIT_USER_DATA',
            type: 'get',
            data: {userToken:token},
            callback: function (data) {
                if (data.success) {
                    if(data.model){
                        commit(TYPE.USER_EVENT_INIT,{userData:data.model.userData})
                    }
                } else {

                }
            }
        })
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}