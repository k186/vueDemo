<template>
   <!-- <picker-mobile></picker-mobile>-->
    <div>
        <index-head></index-head>
        <nav-list></nav-list>
    </div>

</template>

<script>
 /* import pickerMobile from './view/pickerMobile/mobilePickerDemo'*/
  import indexHead from './components/indexHead/indexHead'
  import navList from './components/navList/nav'

  export default {
    name: 'app',
    data: function () {
      return {
      }
    },
    components: {
        indexHead,
        navList
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../static/style/coreCss/reset.scss";
</style>
