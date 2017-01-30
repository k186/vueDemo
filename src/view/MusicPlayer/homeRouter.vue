<template>
    <div>
        <transition name="router-change">
            <router-view class="Player-BG"></router-view>
        </transition>
        <player></player>
        <loading></loading>
    </div>
</template>
<script>

    import player from '../../components/MusicPlayer/payer'
    import loading from '../../components/loading/loading'
    export default{
        name: 'musicHome',
        components: {
            loading,
            player
        }
    }
</script>
<style scoped>
    @import "Player.css";
    .router-change-enter-active, .router-change-leave-active {
        -webkit-transition: all .45s cubic-bezier(.44,.01,.37,1);
        transition: all .45s cubic-bezier(.44,.01,.37,1);
        opacity: 1;
    }

    .router-change-enter {
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
    }

    .router-change-leave-active {
        -webkit-transform:scale(.8);
        transform: scale(.8);
        opacity: 0;
    }
</style>