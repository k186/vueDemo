import IScroll from 'iscroll'
export default {
    name:'InitScroll',
    initScroll:function () {
        let timer=window.setInterval(function(){
            let myScroll = new IScroll('#wrapper', { mouseWheel: true });
            let scrollerHeight = window.document.getElementById("scroller").clientHeight;
            if(scrollerHeight==myScroll.scrollerHeight){
                window.clearInterval(timer);
            }
            myScroll.refresh();
        },500);
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    }
}