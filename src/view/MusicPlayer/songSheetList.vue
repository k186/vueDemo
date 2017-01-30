<template>
    <div>
        <div class="wrapper song-sheet-list-box-wrapper" id="song-SheetList-wrapper">
            <div class="song-sheet-list-box scroller" id="song-SheetList-scroller">
                <div class="song-sheet-list-head">
                    <div class="song-sheet-list-head-count">{{listData.count}}个歌单</div>
                    <div class="song-sheet-list-head-btn">
                        <div class="song-sheet-btns"><div class="icon song-sheet-list-head-btn-add">&#xe625;</div><div>添加</div></div>
                        <div class="song-sheet-btns"><div class="icon song-sheet-list-head-btn-manage">&#xe601;</div><div>管理</div></div>
                    </div>
                </div>
                <single-sheet :listData="listData"></single-sheet>
            </div>
        </div>
    </div>
</template>
<script>
    import singleSheet from '../../components/MusicPlayer/songSheetSingle'
    import publicJs from '../../publicJs/publicJs'
    export default{
        name:'songSheetList',
        data(){
          return{
              listData:{
                  count:32,
                  list:[
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      },
                      {
                          poster:'../../../static/imgs/poster/defalut.png',
                          title:'3242',
                          count:83,
                          download:32
                      }
                  ]
              }
          }
        },
        components:{
            singleSheet
        },
        mounted(){
            publicJs.initScroll('song-SheetList-wrapper','song-SheetList-scroller');
        }
    }
</script>