/**
 * Created by k186 on 2016/11/11.
 */
export default {
    name: 'kPicker',
    props: {
        valueStr: {
            type: String,
            default: ''
        }
    },
    data () {
        let now = new Date();
        return {
            panelState: false, /*控制显隐*/
            panelType: 'day', /*控制选择面板*/
            date: '2016-11-11',
            monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekList: ['日', '一', '二', '三', '四', '五', '六'],
            yearList: Array.from({length: 12}, (value, index)=>now.getFullYear() + index),
            tmpYear: now.getFullYear(),
            tmpMonth: now.getMonth(),
            tmpDay:now.getDate(),
            maxDate: '1970-01-01',
            minDate: '3016-01-01',
            yearRangeStart: now.getFullYear(),
            yearRangeEnd: now.getFullYear() + 12,
            year: '',
            month: '',
            day: ''
        }
    },
    methods: {
        togglePanel(){
            this.panelState = !this.panelState;
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
            this.tmpYear=item;
            this.changeType('month')
            this.yearList=Array.from({length: 12}, (value, index)=>this.tmpYear + index)
        },
        selectMonth(item){
            this.tmpMonth=item;
            this.changeType('day');
        },
        selectDate(item){
            /*switch (type) {
                case 'year':
                    //todo 判断 year 大小
                    return this.tmpyear = item;
                case 'day':
                    return this.tmpDay = item.value;
                case 'month':
                    return this.tmpMonth = item-1;
            }*/
        },
        validDate(str){

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
        },
    }
}