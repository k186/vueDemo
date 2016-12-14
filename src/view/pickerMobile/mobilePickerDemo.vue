<template>
    <div class="container clearfloat">
        <div class="row">
           <div class="input" v-on:click="showDatePicker(1)">{{date}}</div>
        </div>
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
                picker: {
                    value: '',
                    visible: false,
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
                }
            },
            hideDatePicker(date){
                if (typeof date == 'string') {
                    this.date=date
                }
                this.picker.visible=false;
            }
        },
        components:{
            mobilePicker
        }
    }
</script>
<style scoped>

    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}
    .row{
        height: 1.2rem;
        line-height: 1.2rem;
    }
    .input{
        border:1px solid #eeeeee;
        height: inherit;
        line-height:inherit ;
        font-size: .48rem;
        color: #333333;
        text-align: right;
        padding:0 .2667rem;
    }
</style>