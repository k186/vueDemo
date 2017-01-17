# vueDemo 

> A Vue.js project,only use vue.js,vuex,vue-router,original js

###click here to see whole demo [k186](http://k186studio.com)

##components
>pc DatePicker

>mobile DatePicker like ios roller

>mobile alert WithCallback like ios

>mobile loading with loading waring success and custom text

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## DatePicker config
```bash
 <k-picker :inputId="picker.id" :valueStr="picker.value" :visible="picker.visible" v-on:selectDay="hideDatePicker" :options="picker.options"></k-picker>

 import kPicker from '../../components/datepicker/Picker'
    export default {
        name: 'pickerView',
        data: function () {
            return {
                date: '2016-11-1 15:18',
                visible: false,
                options: {
                    format: 'yyyy/M/dd HH:mm',
                    startDate: '2015-01-01',
                    endDate: '2018-01-01',
                    language: 'cn',
                    timeRange: 2
                },
                picker: {
                    id: '',                              //input or other dom id
                    value: '',                           //init date
                    visible: false,                      // show or hide
                    options: {  
                        format: 'yyyy/M/dd HH:mm',       //format
                        startDate: '2015-01-01',         //default'1970-01-01'
                        endDate: '2018-01-01',           //default '5000-01-01'
                        language: 'cn',                  //default 'cn'
                        timeRange: 35                    //default 15 minutes
                    }
                }
            }
        },
        methods: {
            showDatePicker (type){
                this.picker.visible = true;
                this.picker.options = this.options;
                this.picker.id = 'startDate';
                this.picker.value = this.date;
            },
            /*callback function */
            hideDatePicker(date){
                if (typeof date == 'string') {
                    this.date = date;
                }
                this.picker.visible = false;
            }
        },
        components: {kPicker}

```

#mobilePicker

![](http://o9w4menvt.bkt.clouddn.com/mobilePicker.gif)
 ```html
<template>
    <div class="container clearfloat">
        <div class="row">
           <div class="input" v-on:click="showDatePicker(1)">{{date}}</div>
        </div>
        <div class="row">
            <div class="input" v-on:click="showDatePicker(2)">{{date2}}</div>
        </div>
        <div class="row">
            <input class="input" v-model="format" placeholder="时间格式 yyyy/MM/dd">
        </div>
        <span>时间格式设置说明：
              <br>* d      without 0 &nbsp;&nbsp;&nbsp;  * yy     2016 16
              <br>* dd     with 01   &nbsp;&nbsp;&nbsp;  * yyyy   2016
              <br>* M      without 0 &nbsp;&nbsp;  * h      12am 12pm 1 2
              <br>* MM     with 03   &nbsp;&nbsp;  * hh     12am 12pm 01 02
              <br>* m      minute 1
              <br>* mm     minute 01   &nbsp;&nbsp;  * H  24h 1 2 3 &nbsp;&nbsp;   * HH     24 01 02
              <br>年月日分隔符只能 是 '/' 或者 '- ' 小时分钟 英文冒号':'
            <br> 时间12小时制暂未实现，年份取最后2位暂未实现
        </span>
        <mobile-picker :valueStr="picker.value" :visible="picker.visible" :options="picker.options" v-on:checked="hideDatePicker"></mobile-picker>
        <slot></slot>
    </div>
</template>
<script>
    import mobilePicker from '../../components/datepickerMobile/pickerMobile'
    export default{
        name:'mobilePickerDemo',
        data(){
            return{
                date:'2015-8-13',
                date2:'2016-10-11 20:15',
                format:'',
                options2:{
                    format: 'yyyy/M/dd HH:mm',
                    startDate: '1992-01-01',
                    endDate: '2500-01-01',
                    language: 'cn',
                    timeRange: 10
                },
                options1: {
                    format: 'yyyy/MM/dd',
                    startDate: '2000-01-01',
                    endDate: '3000-01-01',
                    language: 'en',
                    timeRange:25
                },
                picker: {
                    value: '',
                    visible: false,
                    id:'',
                    options: {
                        format: 'yyyy/MM/dd HH:mm',
                        startDate: '1992-01-01',
                        endDate: '2500-01-01',
                        language: 'cn',
                        timeRange: 10
                    }
                }
            }
        },
        methods:{
            showDatePicker(type){
                if(type==1){
                    this.picker.visible=true;
                    this.picker.value=this.date;
                    this.picker.options=this.options1;
                    this.picker.options.format=this.fomart;
                    this.picker.id=type
                }else if(type==2) {
                    this.picker.visible=true;
                    this.picker.id=type;
                    this.picker.value=this.date2;
                    this.picker.options=this.options2;
                }
            },
            hideDatePicker(date){
                if (typeof date == 'string') {
                    if(this.picker.id==1){
                        this.date=date
                    }else {
                        this.date2=date
                    }

                }
                this.picker.visible=false;
            }
        },
        components:{
            mobilePicker
        }
    }
</script>
```