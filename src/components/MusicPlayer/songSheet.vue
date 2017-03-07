<template>
  <div class="song-sheet-box" v-if="userData.basicInfo.SheetList.count!=0">
    <div class="song-sheet-box-header">
      <div class="song-sheet-box-header-title">我的歌单 <span>{{userData.basicInfo.SheetList.count}}</span></div>
      <router-link :to="'songSheet/'" class="song-sheet-box-header-btn icon">&#xe99c;</router-link>
    </div>
    <song-sheet-single :listData="userData.basicInfo.SheetList.list.slice(0,5)" from="sheet"></song-sheet-single>
    <router-link :to="'songSheet/'" class="song-sheet-box-seeAll">查看全部歌单>></router-link>
  </div>
</template>
<script>
  import songSheetSingle from './songSheetSingle'
  import {mapGetters} from 'vuex'
  export default{
    name: 'songSheet',
    computed: mapGetters({
      userData: 'userData'
    }),
    components: {
      songSheetSingle
    }
  }
</script>
