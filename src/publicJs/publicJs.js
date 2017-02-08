import IScroll from 'iscroll'
export default {
    name:'InitScroll',
    myScroll:{},
    initScroll:function (wrapper,scrooler,option) {
        let that=this;
        let timer=window.setInterval(function(){
            if(option){
                option.click=that.isClick();
                that.myScroll = new IScroll('#'+wrapper,option);
            }else {
                that.myScroll = new IScroll('#'+wrapper, { mouseWheel: false,click:that.isClick() });
            }
            let scrollerHeight = window.document.getElementById(scrooler).clientHeight;
            if(scrollerHeight){
                window.addEventListener('resize',function () {
                    let tid;
                    clearTimeout(tid);
                    tid=setTimeout(function(){
                        that.refresh(that.myScroll)
                    },300);
                    console.log('refreshScroll')
                },false);
                window.clearInterval(timer);
            }
            that.refresh(that.myScroll);
        },50);
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    refresh:function (myScroll) {
        myScroll.refresh();
    },
    isClick:function () {
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return true;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
            var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
            return parseFloat(s[0]+s[3]) < 44 ? false : true
        }
    },
    setIndex:function (className) {
        let divs = window.document.getElementsByTagName("*");
        let max = 0;
        for (let i = 0; i < divs.length; i++) {
            if( /^\d+$/.test(getComputedStyle(divs[i])['z-index'])){
                max = Math.max(max, getComputedStyle(divs[i])['z-index'] || 0);
            }
        }
        window.document.getElementsByClassName(className)[0].style.zIndex=max
    }
}