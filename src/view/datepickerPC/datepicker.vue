<template>
    <div class="dateBox">
        <div class="formGroup PickerGroup">
            <input type="text" class="form-control" v-on:click="showDatePicker" :value="date" v-on:click.stop readonly/>
            <k-picker :valueStr="date" :visible="visible" v-on:selectDay="hideDatePicker" :options="options"></k-picker>
        </div>
    </div>

</template>

<script>
    import kPicker from '../../components/datepicker/Picker'
    export default {
        name: 'pickerView',
        data: function () {
            return {
                date: '2016-11-1 15:18',
                visible: false,
                options:{
                    format:'yyyy/M/dd HH:mm',
                    startDate:'2015-01-01',
                    endDate:'2018-01-01',
                    language:'cn',
                    timeRange:1
                }
            }
        },
        methods: {
            showDatePicker (){
                this.visible = true;

            },
            hideDatePicker(date){
                if(typeof date=='string'){
                    this.date=date;
                }
                this.visible = false;

            }
        },
        watch: {
        },
        //todo 封装接口 现在暴露接口太多
        components: {kPicker}
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import "./static/datePickerPc.css";
</style>
