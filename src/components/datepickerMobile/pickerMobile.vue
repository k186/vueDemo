<template>
  <div class="mobile-picker">
    <div class="picker-control">
      <div class="control-cancel">取消</div>
      <div class="control-date">
        {{tmpYear}}-{{tmpMonth+1}}-{{tmpDay}}
      </div>
      <div class="control-ok">确定</div>
    </div>
    <div class="picker-panel">
      <div class="panel-box">
        <div v-on:touchstart="myTouch($event,'year')" v-on:touchmove="myMove($event,'year')" v-on:touchend="myEnd($event,'year')" class="box-year">
          <div class="year-checked">
            <div class="year-list" data-translateY="0" style="transform: translateY(0rem);transition: transform 1000ms cubic-bezier(0.19, 1, 0.22, 1);">

              <div class="list-div" v-for="year in renderListYear" v-bind:data-index="year.index">{{year.value}}</div>
            </div>
          </div>
          <div class="year-wheel" style="transform: rotate3d(1, 0, 0,0deg);transition: transform 1000ms cubic-bezier(0.19, 1, 0.22, 1);">
            <div class="wheel-div" v-for="year in renderListYear" v-bind:data-index="year.index" v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-year.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{year.value}}</div>
          </div>
        </div>
        <div class="box-month" v-on:touchstart="myTouch($event,'month')" v-on:touchmove="myMove($event,'month')" v-on:touchend="myEnd($event,'month')">
          <div class="month-checked">
            <div class="month-list" data-translateY="0" style="transform: translateY(0rem)">
              <div class="list-div" v-for="month in renderListMonth" v-bind:data-index="month.index">{{month.value}}</div>
            </div>
          </div>
          <div class="month-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="month in renderListMonth" v-bind:data-index="month.index" v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-month.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{month.value}}</div>
          </div>
        </div>
        <div class="box-day" v-on:touchstart="myTouch($event,'day')" v-on:touchmove="myMove($event,'day')" v-on:touchend="myEnd($event,'day')">
          <div class="day-checked">
            <div class="day-list" data-translateY="0" style="transform: translateY(0rem)">
              <div class="list-div" v-for="day in renderListDay" v-bind:data-index="day.index">{{day.value}}</div>
            </div>
          </div>
          <div class="day-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="day in renderListDay" v-bind:data-index="day.index" v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-day.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{day.value}}</div>
          </div>
        </div>
        <div style="display: none" class="box-hour">
          <div class="hour-checked">
            <div class="hour-list" data-translateY="0" style="transform: translateY(0rem)">
              <div class="list-div" v-for="hour in renderListHour" v-bind:data-index="hour.index">{{hour.value}}</div>
            </div>
          </div>
          <div class="hour-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="hour in renderListHour" v-bind:data-index="hour.index" v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-hour.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{hour.value}}</div>
          </div>
        </div>
        <div style="display: none" class="box-minute"></div>
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
                yearList: Array.from({length: 12}, (value, index) => now.getFullYear() + index),
                monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                hourList: Array.from({length: 24}, (value, index) => 0 + index),
                tmpYear: now.getFullYear(),
                tmpMonth: now.getMonth(),
                tmpDay: now.getDate(),
                tmpHour: now.getHours(),
                tmpMinute: now.getMinutes(),
                Range:{
                  year:{
                      max:2050,
                      min:1992
                  }
                },
                spin: {
                    year: {
                        head: -9,
                        last: 9
                    },
                    month: {
                        head: -9,
                        last: 9
                    },
                    day: {
                        head: -9,
                        last: 9
                    },
                    hour: {
                        head: -9,
                        last: 9
                    },
                    minute: {
                        head: -9,
                        last: 9
                    }
                },
                touchYear: {
                    lastY: 0,
                    velocity: 0,
                    startTime: 0,
                    latsTime: 0,
                    lastMove: 0,
                    diff: 0
                },
                touchMonth: {
                    lastY: 0,
                    velocity: 0,
                    startTime: 0,
                    latsTime: 0,
                    lastMove: 0,
                    diff: 0
                },
                touchDay: {
                    lastY: 0,
                    velocity: 0,
                    startTime: 0,
                    latsTime: 0,
                    lastMove: 0,
                    diff: 0
                },
                touchHour: {
                    lastY: 0,
                    velocity: 0,
                    startTime: 0,
                    latsTime: 0,
                    lastMove: 0,
                    diff: 0
                },
                touchMinute: {
                    lastY: 0,
                    velocity: 0,
                    latsTime: 0,
                    lastMove: 0,
                    diff: 0
                },
                wheel: {
                    u: 2,
                    mass: 1000,
                    inertia: false,
                    frameRate: 60,
                },
              /*左右分支 个数*/
                branch: 9
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
              // [current,.......,max,min,.....current-1]
                let current=2016;
                let List=[];
                for(let k=0;k<this.Range.year.max-this.Range.year.min+1;k++){
                    List.push(this.Range.year.min+k)
                }
                return List
            },
            renderListYear(){
                let list=[];
                for (let k = this.spin.year.head; k <= this.spin.year.last; k++) {
                    let obj = {
                        value: this.getData(k, 'year'),
                        index: k,
                    };
                    list.push(obj)
                }
                return list
            },
            dayList () {
              /* get currentMonthLenght */
                let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate();
              /* get currentMonth day */
                let daylist = Array.from({length: currentMonthLength}, (value, index) => {
                    return index + 1
                });
                return daylist
            },
            renderListDay(){
                let list = [];
                for (let k = this.spin.day.head; k <= this.spin.day.last; k++) {
                    let obj = {
                        value: this.getData(k, 'day'),
                        index: k,
                    };
                    list.push(obj)
                }
                return list
            },
            renderListMonth(){
                let list = [];
                for (let k = this.spin.month.head; k <= this.spin.month.last; k++) {
                    let obj = {
                        value: this.getData(k, 'month'),
                        index: k,
                    };
                    list.push(obj)
                }
                return list
            },
            renderListHour(){
                let list = [];
                for (let k = this.spin.hour.head; k <= this.spin.hour.last; k++) {
                    let obj = {
                        value: this.getData(k, 'hour'),
                        index: k,
                    };
                    list.push(obj)
                }
                return list
            }
          /*
           *  renderList:{
           /* year:[],
           month:[],
           day:[],
           hour:[],
           minute:[]*/
        },
        mounted(){
          /*初始化checkList角度*/
            this.$el.getElementsByClassName('year-list')[0].style.transform = 'translateY(' + -this.branch * 68 / 75 + 'rem)';
            this.$el.getElementsByClassName('year-list')[0].style.marginTop = 0 + 'rem';

            this.$el.getElementsByClassName('month-list')[0].style.transform = 'translateY(' + -this.branch * 68 / 75 + 'rem)';
            this.$el.getElementsByClassName('month-list')[0].style.marginTop = 0 + 'rem';

            this.$el.getElementsByClassName('day-list')[0].style.transform = 'translateY(' + -this.branch * 68 / 75 + 'rem)';
            this.$el.getElementsByClassName('day-list')[0].style.marginTop = 0 + 'rem';

            this.$el.getElementsByClassName('hour-list')[0].style.transform = 'translateY(' + -this.branch * 68 / 75 + 'rem)';
            this.$el.getElementsByClassName('hour-list')[0].style.marginTop = 0 + 'rem';

           /* this.spin.day.head+=this.tmpDay-1
            this.spin.day.last+=this.tmpDay-1*/
        },
        methods: {
            myTouch(e, type){
                e.preventDefault();
                let wheel, List, Box;
                let roller = this.getType(type);
                wheel = roller.wheel;
                List = roller.List;
                Box = roller.Box;
              /*touchStart*/
              /*
               * startY
               * lastY
               * velocity
               * latsTime
               * */
                let startFinger = e.changedTouches[0];
                Box.lastY = startFinger.pageY;
                Box.velocity = 0;
                Box.lastTime = startFinger.timeStamp || Date.now();
                Box.lastMove = 0;
                Box.diff = startFinger.pageY;
              /*get speed*/
                //Box.velocity=vm.calculateVelocity(0,0,0);
              /*set css*/
                this.setCss(0, type, Box.velocity, false);
            },
            myMove(evt, type){
                evt.preventDefault();
                let wheel, List, Box, spin;
                let roller = this.getType(type);
                wheel = roller.wheel;
                List = roller.List;
                Box = roller.Box;
              /*touchMove*/
              /*
               * startY
               * lastY
               * velocity
               * latsTime
               * */

                let Finger = evt.changedTouches[0];
                let move = Finger.pageY - Box.lastY;
                let now = Finger.timeStamp || Date.now();

                let delta = now - Box.lastTime;
                let V = this.calculateVelocity(Box.velocity, move, delta);
                if (now - Box.lastTime < 30) {
                    //this.wheel.inertia=true;
                    //todo inertia
                    this.wheel.inertia = false;
                } else {
                    this.wheel.inertia = false;
                }
                Box.velocity = V;
                Box.lastY = Finger.pageY;
                Box.lastTime = now;
                Box.lastMove = move;
                let that = this;
                that.setCss(move, type, V, false);


              /*inertia*/

            },
            myEnd(evt, type){
                let wheel, List, Box, checked;
                let roller = this.getType(type);
                wheel = roller.wheel;
                List = roller.List;
                Box = roller.Box;
                evt.preventDefault();
                let Finger = evt.changedTouches[0];
                Box.startY = Finger.pageY;
                let move = Finger.pageY - Box.lastY;
                let now = Finger.timeStamp || Date.now();
                let delta = now - Box.lastTime;
                let V = this.calculateVelocity(Box.velocity, move, delta);
                Box.velocity = V;
                Box.lastY = Box.startY;
                Box.lastTime = now;
                Box.lastMove = move;
                this.setCss(move, type, V, true, checked);
                let vm = this;
                //vm.wheel.inertia=false;
                //todo inertial
              /* (function (v,startTime) {
               let dir=v>0? -1:1;//速度方向
               let acc=dir*vm.wheel.u/vm.wheel.mass;//摩擦系数~=加速度
               let duration=Math.abs(v/acc);/!*时间*!/
               let distance=((v+v*acc)/2 )*duration;/!*距离*!/
               let singleHeight = vm.px2rem(70);
               let singDegree = 20 / singleHeight;
               function inertialMove () {
               if(vm.wheel.inertia){
               let now=Date.now();
               let t=now-startTime;
               let nowV=(v+t*(acc))/2;
               let nowMove=v*t+acc*t*t/2;
               console.log('v'+nowV);
               console.log('move'+nowMove);
               /!*set css*!/
               let currentListRem = vm.$el.getElementsByClassName(List)[0].style.transform.replace(/[^0-9.-]/ig, "");
               let currentWheelDeg = vm.$el.getElementsByClassName(wheel)[0].style.transform.split(',')[3].replace(/[^0-9.-]/ig, "");
               /!*update css*!/
               let remHeight = vm.px2rem(nowMove) + parseFloat(currentListRem);
               let remDeg = parseFloat(currentWheelDeg) - vm.px2rem(nowMove) * singDegree;

               //console.log('v'+dir*nowV);
               // console.log('move'+nowMove);
               if(dir*nowV>0){
               return
               }

               //vm.$el.getElementsByClassName(List)[0].style.transition='all '+t*1000+'ms cubic-bezier(0,.81,.31,.81)';
               vm.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + remHeight + 'rem)';

               //vm.$el.getElementsByClassName(wheel)[0].style.transition='all '+t*1000+'ms cubic-bezier(0,.81,.31,.81)';
               vm.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';

               if(window.requestAnimationFrame){
               requestAnimationFrame(inertialMove)
               }else {
               setTimeout(inertialMove,1000/vm.wheel.frameRate)
               }
               }else {
               return
               }

               }
               inertialMove();

               })(V,now);*/

              /*set css*/
                //this.setCss(Box.totalMove, List, wheel,v);
                console.log('end');
            },
            setCss(move, type, v, isEnd){
                let wheel, List, Box;
                let roller = this.getType(type);
                wheel = roller.wheel;
                List = roller.List;
                Box = roller.Box;

                let singleHeight = this.px2rem(68);
                let singDegree = 20 / singleHeight;
              /*set css*/
                let currentListRem = this.$el.getElementsByClassName(List)[0].getAttribute('data-translateY');
              /*update css*/
                let remHeight = this.px2rem(move) + parseFloat(currentListRem);
                let remDeg = -remHeight * singDegree;
                let offsetHeight = remHeight - this.branch * singleHeight;
              /*int data*/
                let Px = Math.round(this.rem2px(remHeight) / 68) * 68;
                let rem = this.px2rem(Px);
                let aim = Math.round(remDeg / 20) * 20;
                let checkRem = this.px2rem(Math.round(-remDeg / 20) * 68 - this.branch * 68);
              /*change spin*/
                this.setSpin(type, aim);
              /*------------*/
                if (isEnd) {
                  /*data get int */
                    remHeight = rem;
                    remDeg = aim;
                    offsetHeight = checkRem;
                  /*set css*/
                    /*this.$el.getElementsByClassName(List)[0].style.transition='-webkit-transform 1000ms cubic-bezier(0.19, 1, 0.22, 1);';
                    this.$el.getElementsByClassName(wheel)[0].style.transition='-webkit-transform 1000ms cubic-bezier(0.19, 1, 0.22, 1);';*/

                    this.$el.getElementsByClassName(List)[0].setAttribute('data-translatey', remHeight);
                    this.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + offsetHeight + 'rem)';
                    this.$el.getElementsByClassName(List)[0].style.marginTop = -rem + 'rem';
                    this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';


                    /*cubic-bezier(0.190, 1.000, 0.220, 1.000)*/
                  /*get check data*/
                    this.setCheckData(type, aim)
                } else {
                    this.$el.getElementsByClassName(List)[0].setAttribute('data-translateY', remHeight);
                    this.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + offsetHeight + 'rem)';
                    this.$el.getElementsByClassName(List)[0].style.marginTop = -rem + 'rem';
                    this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';
                }
            },
            getType(type){
                let wheel, List, Box, spin;
                switch (type) {
                    case 'year':
                        wheel = 'year-wheel';
                        List = 'year-list';
                        Box = this.touchYear;
                        break;
                    case 'month':
                        wheel = 'month-wheel';
                        List = 'month-list';
                        Box = this.touchMonth;

                        break;
                    case 'day':
                        wheel = 'day-wheel';
                        List = 'day-list';
                        Box = this.touchDay;
                        spin = this.spin.day;
                        break;
                    case 'hour':
                        wheel = 'hour-wheel';
                        List = 'hour-list';
                        Box = this.touchHour;

                        break;
                    case 'min':
                        wheel = 'minute-wheel';
                        List = 'minute-list';
                        Box = this.touchminute;
                        break;
                }
                return {wheel: wheel, List: List, Box: Box}
            },
            setSpin(type, aim){
                switch (type) {
                    case 'year':
                        this.spin.year.head = this.branch * -1 + aim / 20;
                        this.spin.year.last = this.spin.year.head + this.branch * 2;
                        break;
                    case 'month':
                        this.spin.month.head = this.branch * -1 + aim / 20;
                        this.spin.month.last = this.spin.month.head + this.branch * 2;
                        break;
                    case 'day':
                        this.spin.day.head = this.branch * -1 + aim / 20;
                        this.spin.day.last = this.spin.day.head + this.branch * 2;
                        break;
                    case 'hour':
                        this.spin.hour.head = this.branch * -1 + aim / 20;
                        this.spin.hour.last = this.spin.hour.head + this.branch * 2;
                        break;
                    case 'min':
                        this.spin.minute.head = this.branch * -1 + aim / 20;
                        this.spin.minute.last = this.spin.minute.head + this.branch * 2;
                        break;
                }
            },
            setCheckData(type, deg){
                let index=deg/20;
                if (type == 'year') {
                    this.tmpYear=this.getData(index,type)
                } else if (type == 'month') {
                    this.tmpMonth=this.getData(index,type)-1
                } else if (type == 'day') {
                    this.tmpDay=this.getData(index,type);
                } else if (type == 'hour') {

                } else if (type == 'minute') {

                }
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
            calculateVelocity(startV, move, deltaTime){
                let velocity = startV + ((move / deltaTime) / this.wheel.touchRatio);
                velocity = !isNaN(velocity) ? velocity : 0;
                return velocity;
            },
            getData(idx, type){
                if (type == 'year') {
                    return this.yearList[idx % this.yearList.length >= 0 ? idx % this.yearList.length : idx % this.yearList.length + this.yearList.length];
                } else if (type == 'day') {
                    return this.dayList[idx % this.dayList.length >= 0 ? idx % this.dayList.length : idx % this.dayList.length + this.dayList.length];
                } else if (type == 'month') {
                    return this.monthList[idx % this.monthList.length >= 0 ? idx % this.monthList.length : idx % this.monthList.length + this.monthList.length];
                } else if (type == 'hour') {
                    return this.hourList[idx % this.hourList.length >= 0 ? idx % this.hourList.length : idx % this.hourList.length + this.hourList.length];
                } else if (type == 'minute') {
                    //return this.dayList[idx % this.dayList.length >= 0 ? idx % this.dayList.length : idx % this.dayList.length + this.dayList.length];
                }
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "pickerMobile.css";
</style>