<template>
    <div>
        <search-bar></search-bar>
        <div id="main-wrapper" class="main-box wrapper">
            <div id="main-scroller" class="scroller">
                <user-nav></user-nav>
                <personal-radio></personal-radio>
                <song-sheet></song-sheet>
                <div class="Scroll-Add-On"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import searchBar from '../../components/MusicPlayer/searchBar'
    import userNav from '../../components/MusicPlayer/userNav'
    import personalRadio from '../../components/MusicPlayer/pseronalRadio'
    import songSheet from '../../components/MusicPlayer/songSheet'
    import publicJs from '../../publicJs/publicJs'
    export default{
        name:'mainIndex',
        data(){
          return{
              myScroll:null,
          }
        },
        mounted(){
            let that=this;
            publicJs.initScroll({wrapper:'main-wrapper',scroller:'main-scroller',callbackFun:function (scroll) {
                that.myScroll=scroll;
            }});
        },
        beforeDestroy(){
          publicJs.destroy(this.myScroll)
        },
        components:{
            userNav,
            personalRadio,
            songSheet,
            searchBar
        }
    }
</script>