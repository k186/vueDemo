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
            type:Boolean,
            default:false,
            required:true
        },
        options:{
            type: Object,
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
            animateMonth:'off',
            animatePanel:'off',
            animateTitle:'toggle-title',
            changeTiltle:'off'
        }
    },
    methods: {
        changeType(type){
            this.animateMonth='off';
            this.panelType = type;
            this.yearList= Array.from({length: 12}, (value, index)=>this.tmpYear + index)
        },
        changeMonth(type){
            if (type === 'next') {
                this.animateMonth='next-Month';
                this.changeTiltle='next-Title';
                this.tmpMonth += 1;
                if (this.tmpMonth > 11) {
                    this.tmpMonth = 0;
                    this.tmpYear += 1;
                }
            } else if (type === 'previous') {
                this.animateMonth='previous-Month';
                this.changeTiltle='previous-Title';
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
                this.yearList = this.yearList.map((i)=>i + 1);
                this.changeTiltle='next-Title';
                this.animateMonth='next-Month';

            } else if (type === 'previous') {
                this.tmpYear -= 1;
                this.yearList = this.yearList.map((i)=>i - 1);
                this.changeTiltle='previous-Title';
                this.animateMonth='previous-Month';

            }
        },
        changeYearRange(type){
            if (type === 'next') {
                this.yearList = this.yearList.map((i)=>i + 12);
                this.changeTiltle='next-Title';
                this.animateMonth='next-Month';
            } else if (type === 'previous') {
                this.yearList = this.yearList.map((i)=>i - 12);
                this.changeTiltle='previous-Title';
                this.animateMonth='previous-Month';
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
                    if (this.orDay == item.value && this.orMonth === this.tmpMonth && item.currentMonth&&this.orYear==this.tmpYear) {
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
                this.$emit('selectDay', this.tmpYear + '-' + Number(this.tmpMonth + 1) + '-' + this.tmpDay)

            }
        },
        validYear(year){
            if (this.startDate.split('-')[0] <= year && year <= this.endDate.split('-')[0]) {
                return true
            } else {
                return false
            }
        },
        validMonth(month){
            let satrDate = new Date(this.startDate.split('-')[0],this.startDate.split('-')[1] - 1).getTime();
            let endDate = new Date(this.endDate.split('-')[0],this.endDate.split('-')[1]- 1).getTime();
            let tempDate = new Date(this.tmpYear, month).getTime();
            if (satrDate <= tempDate && tempDate <= endDate) {
                return true
            }
            else {
                return false
            }
        },
        validDay(day){
            let satrDate = new Date(this.startDate.split('-')[0], this.startDate.split('-')[1] - 1,this.startDate.split('-')[2]).getTime();
            let endDate = new Date(this.endDate.split('-')[0], this.endDate.split('-')[1] - 1,this.endDate.split('-')[2]).getTime();
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
        },
        hideDatePicker(){
            this.tmpYear=this.orYear;
            this.tmpMonth=this.orMonth;
            this.tmpDay=this.orDay;
            this.panelType='day';
            this.yearList=Array.from({length: 12}, (value, index)=>this.tmpYear + index)
            this.$emit('selectDay');
        }
    },
    computed: {
        format (){
            return this.options.format?this.options.format:'YYYY-MM-DD';
        },
        startDate(){
            return this.options.startDate?this.options.startDate:'1970-01-01';
        },
        endDate(){
            return this.options.endDate?this.options.endDate:'5000-01-01';
        },
        language(){
            return this.options.language?this.options.language:'cn';
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
    watch:{
        panelType:function(val,oldVal){
            this.changeTiltle='off';
            if(val=='day'&&oldVal=='day'){

            }else if (val=='month'&&oldVal=='day'){
                this.animatePanel='next-panel'
            }else if (val=='year'&&oldVal=='month'){
                this.animatePanel='next-panel'
            }else if (val=='month'&&oldVal=='year'){
                this.animatePanel='previous-panel'
            }else if (val=='day'&&oldVal=='month'){
                this.animatePanel='previous-panel';
            }
        },
        visible:function(val,oldVal){
            if(val==true){
                setTimeout(() => document.addEventListener('click', this.hideDatePicker), 0)
            }else {
                document.removeEventListener('click', this.hideDatePicker)
            }
        }
    },
}
