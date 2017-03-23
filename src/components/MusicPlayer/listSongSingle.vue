<template>
  <div @click.stop="playerSet({option:{uid:Data.song.uid,from:from,sheetCode:sheetCode}})" class="list-song-single-box">
    <div v-if="PlayerComp.currentPlay.uid==Data.song.uid" class="play-bar">
    </div>
    <div class="list-song-single-box-content">
      <div class="list-song-single-box-text">
        <div class="list-song-single-box-text-title">
          <span class="text title">{{Data.song.title}}</span>
          <span v-if="Data.song.markTitle.quality==2" class="text icon sq">&#xe8a9;</span>
          <span v-if="Data.song.markTitle.quality==1" class="text icon hq">&#xe8ab;</span>
          <span v-if="Data.song.markTitle.mv" class="text icon mv">&#xe6af;</span>
          <span v-if="Data.song.markTitle.exclusive" class="text icon exclusive">&#xe6b0;</span>
        </div>
        <div class="list-song-single-box-text-artist">
          <i class="icon" :class="Data.mark.isDownload?'active':''">&#xe62a;</i>
          <i v-if="Data.mark.isInternet" class="icon">&#xe62f;</i>
          {{Data.song.artist}}
        </div>
      </div>
      <div class="list-song-single-box-btn"><i class="icon">&#xe60a;</i></div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default{
    name: 'listSongSingle',
    props: {
      Data: {
        type: Object,
        required: true
      },
      sheetCode: {
        required: true
      },
      from: {
        required: true
      }
    },
    computed: {
      ...mapGetters({
        PlayerComp: 'PlayerComp'
      })
    },
    methods: {
      ...mapActions({
        playerSet: 'playerSet'
      })
    }
  }
</script>
