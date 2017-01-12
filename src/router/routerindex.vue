<template>
    <transition name="router-change">
        <router-view style="position: absolute;width: 100%;height: 100%"></router-view >
    </transition>
</template>
<style scoped>
    @import "../../static/style/coreCss/reset.scss";
    .router-change-enter-active, .router-change-leave-active {
        -webkit-transition: all .45s cubic-bezier(.44,.01,.37,1);
        transition: all .45s cubic-bezier(.44,.01,.37,1)
    }

    .router-change-enter {
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
    }

    .router-change-leave-active {
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }
</style>
<script>
    export default{
        name:'rouertpl',
        mounted(){
            /*this.$nextTick(function () {
                let myScroll = new scroll('#wrapper', {
                    click:true,
                    disableMouse: true,
                    disablePointer: true,
                    momentum:true
                });
                console.log(11111)
            })*/
        },
    }
</script>
