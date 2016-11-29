<template>
    <picker-mobile></picker-mobile>
</template>

<script>
  import pickerView from './view/datepickerPC/datepicker'
  import numberString from './view/number2words/numberword'
  import pickerMobile from './view/pickerMobile/mobilePickerDemo'

  export default {
    name: 'app',
    data: function () {
      return {
        date: '',

      }
    },
    //todo 封装接口 现在暴露接口太多
    components: {
        pickerView,
        numberString,
        pickerMobile

    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "view/datepickerPC/static/datePickerPc.css";
</style>
