<template>
  <div class="mobile-picker">
    <div class="picker-control">
      <div class="control-cancel">取消</div>
        <div style="position: absolute;left: 2rem">{{Time.delay}}-{{Time.move}}</div>
      <div class="control-ok">确定</div>
    </div>
    <div class="picker-panel">
      <div class="panel-box">
        <div v-on:touchstart="myTouch($event,'year')" v-on:touchmove="myMove($event,'year')" v-on:touchend="myEnd($event,'year')" class="box-year">
          <div class="year-checked">
            <div class="year-list" style="transform: translateY(0rem)">
              <!--<div v-for="year in yearList">{{year}}</div>-->
                <div>1992</div>
                <div>1992</div>
                <div>1994</div>
                <div>1995</div>
                <div>1996</div>
                <div>1997</div>
                <div>1998</div>
                <div>1999</div>
                <div>2000</div>
                <div>2001</div>
                <div>2001</div>
                <div>2003</div>
                <div>2004</div>
                <div>2005</div>
                <div>2006</div>
                <div>2007</div>
                <div>2008</div>
                <div>2009</div>
                <div>2010</div>
                <div>2011</div>
                <div>2012</div>
                <div>2013</div>
                <div>2014</div>
                <div>2014</div>
                <div>2015</div>
                <div>2016</div>
                <div>2017</div>
                <div>2018</div>
                <div>2019</div>
                <div>2020</div>
                <div>2021</div>
                <div>2022</div>
                <div>2023</div>
                <div>2024</div>
                <div>2025</div>
                <div>2026</div>
                <div>2027</div>
                <div>2028</div>
                <div>2029</div>
                <div>2030</div>
                <div>2031</div>
                <div>2032</div>
                <div>2033</div>
                <div>2034</div>
                <div>2035</div>
                <div>2036</div>
                <div>2037</div>
                <div>2038</div>
                <div>2039</div>
                <div>2040</div>
                <div>2041</div>
                <div>2042</div>
                <div>2043</div>
                <div>2044</div>
                <div>2045</div>
                <div>2046</div>
                <div>2047</div>
                <div>2048</div>
                <div>2049</div>
                <div>2050</div>
                <div>2051</div>
                <div>2052</div>
                <div>2053</div>
                <div>2054</div>
                <div>2055</div>
                <div>2056</div>
                <div>2057</div>
                <div>2058</div>
                <div>2059</div>
                <div>2060</div>

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
                    velocity: 0,
                    startTime:0,
                    latsTime: 0,
                    lastMove:0,
                },
                wheel: {
                    u: 2,
                    mass: 1000,
                    inertia:false,
                    frameRate:60,
                },
                Time:{
                  delay:0,
                    move:0
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
              /*touchStart*/
              /*
              * startY
              * lastY
              * velocity
              * latsTime
              * */
              let startFinger = e.changedTouches[0];
              Box.startY=Box.lastY=startFinger.pageY;
              Box.velocity=0;
              Box.lastTime=Box.startTime=startFinger.timeStamp||Date.now();
              Box.lastMove=0;
              let vm=this;
              /*get speed*/
              //Box.velocity=vm.calculateVelocity(0,0,0);
              /*set css*/
              this.setCss(0,List,wheel, Box.velocity);
            },
            myMove(evt, type){
                evt.preventDefault();
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
                /*touchMove*/
                /*
                 * startY
                 * lastY
                 * velocity
                 * latsTime
                 * */

                let Finger = evt.changedTouches[0];
                let move=Finger.pageY-Box.lastY;
                let now=Finger.timeStamp||Date.now();
                let delta=now-Box.lastTime;
                let V=this.calculateVelocity(Box.velocity,move,delta);

                this.Time.delay=now-Box.lastTime;

                if(now-Box.lastTime<30){
                    this.wheel.inertia=true;
                    //this.inertia(V,now,move,List,wheel)
                }else {
                    this.wheel.inertia=false;
                }
                Box.velocity=V;
                Box.lastY=Finger.pageY;
                Box.lastTime=now;
                Box.lastMove=move;
                this.setCss(move, List, wheel,V);
                /*inertia*/
                this.Time.move=move;



               /* if(now-Box.startTime<300&&Math.abs(Box.lastY-Box.startY)>140){
                    this.wheel.inertia=true;
                    //this.inertia(V,now,move,List,wheel)
                }else {
                    this.wheel.inertia=false;
                }*/
                console.log(delta);
            },
            myEnd(evt, type){
                let wheel, List,Box;
                switch (type) {
                    case 'year':
                        wheel = 'year-wheel';
                        List = 'year-list';
                        Box=this.touchYear;
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
                let Finger=evt.changedTouches[0];
                Box.startY=Finger.pageY;
                let move=Finger.pageY-Box.lastY;
                let now=Finger.timeStamp||Date.now();
                let delta=now-Box.lastTime;
                let V=this.calculateVelocity(Box.velocity,move,delta);
                Box.velocity=V;
                Box.lastY=Box.startY;
                Box.lastTime=now;
                Box.lastMove=move;
                this.setCss(move, List, wheel,V);
                let vm=this;
                //vm.wheel.inertia=false;
                (function (v,startTime) {
                        let dir=v>0? -1:1;//速度方向
                        let acc=dir*vm.wheel.u/vm.wheel.mass;//摩擦系数~=加速度
                        let duration=Math.abs(v/acc);/*时间*/
                        let distance=((v+v*acc)/2 )*duration;/*距离*/
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
                                /*set css*/
                                let currentListRem = vm.$el.getElementsByClassName(List)[0].style.transform.replace(/[^0-9.-]/ig, "");
                                let currentWheelDeg = vm.$el.getElementsByClassName(wheel)[0].style.transform.split(',')[3].replace(/[^0-9.-]/ig, "");
                                /*update css*/
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

                })(V,now);

               /*set css*/
                //this.setCss(Box.totalMove, List, wheel,v);
                console.log('end');

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
                //this.$el.getElementsByClassName(List)[0].style.transition='';
                this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';
                //this.$el.getElementsByClassName(wheel)[0].style.transition='';

                return {remHeight:remHeight,remDeg:remDeg}
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
            calculateVelocity(startV,move,deltaTime){
                let velocity = startV + ((move / deltaTime) /this.wheel.touchRatio);
                velocity=!isNaN(velocity)?velocity:0;
                return velocity;
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "pickerMobile.css";
</style>