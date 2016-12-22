<template>
    <div class="label">
        <span class="label-text">{{label}}</span>
    </div>
</template>
<script>
    export default{
        name:'navLabel',
        props:{
            label:{
                type:String,
                required:true
            }
        }
    }
</script>
<style scoped>
@import "./label.css";
</style>