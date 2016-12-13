<template>
  <div class="mobile-picker" v-show="visible">
    <div class="picker-control">
      <div class="control-cancel">取消</div>
      <div class="control-date">
        <span>{{tmpYear}}</span>
        <span>-</span>
        <span>{{tmpMonth+1}}</span>
        <span>-</span>
        <span>{{tmpDay}}</span>
        <span>&nbsp;</span>
        <span>{{tmpHour}}</span>
        <span>:</span>
        <span>{{tmpMinute}}</span>
      </div>
      <div class="control-ok">确定</div>
    </div>
    <div class="picker-panel">
      <div class="panel-box">
        <div v-on:touchstart="myTouch($event,'year')" v-on:touchmove="myMove($event,'year')" v-on:touchend="myEnd($event,'year')" class="box-year">
          <div class="year-checked">
            <div class="year-list" data-translateY="0" style="transform: translateY(0rem);">

              <div class="list-div" v-for="year in renderListYear" v-bind:data-index="year.index">{{year.value}}</div>
            </div>
          </div>
          <div class="year-wheel" style="transform: rotate3d(1, 0, 0,0deg);">
            <div class="wheel-div" v-for="year in renderListYear" v-bind:data-index="year.index"
                 v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-year.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{year.value}}
            </div>
          </div>
        </div>
        <div class="box-month" v-on:touchstart="myTouch($event,'month')" v-on:touchmove="myMove($event,'month')" v-on:touchend="myEnd($event,'month')">
          <div class="month-checked">
            <div class="month-list" data-translateY="0" style="transform: translateY(0rem)">
              <div class="list-div" v-for="month in renderListMonth" v-bind:data-index="month.index">{{month.value}}</div>
            </div>
          </div>
          <div class="month-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="month in renderListMonth" v-bind:data-index="month.index"
                 v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-month.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{month.value}}
            </div>
          </div>
        </div>
        <div class="box-day" v-on:touchstart="myTouch($event,'day')" v-on:touchmove="myMove($event,'day')" v-on:touchend="myEnd($event,'day')">
          <div class="day-checked">
            <div class="day-list" data-translateY="0" style="transform: translateY(0rem)">
              <div class="list-div" v-for="day in renderListDay" v-bind:data-index="day.index">{{day.value}}</div>
            </div>
          </div>
          <div class="day-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="day in renderListDay" v-bind:data-index="day.index"
                 v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-day.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{day.value}}
            </div>
          </div>
        </div>
        <div style="display: none" class="box-hour">
          <div class="hour-checked">
            <div class="hour-list" data-translateY="0" style="transform: translateY(0rem)">
              <div class="list-div" v-for="hour in renderListHour" v-bind:data-index="hour.index">{{hour.value}}</div>
            </div>
          </div>
          <div class="hour-wheel" style=" transform: rotate3d(1, 0, 0,0deg)">
            <div class="wheel-div" v-for="hour in renderListHour" v-bind:data-index="hour.index"
                 v-bind:style="{transform: 'rotate3d(1, 0, 0, '+ (-hour.index)*20%360+'deg) translate3d(0px, 0px, 2.5rem)'}">{{hour.value}}
            </div>
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
                monthList: Array.from({length: 12}, (value, index) => 1 + index),
                hourList: Array.from({length: 24}, (value, index) => 0 + index),
                tmpYear: now.getFullYear(),
                tmpMonth: now.getMonth(),
                tmpDay: now.getDate(),
                tmpHour: now.getHours(),
                tmpMinute: now.getMinutes(),
                Range: {
                    year: {
                        max: 2050,
                        min: 1992
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
                },
                touchMonth: {
                    lastY: 0,
                    velocity: 0,
                    startTime: 0,
                    latsTime: 0,
                    lastMove: 0,
                },
                touchDay: {
                    lastY: 0,
                    velocity: 0,
                    startTime: 0,
                    latsTime: 0,
                    lastMove: 0,
                },
                touchHour: {
                    lastY: 0,
                    velocity: 0,
                    startTime: 0,
                    latsTime: 0,
                    lastMove: 0,
                },
                touchMinute: {
                    lastY: 0,
                    velocity: 0,
                    latsTime: 0,
                    lastMove: 0,
                },
              /*左右分支 个数*/
                branch: 9,
                Format: {
                    year: 'yyyy',
                    month: 'M',
                    day: 'd',
                    isHour: false,
                    hour: 'HH',
                    minute: 'mm',
                    separator: '-'
                },
            }
        },
        props: {
            valueStr: {
                type: String,
                default: ''
            },
            visible: {
                type: Boolean,
                default: false,
                required: true
            },
            options: {
                type: Object,
            }
        },
        computed: {
            yearList(){
                // [current,.......,max,min,.....current-1]
                let List = [];
                for (let k = 0; k <= this.Range.year.max - this.Range.year.min; k++) {
                    List.push(this.Range.year.min + k)
                }
                return List
            },
            renderListYear(){
                let list = [];
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
            },
          /*-------------*/
            startDate(){
                //todo use es6
                //update renderList in watch
                this.Range.year.min = this.validDateFormat(this.options.startDate).statues ? parseInt(this.options.startDate.split(this.validDateFormat(this.options.startDate).separator)[0]) : 1970;
                return this.validDateFormat(this.options.startDate).statues ? this.options.startDate : '1970-01-01';
            },
            endDate(){
                this.Range.year.max = this.validDateFormat(this.options.endDate).statues ? parseInt(this.options.endDate.split(this.validDateFormat(this.options.endDate).separator)[0]) : 5000;
                return this.validDateFormat(this.options.endDate).statues ? this.options.endDate : '5000-01-01';
            },
            language(){
                return this.options.language ? this.options.language : 'cn';
            },
            orYear (){
                let obj = this.validDateFormat(this.valueStr);
                if (this.valueStr != '' && obj.statues) {
                    return this.tmpYear = Number(this.valueStr.split(obj.separator)[0])
                } else {
                    return new Date().getFullYear();
                }
            },
            orMonth (){
                let obj = this.validDateFormat(this.valueStr);
                if (this.valueStr != '' && obj.statues) {
                    return this.tmpMonth = Number(this.valueStr.split(obj.separator)[1] - 1)
                } else {
                    return new Date().getMonth();
                }
            },
            orDay (){
                let obj = this.validDateFormat(this.valueStr);
                if (this.valueStr != '' && obj.statues) {
                    return this.tmpDay = this.valueStr.split(/\s/)[0] ? this.valueStr.split(/\s/)[0].split(obj.separator)[2] ? this.valueStr.split(/\s/)[0].split(obj.separator)[2] : this.valueStr.split(/\s/)[0].split(obj.separator)[2] : this.valueStr.split(obj.separator)[2];
                } else {
                    return new Date().getDate();
                }
            },
            orHour(){
                if (this.Format.isHour) {
                    if (this.valueStr != '') {
                        return this.tmpHour = Number(this.valueStr.split(/\s/)[1] ? this.valueStr.split(/\s/)[1].split(':')[0] : 23)
                    } else {
                        return new Date().getHours();
                    }
                }
            },
            orMinute(){
                if (this.Format.isHour) {
                    if (this.valueStr != '') {
                        return this.tmpHour = Number(this.valueStr.split(/\s/)[1] ? this.valueStr.split(/\s/)[1].split(':')[1] : 59)
                    } else {
                        return new Date().getHours();
                    }
                }
            },
        },
        mounted(){
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
                Box.lastTime = Box.startTime = startFinger.timeStamp || Date.now();
                Box.lastMove = 0;
              /*get speed*/
                Box.startPoint = startFinger.pageY;
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
                this.setCss(move, type, false);
                Box.lastY = Finger.pageY;
                Box.lastTime = now;
                Box.lastMove = move;
            },
            myEnd(evt, type){
                let wheel, List, Box;
                let roller = this.getType(type);
                wheel = roller.wheel;
                List = roller.List;
                Box = roller.Box;
                evt.preventDefault();
                let Finger = evt.changedTouches[0];
                let move = Finger.pageY - Box.lastY;
                let now = Finger.timeStamp || Date.now();
                this.setCss(move, type, true);
                Box.lastY = Finger.pageY;
                Box.lastTime = now;
                Box.lastMove = move;
                let delta = now - Box.startTime;
              /* is flicker*/
                //todo inertial
                let distance = Finger.pageY - Box.startPoint;
                let v = distance / delta;
                let time = 1000;
                let a = 2;//加速度
              /*小于300ms*/
                if (delta < 300) {
                    distance = v * delta * a;
                    time += delta * a;
                    this.setCss(distance, type, true, time);
                }
            },
            setCss(move, type, isEnd, time){
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
                    if (time) {
                        this.$el.getElementsByClassName(List)[0].style.transition = 'transform ' + time + 'ms cubic-bezier(0.19, 1, 0.22, 1)';
                        this.$el.getElementsByClassName(wheel)[0].style.transition = 'transform ' + time + 'ms cubic-bezier(0.19, 1, 0.22, 1)';
                    } else {
                        this.$el.getElementsByClassName(List)[0].style.transition = 'transform 1000ms cubic-bezier(0.19, 1, 0.22, 1)';
                        this.$el.getElementsByClassName(wheel)[0].style.transition = 'transform 1000ms cubic-bezier(0.19, 1, 0.22, 1)';
                    }
                    this.$el.getElementsByClassName(List)[0].setAttribute('data-translatey', remHeight);
                    this.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + offsetHeight + 'rem)';
                    this.$el.getElementsByClassName(List)[0].style.marginTop = -rem + 'rem';
                    this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';
                } else {
                    this.$el.getElementsByClassName(List)[0].style.transition = '';
                    this.$el.getElementsByClassName(wheel)[0].style.transition = '';
                    this.$el.getElementsByClassName(List)[0].setAttribute('data-translateY', remHeight);
                    this.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + offsetHeight + 'rem)';
                    this.$el.getElementsByClassName(List)[0].style.marginTop = -rem + 'rem';
                    this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';
                }
              /*get check data*/
                this.setCheckData(type, aim)
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
                let index = deg / 20;
                if (type == 'year') {
                    this.tmpYear = this.getData(index, type)
                } else if (type == 'month') {
                    this.tmpMonth = this.getData(index, type) - 1
                } else if (type == 'day') {
                    this.tmpDay = this.getData(index, type);
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
            setWheelCurrent(){
              /* this.$el.getElementsByClassName(List)[0].setAttribute('data-translateY', remHeight);
               this.$el.getElementsByClassName(List)[0].style.transform = 'translateY(' + offsetHeight + 'rem)';
               this.$el.getElementsByClassName(List)[0].style.marginTop = -rem + 'rem';
               this.$el.getElementsByClassName(wheel)[0].style.transform = 'rotate3d(1, 0, 0, ' + remDeg + 'deg)';*/
            },
            setFormat(format){
              /*
               * d      without 0
               * dd     with 01
               * M      without 0
               * MM     with 03
               * yy     2016 16
               * yyyy   2016
               * h      12am 12pm 1 2
               * hh     12am 12pm 01 02
               * H      24h 1 2 3
               * HH     24 01 02
               * m      minute 1
               * mm     minute 01
               * */
              /*let  format=this.options.format;*/
                let reg1 = /^[yyyy]{4}-?\/?[M,MM]{1,2}-?\/?[d,dd]{1,2}\s[h,hh,H,HH]{1,2}\:[m,mm]{1,2}$|^[yyyy]{4}-?\/?[M,MM]{1,2}-?\/?[d,dd]{1,2}$/;
                let reg2 = /^[yyyy]{4}-?\/?[M,MM]{1,2}-?\/?[d,dd]{1,2}\s[h,hh,H,HH]{1,2}\:[m,mm]{1,2}$/;
                let reg3 = /^[yyyy]{4}-?\/?[M,MM]{1,2}-?\/?[d,dd]{1,2}$/;
                //todo different format set different this.Format when you finished pick ,you should set out put date format base on this.Format value
                if (reg1.test(format)) {
                  /*get separator - or / */
                    if (format.split('\-').length === 3) {
                        this.Format.separator = '-'
                    } else if (format.split('\/').length === 3) {
                        this.Format.separator = '/'
                    } else {
                        throw new TypeError('format must be like yyyy-M-dd, do not set like yyyy/M-dd');
                    }
                    if (reg2.test(format)) {
                        let dateArr = format.split(/\s/);
                        let yearArr = dateArr[0].split(this.Format.separator), hourArr = dateArr[1].split(/\:/);
                        this.Format.isHour = true;
                        this.Format.year = yearArr[0];
                        this.Format.month = yearArr[1];
                        this.Format.day = yearArr[2];
                        this.Format.hour = hourArr[0];
                        this.Format.minute = hourArr[1];
                    } else if (reg3.test(format)) {
                        let dateArr = format.split(/\s/);
                        let yearArr = dateArr[0].split(this.Format.separator);
                        this.Format.isHour = false;
                        this.Format.year = yearArr[0];
                        this.Format.month = yearArr[1];
                        this.Format.day = yearArr[2];
                    }
                } else {
                    throw TypeError('format is wrong,try yyy-M-dd or find api advices')
                }

            },
            validDateFormat(DateStr){
                let reg4 = /^\d{4}-?\/?\d{1,2}-?\/?\d{1,2}\s\d{1,2}\:\d{1,2}$|^\d{4}-?\/?\d{1,2}-?\/?\d{1,2}$/;
                let obj = {
                    separator: '-',
                    statues: false
                };
                if (reg4.test(DateStr)) {

                    if (DateStr.split('\-').length === 3) {
                        obj.separator = '-'
                    } else if (DateStr.split('\/').length === 3) {
                        obj.separator = '/'
                    }
                    obj.statues = true;
                    return obj
                } else {
                    return obj
                }
            },
        },
        watch: {
            visible: function (val, old) {
                if (val) {
                  /*  this.$el.getElementsByClassName('year-list')[0].style.transform = 'translateY(' + ((-(this.tmpYear - this.Range.year.min) - this.branch) * 68 / 75 ) + 'rem)';
                    this.$el.getElementsByClassName('year-list')[0].style.marginTop = (this.tmpYear - this.Range.year.min) * 68 / 75 + 'rem';
                    this.$el.getElementsByClassName('year-list')[0].setAttribute('data-translatey', -(this.tmpYear - this.Range.year.min) * 68 / 75);
                    this.$el.getElementsByClassName('year-wheel')[0].style.transform = 'rotate3d(1, 0, 0, ' + (this.tmpYear - this.Range.year.min) * 20 + 'deg)';

                    this.$el.getElementsByClassName('month-list')[0].style.transform = 'translateY(' + (-this.tmpMonth * 68 / 75 - this.branch * 68 / 75) + 'rem)';
                    this.$el.getElementsByClassName('month-list')[0].style.marginTop = this.tmpMonth * 68 / 75 + 'rem';
                    this.$el.getElementsByClassName('month-list')[0].setAttribute('data-translatey', -this.tmpMonth * 68 / 75);
                    this.$el.getElementsByClassName('month-wheel')[0].style.transform = 'rotate3d(1, 0, 0, ' + this.tmpMonth * 20 + 'deg)';


                    this.$el.getElementsByClassName('day-list')[0].style.transform = 'translateY(' + (-(this.tmpDay - this.dayList[0]) * 68 / 75 - this.branch * 68 / 75) + 'rem)';
                    this.$el.getElementsByClassName('day-list')[0].style.marginTop = (this.tmpDay - this.dayList[0]) * 68 / 75 + 'rem';
                    this.$el.getElementsByClassName('day-list')[0].setAttribute('data-translatey', -(this.tmpDay - this.dayList[0]) * 68 / 75);
                    this.$el.getElementsByClassName('day-wheel')[0].style.transform = 'rotate3d(1, 0, 0, ' + (this.tmpDay - this.dayList[0]) * 20 + 'deg)';

                    this.$el.getElementsByClassName('hour-list')[0].style.transform = 'translateY(' + -this.branch * 68 / 75 + 'rem)';
                    this.$el.getElementsByClassName('hour-list')[0].style.marginTop = 0 + 'rem';

                    this.spin.year.head = this.tmpYear - this.Range.year.min - 9;
                    this.spin.year.last = this.tmpYear - this.Range.year.min + 9;

                    this.spin.month.head = this.tmpMonth - 9;
                    this.spin.month.last = this.tmpMonth + 9;
                    this.spin.day.head = (this.tmpDay - this.dayList[0]) - 9;
                    this.spin.day.last = (this.tmpDay - this.dayList[0]) + 9;*/

                }
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "pickerMobile.css";
</style>