<template>
  <div class="mobile-picker">
    <div class="picker-control">
      <div class="control-cancel">取消</div>
      <div class="control-ok">确定</div>
    </div>
    <div class="picker-panel">
      <div class="panel-box">
        <div v-on:touchstart="myTouch($event,'year')" v-on:touchmove="myMove($event,'year')" v-on:touchend="myEnd($event,'year')" class="box-year">
          <div class="year-checked">
            <div class="year-list" style="transform: translateY(0rem)">
              <div v-for="year in yearList">{{year}}</div>
            </div>
          </div>
          <div class="year-wheel" style="transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="(year,index) in yearList" v-bind:style="wheelYear(index)">{{year}}</div>
          </div>
        </div>
        <div class="box-month">
          <div class="month-checked">
            <div class="month-list">
              <div v-for="month in monthList">{{month}}</div>
            </div>
          </div>
          <div class="month-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="(month,index) in monthList" v-bind:style="wheelMonth(index)">{{month}}</div>
          </div>
        </div>
        <div class="box-day">
          <div class="day-checked">
            <div class="day-list">
              <div v-for="day in dayList">{{day}}</div>
            </div>
          </div>
          <div class="day-wheel" style=" transform: rotate3d(1, 0, 0,0deg) translate3d(0px, 0px,2.6rem);">
            <div class="wheel-div" v-for="day,index in dayList" v-bind:style="wheelDay(index)">{{day}}</div>
          </div>
        </div>
        <!--   <div class="box-hour"></div>
           <div class="box-minute"></div>-->
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        name: 'pickerMobile',
        data(){
            let now = new Date();
            return {
                monthList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                dayList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                yearDeg: [180,160,140,120,100,80, 60, 40, 20, 0, -20, -40, -60, -80,-100,-120,-140,-160],
                monthDeg: [80, 60, 40, 20, 0, -20, -40, -60, -80],
                dayDeg: [80, 60, 40, 20, 0, -20, -40, -60, -80],
                touchYear: {
                    startY: 0,
                    lastY:0
                },
                bounce:{
                    lastMoveTime:0,
                    lastMoveStart:0,
                    stopBounce:false
                },
                tempYear: now.getFullYear()
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        computed: {
            yearList(){
                /*let a = [];
                for (let i = 0; i < 4; i++) {
                    a.push(this.tempYear + i)
                }
                for (let i = 1; i <=5; i++) {
                    a.unshift(this.tempYear - i)
                }
                return a*/

                return Array.from({length: 18}, (value, index) => 2016 + index)
            }
        },
        mounted(){
        },
        methods: {
            wheelYear(index){
               /* if (index <9) {
                    return {transform: 'rotate3d(1, 0, 0,' + this.yearDeg[index] + 'deg) translate3d(0px, 0px, 2.5rem)'}

                } else {
                    return {}
                }*/
                return {transform: 'rotate3d(1, 0, 0,' + this.yearDeg[index] + 'deg) translate3d(0px, 0px, 2.5rem)'};
            },
            wheelMonth(index){
                if (index < 9) {
                    return {transform: 'rotate3d(1, 0, 0,' + this.monthDeg[index] + 'deg) translate3d(0px, 0px, 2.5rem)'}
                } else {
                    return {}
                }
            },
            wheelDay(index){
                if (index < 9) {
                    return {transform: 'rotate3d(1, 0, 0,' + this.dayDeg[index] + 'deg) translate3d(0px, 0px, 2.5rem)'}
                } else {
                    return {}
                }
            },
            myTouch(e,type){
                e.preventDefault();
                let wheel,List;
                switch(type){
                    case 'year':
                        wheel='year-wheel';
                        List='year-list';
                        break;
                    case 'month':
                        wheel='month-wheel';
                        List='month-list';
                        break;
                    case 'day':
                        wheel='day-wheel';
                        List='day-list';
                        break;
                    case 'hour':
                        wheel='hour-wheel';
                        List='hour-list';
                        break;
                    case 'min':
                        wheel='minute-wheel';
                        List='minute-list';
                        break;
                }
                let startFinger=e.changedTouches[0];
                /*touchStart*/
                this.touchYear.startY=this.touchYear.lastY=startFinger.pageY;
                console.log('start');
                /*bounce*/
                this.bounce.lastMoveStart=this.touchYear.lastY;
                this.bounce.lastMoveTime=e.timestamp||Date.now();
                this.bounce.stopBounce=true;
            },
            myMove(evt,type){
                let wheel,List;
                switch(type){
                    case 'year':
                        wheel='year-wheel';
                        List='year-list';
                        break;
                    case 'month':
                        wheel='month-wheel';
                        List='month-list';
                        break;
                    case 'day':
                        wheel='day-wheel';
                        List='day-list';
                        break;
                    case 'hour':
                        wheel='hour-wheel';
                        List='hour-list';
                        break;
                    case 'min':
                        wheel='minute-wheel';
                        List='minute-list';
                        break;
                }
                evt.preventDefault();
                let nowFinger=evt.changedTouches[0];
                let nowY= nowFinger.pageY;
                let move=nowY-this.touchYear.lastY;
                /*set css*/
                this.setCss(move,List,wheel);
                /*update lastY*/
                this.touchYear.lastY=nowY;
                console.log('move');
                /*bounce*/
                let nowTime=evt.timestamp||Date.now();
                this.bounce.stopBounce=false;
                if(nowTime-this.bounce.lastMoveTime>300){
                    this.bounce.lastMoveTime=nowTime;
                    this.bounce.lastMoveStart=nowY;
                }
            },
            myEnd(evt,type){
                let wheel,List;
                switch(type){
                    case 'year':
                        wheel='year-wheel';
                        List='year-list';
                        break;
                    case 'month':
                        wheel='month-wheel';
                        List='month-list';
                        break;
                    case 'day':
                        wheel='day-wheel';
                        List='day-list';
                        break;
                    case 'hour':
                        wheel='hour-wheel';
                        List='hour-list';
                        break;
                    case 'min':
                        wheel='minute-wheel';
                        List='minute-list';
                        break;
                }
                evt.preventDefault();
                let nowFinger=evt.changedTouches[0];
                let nowY= nowFinger.pageY;
                let move=nowY-this.touchYear.lastY;
                /*set css*/
                this.setCss(move,List,wheel);
                /*update lastY*/
                this.touchYear.lastY=nowY;
                console.log('end');

                /*bounce*/
                let nowTime=evt.timestamp||Date.now();
                console.log(nowTime)
                let v=(nowY-this.bounce.lastMoveStart)/(nowTime-this.bounce.lastMoveTime);
                this.bounce.stopBounce=false;
                let vm=this;
                (function (v, startTime) {
                    let dir=v>0?-1:1;
                    let deceleration=dir*0.0006;
                    let duration=v/deceleration;
                    let dis=v*duration/2;
                    function bounceMove () {
                        if(vm.bounce.stopBounce)return;
                            let nowTimeIn=evt.timestamp||Date.now();
                            console.log(nowTimeIn);
                            let t=nowTimeIn-startTime;
                            let nowV=v+t*deceleration;
                           /* if(dir*nowV<0){
                                return;
                            }*/
                            let move=(v+nowV)/2*t;
                            move=vm.px2rem(move);
                            console.log('move'+move);
                            if(move<0&&dir<0){
                                return;
                            }else if(move>0&&dir>0) {
                                return
                            }

                            let singleHeight=vm.px2rem(70);
                            let singDegree=20/singleHeight;
                            /*set css*/
                            let currentListRem=vm.$el.getElementsByClassName(List)[0].style.transform.replace(/[^0-9.-]/ig,"");
                            let currentWheelDeg=vm.$el.getElementsByClassName(wheel)[0].style.transform.split(',')[3].replace(/[^0-9.-]/ig,"");
                            /*update css*/
                            let remHeight=vm.px2rem(move) +parseFloat(currentListRem);
                            let remDeg=parseFloat(currentWheelDeg)-vm.px2rem(move)*singDegree;
                            vm.$el.getElementsByClassName(List)[0].style.transform='translateY('+remHeight+'rem)';
                            vm.$el.getElementsByClassName(wheel)[0].style.transform='rotate3d(1, 0, 0, ' + remDeg + 'deg)';

                            setTimeout(bounceMove,10);
                            console.log(111)

                    }
                    bounceMove();
                })(v,nowTime);
            },
            setCss(move,List,wheel){
                let singleHeight=this.px2rem(70);
                let singDegree=20/singleHeight;
                /*set css*/
                let currentListRem=this.$el.getElementsByClassName(List)[0].style.transform.replace(/[^0-9.-]/ig,"");
                let currentWheelDeg=this.$el.getElementsByClassName(wheel)[0].style.transform.split(',')[3].replace(/[^0-9.-]/ig,"");
                /*update css*/
                let remHeight=this.px2rem(move) +parseFloat(currentListRem);
                let remDeg=parseFloat(currentWheelDeg)-this.px2rem(move)*singDegree;
                this.$el.getElementsByClassName(List)[0].style.transform='translateY('+remHeight+'rem)';
                this.$el.getElementsByClassName(wheel)[0].style.transform='rotate3d(1, 0, 0, ' + remDeg + 'deg)';
            },
            px2rem(d){
                var val = parseFloat(d) / 75;
                if (typeof d === 'string' && d.match(/px$/)) {
                    val += 'rem';
                }
                return val;
            },
            rem2px(d){
                var val = parseFloat(d) * 75;
                if (typeof d === 'string' && d.match(/rem$/)) {
                    val += 'px';
                }
                return val;
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "pickerMobile.css";
</style>