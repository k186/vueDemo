<template>
    <div class="nav-box">
        <div class="nav-btn" v-for="nav in data">
            <i class="btn-icon"></i>
            <span class="btn-word">{{nav.name}}</span>
        </div>
    </div>
</template>
<script>
    export default{
        name:'navBox',
        props:{
            data:{
                type:Array,
                required:true
            }
        },
    }
</script>
<style scoped>
@import "./navbox.css";
</style>