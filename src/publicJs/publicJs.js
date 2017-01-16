import IScroll from 'iscroll'
export default {
    name:'InitScroll',
    initScroll:function () {
        let that=this;
        let timer=window.setInterval(function(){
            let myScroll = new IScroll('#wrapper', { mouseWheel: true,click:that.isClick() });
            let scrollerHeight = window.document.getElementById("scroller").clientHeight;
            if(scrollerHeight==myScroll.scrollerHeight){
                window.clearInterval(timer);
            }
            myScroll.refresh();
        },500);
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    isClick:function () {
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
            var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
            return parseFloat(s[0]+s[3]) < 44 ? false : true
        }
    }
}