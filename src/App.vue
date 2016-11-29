<template>
	<picker-view></picker-view>
</template>

<script>
  import pickerView from './view/number2words/numberword'
  export default {
    name: 'app',
    data: function () {
      return {
        date: '',

      }
    },
    //todo 封装接口 现在暴露接口太多
    components: {pickerView}
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "view/datepickerPC/static/datePickerPc.css";
</style>
