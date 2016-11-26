<template>
    <div>
        <div style="height: 300px">
            <input type="text" :value="date2" id="aaa" v-on:click.stop="showDatePicker(1)"/>
        </div>
        <div class="dateBox">
            <div class="formGroup PickerGroup">
                <input type="text" id="startDate" class="form-control" v-on:click.stop="showDatePicker(2)" :value="date" readonly/>
            </div>
        </div>
        <k-picker :inputId="inputID" :valueStr="date3" :visible="visible" v-on:selectDay="hideDatePicker" :options="options"></k-picker>
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
                },
                date2: '2016-12-1 15:18',
                options2:{
                    format:'yyyy/M/dd HH:mm',
                    startDate:'2016-01-01',
                    endDate:'2018-01-01',
                    timeRange:1
                },
                date3:'',
                inputID:''
            }
        },
        methods: {
            showDatePicker (type){
               this.visible=true
                if(type==1){
                   this.options=this.options2
                    this.inputID='aaa';
                        this.date3=this.date2;
                }else {
                    this.inputID='startDate';
                    this.date3=this.date;
                }
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
