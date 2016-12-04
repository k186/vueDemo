<template>
  <div class="mobile-picker">
    <div class="picker-control">
      <div class="control-cancel">取消</div>
      <div class="control-ok">确定</div>
    </div>
    <div class="picker-panel">
      <div class="panel-box">
        <div v-on:touchstart="touchStart" v-on:touchmove="touchMove" v-on:touchend="touchEnd" class="box-year">
          <div class="year-checked">
            <div class="year-list" v-bind:style="y">
              <div v-for="year in yearList">{{year}}</div>

            </div>
          </div>
          <div class="year-wheel" style=" transform: rotate3d(1, 0, 0,0deg);transition:all 1s ease-in-out">
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
                yearDeg: [80, 60, 40, 20, 0, -20, -40, -60, -80],
                monthDeg: [80, 60, 40, 20, 0, -20, -40, -60, -80],
                dayDeg: [80, 60, 40, 20, 0, -20, -40, -60, -80],
                y: {},
                ydis: 0,
                touchYear: {
                    startY: 0,
                    startTime: 0,
                    endY: 0,
                    endTime: 0,
                    distance: 0,
                    direction:'up'
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
                let a = [];
                for (let i = 0; i < 4; i++) {
                    a.push(this.tempYear + i)
                }
                for (let i = 1; i <=5; i++) {
                    a.unshift(this.tempYear - i)
                }
                return a
            }
        },
        mounted(){
        },
        methods: {
            wheelYear(index){
                if (index < 9) {
                    return {transform: 'rotate3d(1, 0, 0,' + this.yearDeg[index] + 'deg) translate3d(0px, 0px, 2.5rem)'}
                } else {
                    return {}
                }
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
            touchStart(e){
                if (e.touches[0]) {
                    e.preventDefault();
                    this.touchYear.startY = e.touches[0].pageY;
                    this.touchYear.startTime = e.timeStamp;
                    console.log( this.touchYear.startY)
                    //console.log(new Date().getTime())
                }
            },
            touchMove(e){
              /*if(e.distance>34){
               if(e.direction==8){
               this.ydis-=e.distance;
               this.ydis=Math.floor(this.ydis/34)*34;
               this.y={transform: 'translateY('+ this.ydis+ 'px)',transition:'all 1s ease-in-out'};
               }else {
               this.ydis+=e.distance;
               this.ydis=Math.floor(this.ydis/34)*34;
               this.y={transform: 'translateY('+ this.ydis+ 'px)',transition:'all 1s ease-in-out'}
               }
               //this.$el.getElementsByClassName('year-wheel')[0].style.transform='rotate3d(1, 0, 0, '+Math.floor(this.ydis/34)*34+'deg)';
               }*/
              /*
               * height single 70px 0.93333rem
               * deg single 20 deg
               *
               * */
                if (e.touches[0]) {
                    e.preventDefault();
                    this.touchYear.endY = e.touches[0].pageY;

                    this.touchYear.timeStamp = e.timeStamp;
                    this.touchYear.distance =this.touchYear.endY - this.touchYear.startY;
                    if(this.touchYear.distance<0){
                        this.touchYear.direction='up'
                    }else {
                        this.touchYear.direction='down'
                    }
                    console.log(this.touchYear.endY);
                    if (Math.abs(this.touchYear.distance) > (34/4)*3) {
                        this.ydis += this.touchYear.distance/50;
                        if(this.ydis<-34*8){
                            this.ydis=-34*8
                        }
                        if(this.ydis>0){
                            this.ydis=0
                        }
                        this.y = {transform: 'translateY(' + this.ydis + 'px)'};

                        //this.$el.getElementsByClassName('year-wheel')[0].style.transform='rotate3d(1, 0, 0, '+Math.floor(this.ydis/34)*34+'deg)';
                    }
                  /* scroll or  swipe*/
                }
            },
            touchEnd(e){
                e.preventDefault();
              /* scroll or  swipe*/
                //console.log(new Date().getTime());
                this.ydis = Math.floor(this.ydis / 34) * 34;
                this.y = {transform: 'translateY(' + this.ydis + 'px)', transition: 'all 1s ease-in-out'};
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "pickerMobile.css";
</style>