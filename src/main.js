import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './router/routerindex'
import Mapping from './router/routerMapping'
import store from './vuex'
import * as TYPE from './vuex/mutation-types'
/*router*/
Vue.use(VueRouter);
const router = new VueRouter({
    routes:Mapping.routes()
});
/* compatible weChat change title */
let setDocumentTitle = function (title) {
    document.title = title;
    let ua = navigator.userAgent;
    if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }

};
router.afterEach(routes=>{
    typeof routes.meta.title !== undefined && setDocumentTitle(routes.meta.title);
    let loading={
        visible: true,
        type: 'loading',
        message: '请稍候...',
        mask: false,
    };
    /*fake loading test*/
    store.commit(TYPE.LOADING_OPEN,loading);
    setTimeout(function () {
        loading.visible=false;
        store.commit(TYPE.LOADING_CLOSED,{loading})
    },1000)
});
/*router end*/
new Vue({
    router,
    store,
    render(tpl){
       return tpl(Index)
    },
    methods:{

    }
}).$mount('#app');

