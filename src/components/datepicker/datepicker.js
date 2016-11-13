/**
 * Created by k186 on 2016/11/11.
 */
export default {
    name: 'kPicker',
    props: {
        valueStr: {
            type: String,
            default: '',
            required: true
        },
        language: {
            type: String,
            default: 'cn'
        },
        startDate: {
            type: String,
            default: '1970-01-01'
        },
        endDate: {
            type: String,
            default: '5000-01-01'
        },
        format:{
            type:String,
            default:'YY-MM-DD'
        }
    },
    data () {
        let now = new Date();
        return {
            panelType: 'day',
            monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
            weekList: [0,1,2,3,4,5,6],
            yearList: Array.from({length: 12}, (value, index)=>now.getFullYear() + index),
            tmpYear: now.getFullYear(),
            tmpMonth: now.getMonth(),
            tmpDay: now.getDate(),
            visible: false
        }
    },
    methods: {
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
            if(this.validYear(item)){
                this.tmpYear = item;
                this.changeType('month');
            }
        },
        selectMonth(item){
            if(this.validMonth(item)){
                this.tmpMonth = item;
                this.changeType('day');
            }
        },
        isSelected(type, item){
            switch (type) {
                case 'year':
                    if (item == this.tmpYear) {
                        return true
                    } else {
                        return false
                    }
                case 'month':
                {
                    if (this.orYear==this.tmpYear&&item === this.tmpMonth) {
                        return true
                    } else {
                        return false
                    }
                }
                case 'day':
                {
                    if (this.orDay == item.value && this.orMonth === this.tmpMonth && item.currentMonth) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        },
        selectDay(item){
            if(this.validDay(item)){
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
                if (!this.range) {
                    this.tmpDay = item.value;
                }
                this.visible = false;
                this.$emit('input', this.tmpYear + '-' + Number(this.tmpMonth + 1) + '-' + this.tmpDay)
            }
        },
        validYear(year){
            if (this.DateStartArr[0] <= year && year <= this.DateEndArr[0]) {
                return true
            } else {
                return false
            }
        },
        validMonth(month){
            let satrDate = new Date(this.DateStartArr[0], this.DateStartArr[1] - 1).getTime();
            let endDate = new Date(this.DateEndArr[0], this.DateEndArr[1] - 1).getTime();
            let tempDate = new Date(this.tmpYear, month).getTime();
            if (satrDate <= tempDate && tempDate <= endDate) {
                return true
            }
            else {
                return false
            }
        },
        validDay(day){
            let satrDate = new Date(this.DateStartArr[0], this.DateStartArr[1] - 1,this.DateStartArr[2]).getTime();
            let endDate = new Date(this.DateEndArr[0], this.DateEndArr[1] - 1,this.DateStartArr[2]).getTime();
            let tempDate = new Date(this.tmpYear, this.tmpMonth,day.value).getTime();
            if (satrDate <= tempDate && tempDate <= endDate) {
                return true
            }
            else {
                return false
            }
        },
        close(){
            //todo 定位问题 控释显示关闭问题
        }
    },
    computed: {
        DateStartArr (){
            return this.startDate.split('-');
        },
        DateEndArr(){
            return this.endDate.split('-');
        },
        orYear (){
            if (this.valueStr != '') {
                return this.tmpYear = Number(this.valueStr.split('-')[0])
            } else {
                return new Date().getFullYear();
            }
        },
        orMonth (){
            if (this.valueStr != '') {
                this.tmpDay = Number(this.valueStr.split('-')[2]);
                /*when month change the day is not ready so set day in month computed*/
                return this.tmpMonth = Number(this.valueStr.split('-')[1] - 1)
            } else {
                this.tmpDay = new Date().getDate();
                return new Date().getMonth();
            }
        },
        orDay (){
            if (this.valueStr != '') {
                return Number(this.valueStr.split('-')[2]);
            } else {
                return new Date().getDate();
            }

        },
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
    },
    watch: {
        valueStr(){
            this.visible = true
        }
    },
    filters:{
        weekF:(item,lang)=>{
            switch(lang){
                case 'cn':
                    return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item];
                case 'en':
                    return {0: 'Su', 1: 'Mo', 2: 'Tu', 3: 'We', 4: 'Th', 5: 'Fr', 6: 'Sa'}[item];
                default:
                    return item
            }
        },
        monthF:(month,lang)=>{
            switch(lang){
                case 'cn':
                 return {1: '一月', 2: '二月', 3: '三月', 4: '四月', 5: '五月', 6: '六月', 7: '七月',8:'八月',9:'九月',10:'十月',11:'十一月',12:'十二月'}[month];
                case 'en':
                    return {1: 'JAN', 2: 'FEB', 3: 'MAR', 4: 'APR', 5: 'MAY', 6: 'JUN', 7: 'JUL',8:'AUG',9:'SEP',10:'OCT',11:'NOV',12:'DEC'}[month];
                default:
                    return month
            }
        }
    },
    mounted(){
        window.addEventListener('click', this.close)
    },
    beforeDestroy(){
        window.removeEventListener('click', this.close)
    }
}
