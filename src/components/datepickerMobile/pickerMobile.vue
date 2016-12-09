<template>
    <div class="mobile-picker">
        <div class="picker-control">
            <div class="control-cancel">取消</div>
            <div class="control-ok" v-on:click="test">确定</div>
        </div>
        <div class="picker-panel">
            <div class="panel-box">
                <div v-on:touchstart="myTouch($event,'year')" v-on:touchmove="myMove($event,'year')" v-on:touchend="myEnd($event,'year')" class="box-year">
                    <div class="year-checked">
                        <div class="year-list" style="transform: translateY(0rem)">
                            <div></div>
                        </div>
                    </div>
                    <div class="year-wheel" style="transform: rotate3d(1, 0, 0,0deg)">
                        <div class="wheel-div"></div>
                    </div>
                </div>
                <div class="box-month" v-on:touchstart="myTouch($event,'month')" v-on:touchmove="myMove($event,'month')" v-on:touchend="myEnd($event,'month')">
                    <div class="month-checked">
                        <div class="month-list" style="transform: translateY(0rem)">
                            <div></div>
                        </div>
                    </div>
                    <div class="month-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
                        <div class="wheel-div"></div>
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
                tmpYear: now.getFullYear(),
                tmpMonth: now.getMonth(),
                tmpDay: now.getDate(),
                tmpHour: now.getHours(),
                tmpMinute: now.getMinutes(),
                spin: {
                    day: {
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
                /*checklist 个数*/
                branch: 40

            }
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        computed: {
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
                for (let k = this.spin.day.head; k < this.spin.day.last; k++) {
                    let obj = {
                        value: this.getData(k, 'day'),
                        index: k
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
            this.$el.getElementsByClassName('day-list')[0].style.transform = 'translateY(' + -9*68/75/2 + 'rem)';
            this.$el.getElementsByClassName('day-list')[0].style.marginTop =  -9*68/75/2 + 'rem';
        },
        methods: {
            myTouch(e, type){
                e.preventDefault();
                let wheel, List, Box;
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
                this.setCss(0, List, wheel, Box.velocity, false);
            },
            myMove(evt, type){
                evt.preventDefault();
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
                this.setCss(move, List, wheel, V, false);
                /*inertia*/

            },
            myEnd(evt, type){
                let wheel, List, Box, checked;
                switch (type) {
                    case 'year':
                        wheel = 'year-wheel';
                        List = 'year-list';
                        Box = this.touchYear;
                        checked = this.checkedYear;
                        break;
                    case 'month':
                        wheel = 'month-wheel';
                        List = 'month-list';
                        Box = this.touchMonth;
                        checked = this.checkedMonth;
                        break;
                    case 'day':
                        wheel = 'day-wheel';
                        List = 'day-list';
                        Box = this.touchDay;
                        checked = this.checkedDay;
                        break;
                    case 'hour':
                        wheel = 'hour-wheel';
                        List = 'hour-list';
                        checked = this.checkedHour;
                        break;
                    case 'min':
                        wheel = 'minute-wheel';
                        List = 'minute-list';
                        checked = this.checkedMinute;
                        break;
                }
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
                this.setCss(move, List, wheel, V, true, checked);
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
            setCss(move, List, wheel, v, isEnd){
                let singleHeight = this.px2rem(68);
                let singDegree = 20 / singleHeight;
                /*set css*/
                let currentListRem = this.$el.getElementsByClassName(List)[0].getAttribute('data-translateY');
                let lastRem = this.$el.getElementsByClassName(List)[0].style.transform.replace(/[^0-9.-]/ig, "");
                let marginRem = this.$el.getElementsByClassName(List)[0].style.marginTop.replace(/[^0-9.-]/ig, "");
                let currentWheelDeg = this.$el.getElementsByClassName(wheel)[0].style.transform.split(',')[3].replace(/[^0-9.-]/ig, "");
                /*update css*/
                let remHeight = this.px2rem(move) + parseFloat(currentListRem);
                //let remDeg = parseFloat(currentWheelDeg) - this.px2rem(move) * singDegree;
                let remDeg = -remHeight * singDegree;
                //todo int rem
                let Px = Math.round(this.rem2px(remHeight) / 68) * 68;
                let rem = this.px2rem(Px);
                let aim = Math.round(remDeg / 20) * 20;


                /*change spin*/
                if (Math.abs(aim - currentWheelDeg) >= 10) {
                    if (aim - currentWheelDeg > 0) {
                        this.spin.day.head += Math.round((aim - currentWheelDeg) / 20);
                        this.spin.day.last += Math.round((aim - currentWheelDeg) / 20);
                        console.log('1')
                    } else {
                        this.spin.day.head += Math.round((aim - currentWheelDeg) / 20);
                        this.spin.day.last += Math.round((aim - currentWheelDeg) / 20);
                    }
                }
                /*------------*/

                if (isEnd) {
                    remHeight = rem;
                    remDeg = aim;
                }
                this.$el.getElementsByClassName(List)[0].setAttribute('data-translatey',remHeight);
                this.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + lastRem+ remHeight + 'rem)';
                this.$el.getElementsByClassName(List)[0].style.marginTop = 'translateY(' + lastRem+ marginRem + 'rem)';
                //this.$el.getElementsByClassName(List)[0].style.transition='';
                //this.$el.getElementsByClassName(List)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';
                this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';
                //this.$el.getElementsByClassName(wheel)[0].style.transition='';
                return {remHeight: remHeight, remDeg: remDeg}
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
                if (type == 'day') {
                    return this.dayList[idx % this.dayList.length >= 0 ? idx % this.dayList.length : idx % this.dayList.length + this.dayList.length];
                }
            },
            isSelect(data,type){
                let deg=0;

                if(type=='year'){

                }else if(type=='month'){

                }else if(type=='day'){
                   if(data.value==this.tmpDay){
                       return true
                   }else {
                       return false
                   }
                }
            },
            test(){
                this.tmpMonth-=1;
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import "pickerMobile.css";
</style>