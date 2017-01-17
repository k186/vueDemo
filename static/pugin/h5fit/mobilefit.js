;(function (win,fit) {
    var doc =win.document;
    var docEl=doc.documentElement;
    var metaEl=doc.querySelector('meta[name=viewport]');
    var fitEl=doc.querySelector('meta[name=H5fit]');
    var dpr=0;
    var devicePixelRatio=win.devicePixelRatio;
    var scale=0;
    var tid;
    var H5fit=fit||(fit={});

    if(metaEl){
        console.warn('根据自定义的meta标签设置缩放');
        var match= metaEl.getAttribute('content').match(/initial\-scale=([\d\.])/);//scale=设备像素/物理像素（375/750）
        if(match){
            scale=parseFloat(match[1]);
            dpr=parseInt(1/scale);//取sacle的倒数
        }
    }else if(fitEl){//手动设置dpr
        var content=fitEl.getAttribute('content');
        if(content){
            var initialDpr=content.match(/initial\-dpr=([\d\.])/);
            var maximumDpr=content.match(/maximum\-dpr=(\d\.)/);
            if(initialDpr){
                dpr=parseFloat(initialDpr[1]);
                scale=parseFloat((1/dpr).toFixed(2));
            }
            if(maximumDpr){
                dpr=parseFloat(maximumDpr[1])>devicePixelRatio?parseFloat(maximumDpr[1]):devicePixelRatio;
                scale=parseFloat((1/dpr).toFixed(2));
            }
        }
    }
    if(!dpr&&!scale){
        if(devicePixelRatio){
            dpr=devicePixelRatio;
        }
        scale=1/dpr;
    }
    docEl.setAttribute('data-dpr',dpr);//html 节点添加data-dpr属性
    if(!metaEl){
        metaEl=doc.createElement('meta');
        metaEl.setAttribute('name','viewport');
        metaEl.setAttribute('content','initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no');
        if(docEl.firstElementChild){//head在不在
            docEl.firstElementChild.appendChild(metaEl);
        }else {//如果头不存在则用个盒子装起来
            var box=doc.createElement('div');
            box.appendChild('metaEl');
            doc.write(box.innerHTML);//写入HTML文档
        }
    }

    H5fit.refreshRem=function () {
        var width=docEl.getBoundingClientRect().width;//获取物理像素
        var rem=width/10;
        docEl.style.fontSize=rem+'px';
        H5fit.rem=win.rem=rem;
    };
    H5fit.rem2px=function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    };
    H5fit.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
    //监听窗口大小变化
    win.addEventListener('resize',function () {
        clearTimeout(tid);
        tid=setTimeout(H5fit.refreshRem,300);
    },false);
    //判断是缓存页面还是新拉页面
    win.addEventListener('pageshow',function (e) {
        if(e.persisted){
            clearTimeout(tid);
            tid=setTimeout(H5fit.refreshRem,300);
        }

    },false);
    //
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    H5fit.refreshRem();
    H5fit.dpr=win.dpr=dpr;
})(window,window['H5fit']||(window['H5fit']={}));