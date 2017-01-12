<template>
  <div>
    <div class="dateBox">
      <div class="formGroup PickerGroup" style="position: absolute;left: 0; top: 0;display: inline-block">
        <input type="text" :value="date2" class="form-control" id="aaa" v-on:click.stop="showDatePicker(1)" readonly/>
      </div>
      <div class="formGroup PickerGroup">
        <input type="text" id="startDate" class="form-control" v-on:click.stop="showDatePicker(2)" :value="date" readonly/>
      </div>
    </div>
    <k-picker :inputId="picker.id" :valueStr="picker.value" :visible="picker.visible" v-on:selectDay="hideDatePicker" :options="picker.options"></k-picker>
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
                options: {
                    format: 'yyyy/M/dd HH:mm',
                    startDate: '2015-01-01',
                    endDate: '2018-01-01',
                    language: 'cn',
                    timeRange: 2
                },
                date2: '',
                options2: {
                    format: 'yyyy-M-dd',
                    startDate: '2016-01-01',
                    endDate: '2020-12-01',
                    language: 'en',
                    timeRange: 20,
                },
                picker: {
                    id: '',
                    value: '',
                    visible: false,
                    options: {
                        format: 'yyyy/M/dd HH:mm',
                        startDate: '2015-01-01',
                        endDate: '2018-01-01',
                        language: 'cn',
                        timeRange: 35
                    }
                }
            }
        },
        methods: {
            showDatePicker (type){
                this.picker.visible = true;
                if (type == 1) {
                    this.picker.options = this.options2;
                    this.picker.id = 'aaa';
                    this.picker.value = this.date2;
                } else {
                    this.picker.options = this.options;
                    this.picker.id = 'startDate';
                    this.picker.value = this.date;
                }
            },
            hideDatePicker(date){
                if (typeof date == 'string') {
                    if (this.picker.id == 'aaa') {
                        this.date2 = date;
                    } else {
                        this.date = date;
                    }
                }
                this.picker.visible = false;
            }
        },
        watch: {},
        //todo 封装接口 现在暴露接口太多
        components: {kPicker}
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "./static/datePickerPc.css";
</style>
