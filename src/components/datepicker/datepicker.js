/**
 * Created by k186 on 2016/11/11.
 */
export default {
    name: 'kPicker',
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
    data () {
        let now = new Date();
        return {
            panelType: 'day',
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            weekList: [0, 1, 2, 3, 4, 5, 6],
            yearList: Array.from({length: 12}, (value, index) => now.getFullYear() + index),
            hourList: Array.from({length: 24}, (value, index) => 0 + index),
            tmpYear: now.getFullYear(),
            tmpMonth: now.getMonth(),
            tmpDay: now.getDate(),
            tmpHour: now.getHours(),
            tmpMinute: now.getMinutes(),
            currentMinuteRange:0,
            minuteIndex: 0,
            animateMonth: 'off',
            animatePanel: 'off',
            animateTitle: 'toggle-title',
            changeTiltle: 'off',
            Format: {
                year: 'yyyy',
                month: 'M',
                day: 'd',
                isHour: false,
                hour: 'HH',
                minute: 'mm',
                separator: '-'
            }
        }
    },
    mounted(){
        this.setFormat(this.options.format)
    },
    methods: {
        changeType(type){
            this.animateMonth = 'off';
            this.panelType = type;
            if (type = 'year') {
                this.yearList = Array.from({length: 12}, (value, index) => this.tmpYear + index)
            }
        },
        changeDay(type){
            if (type == 'next') {
                this.animateMonth = 'next-Month';
                this.changeTiltle = 'next-Title';
                this.tmpDay += 1;
                if (this.tmpDay > new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()) {
                    this.tmpMonth += 1;
                    this.tmpDay = 1;
                    if (this.tmpMonth > 11) {
                        this.tmpMonth = 0;
                        this.tmpYear += 1;
                    }
                }
            } else if (type == 'previous') {
                this.animateMonth = 'previous-Month';
                this.changeTiltle = 'previous-Title';
                this.tmpDay -= 1;
                if (this.tmpDay == 0) {
                    this.tmpMonth -= 1;
                    this.tmpDay = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()
                    if (this.tmpMonth < 0) {
                        this.tmpMonth = 11;
                        this.tmpYear -= 1;
                    }
                }
            }
        },
        changeMonth(type){
            if (type === 'next') {
                this.animateMonth = 'next-Month';
                this.changeTiltle = 'next-Title';
                this.tmpMonth += 1;
                if (this.tmpMonth > 11) {
                    this.tmpMonth = 0;
                    this.tmpYear += 1;
                }
            } else if (type === 'previous') {
                this.animateMonth = 'previous-Month';
                this.changeTiltle = 'previous-Title';
                this.tmpMonth -= 1;
                if (this.tmpMonth < 0) {
                    this.tmpMonth = 11;
                    this.tmpYear -= 1;
                }
            }
        },
        changeYear(type){
            if (type === 'next') {
                this.tmpYear += 1;
                this.yearList = this.yearList.map((i) => i + 1);
                this.changeTiltle = 'next-Title';
                this.animateMonth = 'next-Month';

            } else if (type === 'previous') {
                this.tmpYear -= 1;
                this.yearList = this.yearList.map((i) => i - 1);
                this.changeTiltle = 'previous-Title';
                this.animateMonth = 'previous-Month';

            }
        },
        changeYearRange(type){
            if (type === 'next') {
                this.yearList = this.yearList.map((i) => i + 12);
                this.changeTiltle = 'next-Title';
                this.animateMonth = 'next-Month';
            } else if (type === 'previous') {
                this.yearList = this.yearList.map((i) => i - 12);
                this.changeTiltle = 'previous-Title';
                this.animateMonth = 'previous-Month';
            }
        },
        changeMinute(type){
            if (type == 'next') {
                this.animateMonth = 'next-Month';
                this.changeTiltle = 'next-Title';
                this.minuteIndex += 24;
                this.currentMinuteRange+=1;
                /*current minute of total range*/
                if ( this.currentMinuteRange>Math.ceil(this.allTimeList['rangeLength']/24)) {
                    this.currentMinuteRange=0;
                    this.minuteIndex = 0;
                    this.tmpHour += 1;
                    if (this.tmpHour > 23) {
                        this.tmpHour = 0;
                        this.tmpDay += 1;
                        if (this.tmpDay > new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()) {
                            this.tmpMonth += 1;
                            this.tmpDay = 1;
                            if (this.tmpMonth > 11) {
                                this.tmpMonth = 0;
                                this.tmpYear += 1;
                            }
                        }
                    }
                }
            } else if (type == 'previous') {
                this.animateMonth = 'previous-Month';
                this.changeTiltle = 'previous-Title';
                this.minuteIndex -= 24;
                this.currentMinuteRange-=1;
                if( this.currentMinuteRange==1){
                    this.minuteIndex=0;
                }
                if (this.currentMinuteRange<=0) {
                    this.currentMinuteRange=Math.ceil(this.allTimeList['rangeLength']/24)
                    this.minuteIndex = this.allTimeList['rangeLength'] - 24;
                    this.tmpHour -= 1;
                    if (this.tmpHour < 0) {
                        this.tmpHour = 23;
                        this.tmpDay -= 1;
                        if (this.tmpDay == 0) {
                            this.tmpMonth -= 1;
                            this.tmpDay = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()
                            if (this.tmpMonth < 0) {
                                this.tmpMonth = 11;
                                this.tmpYear -= 1;
                            }
                        }
                    }
                }


            }
        },
        selectYear(item){
            if (this.validYear(item)) {
                this.tmpYear = item;
                this.changeType('month');
            }
        },
        selectMonth(item){
            if (this.validMonth(item)) {
                this.tmpMonth = item;
                this.changeType('day');
            }
        },
        selectDay(item){
            if (this.validDay(item)) {
                /*choose currentMonthDay previous nex*/
                if (item.previousMonthDay) {
                    if (this.tmpMonth === 0) {
                        this.tmpYear -= 1;
                        this.tmpMonth = 11;
                    } else {
                        this.tmpMonth -= 1;
                    }
                } else if (item.nextMonthDay) {
                    if (this.tmpMonth == 11) {
                        this.tmpYear += 1;
                        this.tmpMonth = 0;
                    } else {
                        this.tmpMonth += 1;
                    }
                }
                this.tmpDay = item.value;
                if (this.Format.isHour) {
                    this.changeType('hour');
                } else {
                    this.$emit('selectDay', this.outPutDate());
                }
            }
        },
        selectHour(item){
            if (this.validHour(item)) {
                this.tmpHour = item;
                this.changeType('minute');
            }
        },
        selectMinute(item){
            if (this.validMinute(item)) {
                this.tmpMinute = item.M;
                this.$emit('selectDay', this.outPutDate());
            }
        },
        isSelected(type, item){
            switch (type) {
                case 'year':
                    if (this.validYear(item)) {
                        if (item == this.orYear) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }

                case 'month': {
                    if (this.validMonth(item)) {
                        if (this.orYear == this.tmpYear && item === this.orMonth) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }

                }
                case 'day': {
                    if (this.validDay(item)) {
                        if (this.orDay == item.value && this.orMonth === this.tmpMonth && item.currentMonth && this.orYear == this.tmpYear) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }

                }
                case 'hour': {
                    if (this.validHour(item)) {
                        if (this.orDay == this.tmpDay && this.orMonth === this.tmpMonth && this.orYear == this.tmpYear && item == this.orHour) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
                case 'minute': {
                    if (this.validMinute(item)) {
                        if (this.orDay == this.tmpDay && this.orMonth === this.tmpMonth && this.orYear == this.tmpYear && this.tmpHour == this.orHour && this.orMinute == item.M) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            }
        },
        /*valid date*/
        validYear(year){
            let obj1 = this.validDateFormat(this.startDate);
            let obj2 = this.validDateFormat(this.endDate);
            if (obj1.statues && obj2.statues) {
                if (Number(this.startDate.split(obj1.separator)[0]) <= year && year <= Number(this.endDate.split(obj2.separator)[0])) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        validMonth(month){
            let obj1 = this.validDateFormat(this.startDate);
            let obj2 = this.validDateFormat(this.endDate);
            if (obj1.statues && obj2.statues) {
                let satrDate = new Date(this.startDate.split(obj1.separator)[0], this.startDate.split(obj1.separator)[1] - 1).getTime();
                let endDate = new Date(this.endDate.split(obj2.separator)[0], this.endDate.split(obj2.separator)[1] - 1).getTime();
                let tempDate = new Date(this.tmpYear, month).getTime();
                if (satrDate <= tempDate && tempDate <= endDate) {
                    return true
                }
                else {
                    return false
                }
            } else {
                return false
            }

        },
        validDay(day){
            let obj1 = this.validDateFormat(this.startDate);
            let obj2 = this.validDateFormat(this.endDate);
            if (obj1.statues && obj2.statues) {
                let satrDate = new Date(this.startDate.split(obj1.separator)[0], this.startDate.split(obj1.separator)[1] - 1, this.startDate.split(obj1.separator)[2]).getTime();
                let endDate = new Date(this.endDate.split(obj2.separator)[0], this.endDate.split(obj2.separator)[1] - 1, this.endDate.split(obj2.separator)[2]).getTime();
                let tempDate = new Date(this.tmpYear, this.tmpMonth, day.value).getTime();
                if (satrDate <= tempDate && tempDate <= endDate) {
                    return true
                }
                else {
                    return false
                }
            } else {
                return false
            }
        },
        validHour(hour){
            let obj1 = this.validDateFormat(this.startDate);
            let obj2 = this.validDateFormat(this.endDate);
            if (obj1.statues && obj2.statues) {
                let satrDate = new Date(this.startDate.split(obj1.separator)[0], this.startDate.split(obj1.separator)[1] - 1, this.startDate.split(obj1.separator)[2], this.startDate.split(/\s/)[1] ? this.startDate.split(/\s/)[1].split(':')[0] ? this.startDate.split(/\s/)[1].split(':')[0] : 23 : 23).getTime();
                let endDate = new Date(this.endDate.split(obj1.separator)[0], this.endDate.split(obj1.separator)[1] - 1, this.endDate.split(obj1.separator)[2], this.endDate.split(/\s/)[1] ? this.endDate.split(/\s/)[1].split(':')[0] ? this.endDate.split(/\s/)[1].split(':')[0] : 23 : 23).getTime();
                let tempDate = new Date(this.tmpYear, this.tmpMonth, this.tmpDay, hour).getTime();
                if (satrDate <= tempDate && tempDate <= endDate) {
                    return true
                }
                else {
                    return false
                }
            } else {
                return false
            }
        },
        validMinute(minute){
            let obj1 = this.validDateFormat(this.startDate);
            let obj2 = this.validDateFormat(this.endDate);
            if (obj1.statues && obj2.statues) {
                let satrDate = new Date(this.startDate.split(obj1.separator)[0], this.startDate.split(obj1.separator)[1] - 1, this.startDate.split(obj1.separator)[2], this.startDate.split(/\s/)[1] ? this.startDate.split(/\s/)[1].split(':')[0] ? this.startDate.split(/\s/)[1].split(':')[0] : 23 : 23, this.startDate.split(/\s/)[1] ? this.startDate.split(/\s/)[1].split(':')[1] ? this.startDate.split(/\s/)[1].split(':')[1] : 59 : 59).getTime();
                let endDate = new Date(this.endDate.split(obj1.separator)[0], this.endDate.split(obj1.separator)[1] - 1, this.endDate.split(obj1.separator)[2], this.endDate.split(/\s/)[1] ? this.endDate.split(/\s/)[1].split(':')[0] ? this.endDate.split(/\s/)[1].split(':')[0] : 23 : 23, this.endDate.split(/\s/)[1] ? this.endDate.split(/\s/)[1].split(':')[1] ? this.endDate.split(/\s/)[1].split(':')[1] : 59 : 59).getTime();
                let tempDate = new Date(this.tmpYear, this.tmpMonth, this.tmpDay, this.tmpHour, minute.M).getTime();
                if (satrDate <= tempDate && tempDate <= endDate) {
                    return true
                }
                else {
                    return false
                }
            } else {
                return false
            }
        },
        hideDatePicker(){
            this.$emit('selectDay');
            this.tmpYear = this.orYear;
            this.tmpMonth = this.orMonth;
            this.tmpDay = this.orDay;
            this.panelType = 'day';
            this.yearList = Array.from({length: 12}, (value, index) => this.tmpYear + index)
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
        outPutDate(){
            if (this.Format.isHour) {
                return this.tmpYear + this.Format.separator + Number(this.tmpMonth + 1) + this.Format.separator + this.tmpDay + ' ' + this.tmpHour + ':' + this.tmpMinute;
            } else {
                return this.tmpYear + this.Format.separator + Number(this.tmpMonth + 1) + this.Format.separator + this.tmpDay;
            }
        },
        setOutPutDateFormat(type){
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
            let result = '';
            switch (type) {
                case 'd':
                    result = Number(this.tmpDay);
                    break;
                case 'dd':
                    result = Number(this.tmpDay) < 10 ? '0' + Number(this.tmpDay) : this.tmpDay;
                    break;
                case 'M':
                    result = Number(this.tmpMonth);
                    break;
                case 'MM':
                    result = Number(this.tmpMonth) < 10 ? '0' + Number(this.tmpMonth) : this.tmpMonth;
                    break;
                case 'yy':
                    break;
                case 'yyyy':
                    result = Number(this.tmpYear);
                    break;
                case 'h':
                    break;
                case 'hh':
                    break;
                case 'H':
                    result = Number(this.tmpHour);
                    break;
                case 'HH':
                    result = Number(this.tmpHour) < 10 ? '0' + Number(this.tmpHour) : this.tmpHour;
                    break;
                case 'm':
                    result = Number(this.tmpMinute);
                    break;
                case 'mm':
                    result = Number(this.tmpMinute) < 10 ? '0' + Number(this.tmpMinute) : this.tmpMinute;
                    break;
            }
        }
    },
    computed: {
        startDate(){
            return this.validDateFormat(this.options.startDate).statues ? this.options.startDate : '1970-01-01';
        },
        endDate(){
            return this.validDateFormat(this.options.endDate).statues ? this.options.endDate : '5000-01-01';
        },
        language(){
            return this.options.language ? this.options.language : 'cn';
        },
        allTimeList(){
            let total = 1440, range = this.options.timeRange ? this.options.timeRange : 15;
            let arr = {};
            for (let i = 0; i < Math.ceil(total / range) + 1; i++) {
                let minite = i * range;
                let tempH = 0, tempM = 0;
                if (!(tempH == 24 && tempM >= 0)) {
                    tempH = Number.parseInt(minite / 60);
                    tempM = minite - 60 * tempH;
                    arr[tempH] = arr[tempH] ? arr[tempH] : [];
                    arr[tempH].push({H: tempH, M: tempM})
                }
            }
            arr['rangeLength'] = arr[0].length;
            return arr
        },
        minuteList(){
            let arr = this.allTimeList;
            let hourIndex = this.tmpHour, minuteIndex = this.minuteIndex;
            /*minuteList length 12 and arr*/
            let showArr = [];
            for (let i = minuteIndex; i < 24 + minuteIndex; i++) {
                if (arr[hourIndex][i]) {
                    showArr.push(arr[hourIndex][i])
                } else {
                    break;
                }
            }
            return showArr;
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
        daylist () {
            /* get currentMonthLenght */
            let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate();
            /* get currentMonth day */
            let daylist = Array.from({length: currentMonthLength}, (value, index) => {
                return {
                    currentMonth: true,
                    value: index + 1
                }
            });
            /* get previous day */
            let currentMonthStartDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay();
            let previousMotnhLength = new Date(this.tmpYear, this.tmpMonth - 1, 0).getDate();
            for (let i = 0; i < currentMonthStartDay; i++) {
                daylist = [{previousMonthDay: true, value: previousMotnhLength - i}].concat(daylist)
            }
            /* get nex day */
            for (let i = daylist.length, day = 1; i < 42; i++, day++) {
                daylist[daylist.length] = {nextMonthDay: true, value: day}
            }
            return daylist
        }
    },
    filters: {
        weekF: (item, lang) => {
            switch (lang) {
                case 'cn':
                    return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item];
                case 'en':
                    return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item];
                default:
                    return item
            }
        },
        monthF: (month, lang) => {
            switch (lang) {
                case 'cn':
                    return {1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月', 7: '七月', 8: '八月', 9: '九月', 10: '十月', 11: '十一月', 12: '十二月'}[month];
                case 'en':
                    return {1: 'JAN', 2: 'FEB', 3: 'MAR', 4: 'APR', 5: 'MAY', 6: 'JUN', 7: 'JUL', 8: 'AUG', 9: 'SEP', 10: 'OCT', 11: 'NOV', 12: 'DEC'}[month];
                default:
                    return month
            }
        }
    },
    watch: {
        panelType: function (val, oldVal) {
            this.changeTiltle = 'off';
            if (val == 'day' && oldVal == 'hour') {
                this.animatePanel = 'next-panel'
            } else if (val == 'hour' && oldVal == 'minute') {
                this.animatePanel = 'next-panel'
            } else if (val == 'month' && oldVal == 'day') {
                this.animatePanel = 'next-panel'
            } else if (val == 'year' && oldVal == 'month') {
                this.animatePanel = 'next-panel'
            } else if (val == 'month' && oldVal == 'year') {
                this.animatePanel = 'previous-panel'
            } else if (val == 'day' && oldVal == 'month') {
                this.animatePanel = 'previous-panel';
            } else if (val == 'hour' && oldVal == 'day') {
                this.animatePanel = 'previous-panel';
            } else if (val == 'minute' && oldVal == 'hour') {
                this.animatePanel = 'previous-panel';
            }
        },
        visible: function (val, oldVal) {
            if (val == true) {
                setTimeout(() => document.addEventListener('click', this.hideDatePicker), 0)
            } else {
                document.removeEventListener('click', this.hideDatePicker)
            }
        }
    },
}
