# vuedemo

> A Vue.js project

###Demo [demo](http://k186studio.com/vueDemo/)

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
