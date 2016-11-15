<template>
    <div class="dateBox">
        <div class="formGroup PickerGroup">
            <input type="text" class="form-control" v-on:click="showDatePicker" :value="date" readonly/>
            <k-picker :valueStr="dateStr" :startDate="startDate" :endDate="endDate" :visible="visible" language="cn"  v-model="callback"></k-picker>
        </div>
    </div>

</template>

<script>
import kPicker from './components/datepicker/Picker'
export default {
  name: 'app',
  data: function () {
    return {
      date: '',
      startDate:'1992-1-1',
      endDate:'2050-1-1',
      visible:false,
      dateStr:'',
      callback:{}
    }
  },
  methods:{
    showDatePicker (){
      this.visible=true;
      this.dateStr=this.date;
    }
  },
  watch:{
    callback(){
      var obj=JSON.parse(this.callback);
      if(obj){
        this.date= obj.date;
        this.visible=obj.visible;
      }
    }
  },
  //todo 封装接口 现在暴露接口太多
  components: {kPicker}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "./components/App.css";
</style>
