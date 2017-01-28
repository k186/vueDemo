<template>
    <div id="main-wrapper" class="main-box wrapper">
        <div id="main-scroller" class="scroller">
            <user-nav></user-nav>
            <personal-radio></personal-radio>
            <song-sheet></song-sheet>
            <div class="Scroll-Add-On"></div>
        </div>
    </div>
</template>
<script>
    import userNav from '../../components/MusicPlayer/userNav'
    import personalRadio from '../../components/MusicPlayer/pseronalRadio'
    import songSheet from '../../components/MusicPlayer/songSheet'
    import publicJs from '../../publicJs/publicJs'
    export default{
        name:'mainIndex',
        mounted(){
            publicJs.initScroll('main-wrapper','main-scroller');
        },
        components:{
            userNav,
            personalRadio,
            songSheet
        }
    }
</script>