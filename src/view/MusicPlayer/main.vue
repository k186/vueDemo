<template>
    <div>
        <user-nav></user-nav>
        <personal-radio></personal-radio>
        <song-sheet></song-sheet>
    </div>
</template>
<script>
    import userNav from '../../components/MusicPlayer/userNav'
    import personalRadio from '../../components/MusicPlayer/pseronalRadio'
    import songSheet from '../../components/MusicPlayer/songSheet'
    export default{
        name:'mainIndex',
        components:{
            userNav,
            personalRadio,
            songSheet
        }
    }
</script>