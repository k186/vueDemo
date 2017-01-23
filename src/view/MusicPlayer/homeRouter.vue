<template>
    <div style="background: #f4f4f4">
        <search-bar></search-bar>
        <router-view></router-view>
        <player></player>
        <loading></loading>
    </div>
</template>
<script>
    import searchBar from '../../components/MusicPlayer/searchBar'
    import player from '../../components/MusicPlayer/payer'
    import loading from '../../components/loading/loading'
    export default{
        name:'musicHome',
        components:{
            searchBar,
            loading,
            player
        }
    }
</script>
<style scoped>
    @import "Player.css";
</style>