<template>
    <div style="background: white">
        <search-bar>
            <search-history>
            </search-history>
        </search-bar>
        <main-nav></main-nav>
    </div>

</template>
<script>
    import mainNav from '../../components/MusicPlayer/homeMainNav'
    import searchBar from '../../components/MusicPlayer/searchBar'
    import searchHistory from '../../components/MusicPlayer/searchHistory'
    export default{
        name:'musicHome',
        components:{
            mainNav,
            searchBar,
            searchHistory
        }
    }
</script>
<style scoped>
    @import "Player.css";
</style>