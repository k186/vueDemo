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
        language: {
            type: String,
            default: 'cn'
        },
        range: {
            type: Boolean,
            default: false
        },
        startDate: {
            type: String,
            default: '1970-01-01'
        },
        endDate: {
            type: String,
            default: '5000-01-01'
        }
    },
    data () {
        let now = new Date();
        return {
            panelState: false, /*控制显隐*/
            panelType: 'day', /*控制选择面板*/
            monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekList: ['日', '一', '二', '三', '四', '五', '六'],
            yearList: Array.from({length: 12}, (value, index)=>now.getFullYear() + index),
            tmpYear: now.getFullYear(),
            tmpMonth: now.getMonth(),
            tmpDay: now.getDate(),
            Year: now.getFullYear(),
            Month: now.getMonth(),
            Day: now.getDate()
        }
    },
    methods: {
        togglePanel(){
            this.panelState = !this.panelState;
            this.initFun();
        },
        initFun(){
            let dateArr = this.valueStr.split('-');
            this.tmpYear = dateArr[0];
            this.tmpMonth = dateArr[1] - 1;
            this.tmpDay = dateArr[2];
            this.Year = dateArr[0];
            this.Month = dateArr[1] - 1;
            this.Day = dateArr[2];
        },
        changeType(type){
            this.panelType = type;
        },
        changeMonth(type){
            if (type === 'next') {
                this.tmpMonth += 1;
                if (this.tmpMonth > 11) {
                    this.tmpMonth = 0;
                    this.tmpYear += 1;
                }
            } else if (type === 'previous') {
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

            } else if (type === 'previous') {
                this.tmpYear -= 1;

            }
        },
        changeYearRange(type){
            if (type === 'next') {
                this.yearList = this.yearList.map((i)=>i + 12)
            } else if (type === 'previous') {
                this.yearList = this.yearList.map((i)=>i - 12)
            }
        },
        selectYear(item){
            this.tmpYear = item;
            this.changeType('month');
        },
        selectMonth(item){
            this.tmpMonth = item;
            this.changeType('day');
        },
        isSelected(type, item){
            switch (type) {
                case 'year':
                    //todo 判断range
                    if (item == this.tmpYear) {
                        return true
                    } else {
                        return false
                    }
                case 'month':
                {
                    if (this.Year === this.tmpYear && item === this.tmpMonth) {
                        //todo think about to solve chose year and month mont not select bugs there may be should set range compare
                        return true
                    } else {
                        return false
                    }
                }
                case 'day':
                {
                    if (this.Day == item.value && this.Month === this.tmpMonth && item.currentMonth) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        },
        selectDay(item){
            /*choose currentMonthDay previous nex*/
            if (item.previousMonthDay) {
                if(this.tmpMonth===0){
                    this.tmpYear-=1;
                    this.Year=this.tmpYear;
                    this.tmpMonth=this.Month=11;
                }else{
                    this.tmpMonth-=1;
                    this.Month=this.tmpMonth;
                }
            }else if(item.nextMonthDay){
                if(this.tmpMonth==11){
                    this.tmpYear+=1;
                    this.Year= this.tmpYear;
                    this.tmpMonth=this.Month=0;
                }else {
                    this.tmpMonth+=1;
                    this.Month=this.tmpMonth;
                }
            }
            if(!this.range){
                this.Year=this.tmpYear;
                this.Month=this.tmpMonth;
                this.Day=item.value;
                alert(this.Year+'-'+Number(this.Month+1)+'-'+ this.Day)
            }

        },
        validYear(year){
            return true
        },
        validMonth(month){
            return true
        },
        validDay(day){
            return true
        }
    },
    computed: {
        daylist () {
            /* get currentMonthLenght */
            let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate();
            /* get currentMonth day */
            let daylist = Array.from({length: currentMonthLength}, (value, index) => {
                return {
                    currentMonth: true,
                    range: false, /*is range choose*/
                    value: index + 1
                }
            });
            /* get previous day */
            let currentMonthStartDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay();
            let previousMotnhLength = new Date(this.tmpYear, this.tmpMonth - 1, 0).getDate();
            for (let i = 0; i < currentMonthStartDay; i++) {
                daylist = [{previousMonthDay: true, range: false, value: previousMotnhLength - i}].concat(daylist)
            }
            /* get nex day */
            for (let i = daylist.length, day = 1; i < 42; i++, day++) {
                daylist[daylist.length] = {nextMonthDay: true, range: false, value: day}
            }
            return daylist
        },
    }
}
