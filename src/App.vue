<template>
	<picker></picker>
</template>

<script>
  import picker from './view/datepickerPC/datepicker'
  export default {
    name: 'app',
    data: function () {
      return {
        date: '',

      }
    },
    //todo 封装接口 现在暴露接口太多
    components: {picker}
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "view/datepickerPC/static/datePickerPc.css";
</style>
