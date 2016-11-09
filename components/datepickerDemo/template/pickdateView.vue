<template>
    <div>
        <div>{{msg}}</div>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
   /* import datepicker from './datepicker.vue'*/
    export default{
        name:'datePicker',
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
        }
    }
</script>
