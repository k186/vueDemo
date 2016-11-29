<template>
    <div class="container">
        <mobile-picker></mobile-picker>
        <solt></solt>
    </div>
</template>
<script>
    import mobilePicker from '../../components/datepickerMobile/pickerMobile'
    export default{
        name:'mobilePickerDemo',
        data(){
            return{

            }
        },
        components:{
            mobilePicker
        }
    }
</script>
<style>

</style>