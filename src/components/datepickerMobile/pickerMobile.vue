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
                yearDeg: [180, 160, 140, 120, 100, 80, 60, 40, 20, 0, -20, -40, -60, -80, -100, -120, -140, -160],
                monthDeg: [80, 60, 40, 20, 0, -20, -40, -60, -80],
                dayDeg: [80, 60, 40, 20, 0, -20, -40, -60, -80],
                touchYear: {
                    startY: 0,
                    lastY: 0,
                    totalMove: 0,
                    latMove: 0,
                    velocity: 0,
                    latsTime: 0,
                    inertialTime: 0
                },
                bounce: {
                    lastMoveTime: 0,
                    lastMoveStart: 0,
                    stopBounce: false
                },
                wheel: {
                    u: 4,
                    mass: 1000,
                    wheelRatio: 1000,
                    touchRatio: 20
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
            myTouch(e, type){
                e.preventDefault();
                let wheel, List, Current;
                switch (type) {
                    case 'year':
                        wheel = 'year-wheel';
                        List = 'year-list';
                        Current = this.touchYear;
                        break;
                    case 'month':
                        wheel = 'month-wheel';
                        List = 'month-list';
                        break;
                    case 'day':
                        wheel = 'day-wheel';
                        List = 'day-list';
                        break;
                    case 'hour':
                        wheel = 'hour-wheel';
                        List = 'hour-list';
                        break;
                    case 'min':
                        wheel = 'minute-wheel';
                        List = 'minute-list';
                        break;
                }
                let startFinger = e.changedTouches[0];
              /*touchStart*/
              /*
               startY: 0,
               lastY:0,
               totalMove:0,
               lastMove:0,
               velocity:0,
               latsTime:0,
               inertialTime:0
               * */
                let now = startFinger.timeStamp || Date.now();
                Current.startY = startFinger.pageY ;
                Current.lastY = startFinger.pageY;
                Current.totalMove = 0;
                Current.lastMove = 0;
                Current.velocity = 0;
                Current.lastTime = now;
                Current.inertialTime =  Current.lastTime;
                this.setCss(Current.totalMove,List,wheel, Current.velocity);
            },
            myMove(evt, type){
                let wheel, List, Current;
                switch (type) {
                    case 'year':
                        wheel = 'year-wheel';
                        List = 'year-list';
                        Current = this.touchYear;
                        break;
                    case 'month':
                        wheel = 'month-wheel';
                        List = 'month-list';
                        break;
                    case 'day':
                        wheel = 'day-wheel';
                        List = 'day-list';
                        break;
                    case 'hour':
                        wheel = 'hour-wheel';
                        List = 'hour-list';
                        break;
                    case 'min':
                        wheel = 'minute-wheel';
                        List = 'minute-list';
                        break;
                }
                evt.preventDefault();
                let now =evt.timeStamp||Date.now();
                let nowFinger = evt.changedTouches[0];
                let nowY = nowFinger.pageY;
                Current.lastTime=now;
                Current.lastMove=nowY-Current.lastY;
                let v=this.caculateVelocity(Current);
               /*update lastY*/
                Current.lastY = nowY;
               /*set css*/
                this.setCss(Current.totalMove, List, wheel,v);
                console.log('move');
                let vm=this;

              /*delay function*/
                (function inertia() {
                  /*
                   u: 4,
                   mass: 1000,
                   wheelRatio: 1000,
                   touchRatio: 20
                   */
                    let vv=!isNaN(Current.velocity)?Current.velocity:0;
                    if(!Current.inertialTime){
                        Current.inertialTime=Date.now();
                    }else if(vv!=0){
                        let now =Date.now(),
                            force=v*vm.wheel.u,
                            acc=force/vm.wheel.mass,
                            deltaTime=now-Current.inertialTime,
                            velocity=v-(acc*deltaTime);
                        vv=!isNaN(velocity)?velocity:0;
                        let move=vv*deltaTime;
                        Current.totalMove+=move;
                        Current.inertialTime=now;
                        vm.setCss(Current.totalMove, List, wheel,vv);
                        console.log('vvv');
                    }
                    if(window.requestAnimationFrame){
                        requestAnimationFrame(inertia);
                    }else{
                        setTimeout(inertia, 1000/60);
                    }
                })();
            },
            myEnd(evt, type){
                let wheel, List,Current;
                switch (type) {
                    case 'year':
                        wheel = 'year-wheel';
                        List = 'year-list';
                        Current=this.touchYear;
                        break;
                    case 'month':
                        wheel = 'month-wheel';
                        List = 'month-list';
                        break;
                    case 'day':
                        wheel = 'day-wheel';
                        List = 'day-list';
                        break;
                    case 'hour':
                        wheel = 'hour-wheel';
                        List = 'hour-list';
                        break;
                    case 'min':
                        wheel = 'minute-wheel';
                        List = 'minute-list';
                        break;
                }
                evt.preventDefault();
                let v=this.caculateVelocity(Current);
               /*set css*/
                this.setCss(Current.totalMove, List, wheel,v);
                console.log('end');
                Current.inertialTime=null;
            },
            setCss(move, List, wheel,v){
                let singleHeight = this.px2rem(70);
                let singDegree = 20 / singleHeight;
              /*set css*/
                let currentListRem = this.$el.getElementsByClassName(List)[0].style.transform.replace(/[^0-9.-]/ig, "");
                let currentWheelDeg = this.$el.getElementsByClassName(wheel)[0].style.transform.split(',')[3].replace(/[^0-9.-]/ig, "");
              /*update css*/
                let remHeight = this.px2rem(move) + parseFloat(currentListRem);
                let remDeg = parseFloat(currentWheelDeg) - this.px2rem(move) * singDegree;
                this.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + remHeight + 'rem)';
                // this.$el.getElementsByClassName(List)[0].style.transition='all '+time+'s ease-in-out';
                this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';
                //this.$el.getElementsByClassName(wheel)[0].style.transition='all '+time+'s ease-in-out';
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
            },
            caculateVelocity(obj){
                let now = Date.now(),
                    deltaTime = now - obj.lastTime,
                    velocity = obj.velocity + ((obj.lastMove / deltaTime) /this.wheel.touchRatio);
                velocity=!isNaN(velocity)?velocity:0;
                return velocity;
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "pickerMobile.css";
</style>