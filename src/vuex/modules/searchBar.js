import * as TYPE from '../mutation-types'

const state = {
    alertBox:{
        visible:false,
        title:'提示信息',
        body:'',
        type:'',/*alert*/
        btn:{
            ok:'',
            cancel:''
        },
        callbackConfirm:null,
        callbackCancel:null
    }
};
/*api getters can use all*/
const getters = {
    alertBox:state=>state.alertBox
};
const mutations = {
    [TYPE.SEARCH_HISTORY_INIT](state, {alertBox}){
        state.alertBox.visible = true;
        state.alertBox.title=alertBox.title?alertBox.title:'提示信息';
        state.alertBox.body=alertBox.body?alertBox.body:'';
        state.alertBox.type=alertBox.type?alertBox.type:'confirm';
        state.alertBox.btn.ok=alertBox.btn?alertBox.btn.ok?alertBox.btn.ok:'确认':'确认';
        state.alertBox.btn.cancel=alertBox.btn?alertBox.btn.cancel?alertBox.btn.cancel:'取消':'取消';
        state.alertBox.callbackConfirm=alertBox.callbackConfirm?alertBox.callbackConfirm:null;
        state.alertBox.callbackCancel=alertBox.callbackCancel?alertBox.callbackCancel:null;
    },
    [TYPE.ALERT_CANCEL](state){
        state.alertBox.visible = false
    }
};
const actions = {
    alertInit({commit}, {alertBox}){
        commit(TYPE.ALERT_INIT,{alertBox} );
    },
    alertConfirm({commit}, {alertBox}){
        commit(TYPE.ALERT_CANCEL,{alertBox});
        if(state.alertBox.callbackConfirm.constructor==Function){
            state.alertBox.callbackConfirm();
        }
    },
    alertCancel({commit}){
        commit(TYPE.ALERT_CANCEL);
        if(state.alertBox.callbackCancel.constructor==Function){
            state.alertBox.callbackCancel();
        }
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}