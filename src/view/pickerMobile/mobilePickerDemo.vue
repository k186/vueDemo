<template>
    <div class="container clearfloat">
        <mobile-picker></mobile-picker>
        <slot></slot>
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
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    .clearfloat{zoom:1}
</style>