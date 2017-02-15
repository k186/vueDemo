<template>
    <div>
        <div class="wrapper song-sheet-list-box-wrapper" id="song-SheetList-wrapper">
            <div class="song-sheet-list-box scroller" id="song-SheetList-scroller">
                <div class="song-sheet-list-head">
                    <div class="song-sheet-list-head-count">{{userData.basicInfo.SheetList.count}}个歌单</div>
                    <div class="song-sheet-list-head-btn">
                        <div class="song-sheet-btns"><div class="icon song-sheet-list-head-btn-add">&#xe625;</div><div>添加</div></div>
                        <div class="song-sheet-btns"><div class="icon song-sheet-list-head-btn-manage">&#xe601;</div><div>管理</div></div>
                    </div>
                </div>
                <single-sheet  :listData="userData.basicInfo.SheetList.list"></single-sheet>
            </div>
        </div>
    </div>
</template>
<script>
    import singleSheet from '../../components/MusicPlayer/songSheetSingle'
    import publicJs from '../../publicJs/publicJs'
    import {mapGetters} from 'vuex'
    export default{
        name:'songSheetList',
        data(){
          return{
              myScroll:null
          }
        },
        computed:mapGetters({
            userData:"userData"
        }),
        components:{
            singleSheet
        },
        mounted(){
            if(this.userData.basicInfo.SheetList.list.length!=0){
                let that=this;
                publicJs.initScroll({wrapper:'song-SheetList-wrapper',scroller:'song-SheetList-scroller',callbackFun:function (scroll) {
                    that.myScroll=scroll;
                }});
            }
        },
        beforeDestroy(){
            publicJs.destroy(this.myScroll);
        }
    }
</script>