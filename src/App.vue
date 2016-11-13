<template>
    <div class="dateBox">
        <div class="formGroup PickerGroup">
            <input type="text" class="form-control" v-on:click="showDatePicker" :value="date" readonly/>
            <k-picker :valueStr="dateStr" :startDate="startDate" :endDate="endDate" language="en"  v-model="date"></k-picker>
        </div>
      <span>{{JsonP}}</span>
    </div>

</template>

<script>
import kPicker from './components/datepicker/Picker'
export default {
  name: 'app',
  data: function () {
    return {
      date: '2016-10-15',
      startDate:'2015-5-2',
      endDate:'2017-2-1',
      JsonP:'',
      dateStr:'',
    }
  },
  methods:{
    showDatePicker (){
      this.dateStr=this.date;
    }
  },
  watch:{
  },
  components: {kPicker}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "./components/App.css";
</style>
