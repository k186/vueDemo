<template>
  <div>
    <transition name="router-change">
      <router-view class="Player-BG"></router-view>
    </transition>
    <player></player>
    <loading></loading>
  </div>
</template>
<script>

  import player from '../../components/MusicPlayer/payer'
  import loading from '../../components/loading/loading'
  export default{
    name: 'musicHome',
    components: {
      loading,
      player
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" src="./Player.scss">

</style>
