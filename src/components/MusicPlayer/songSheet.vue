<template>
    <div class="song-sheet-box">
        <div class="song-sheet-box-header">
            <div class="song-sheet-box-header-title" @click="inittest">我的歌单 <span>32</span></div>
            <router-link to="/Music/songSheet" class="song-sheet-box-header-btn icon">&#xe99c;</router-link>
        </div>
        <song-sheet-single :listData="listData"></song-sheet-single>
        <router-link to="/Music/songSheet" class="song-sheet-box-seeAll">查看全部歌单>></router-link>
    </div>
</template>
<script>
    import songSheetSingle from './songSheetSingle'
    export default{
        name:'songSheet',
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
                      }
                  ]
              }
          }
        },
        components:{
            songSheetSingle
        },
        methods:{
            inittest(){
                let option={
                    uid:8548,
                    sheetCode:1,
                    from:'sheet'
                };
                this.$store.dispatch('playerSet',{option});
            }
        }
    }
</script>