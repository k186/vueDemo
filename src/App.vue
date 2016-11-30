<template>
    <picker-mobile></picker-mobile>
</template>

<script>
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
        pickerMobile
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
