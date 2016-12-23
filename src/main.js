import Vue from 'vue'
import Router from 'vue-router'
import Index from './router/routerindex'
import Mapping from './router/routerMapping'

Vue.use(Router);
const router = new Router({
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
    typeof routes.meta.title !== undefined && setDocumentTitle(routes.meta.title)
});
new Vue({
    el: '#app',
    router,
    render(tpl){
       return tpl(Index)
    },
    methods:{

    }
});

