<template>
  <div class="personal-radio">
    <div class="radio-poster" @click="playPersonalRadio">
      <div class="poster-play icon">&#xe675;</div>
      <img :src="personalRadio.list.length!=0?MusicConfig.poster+personalRadio.list[0].song.poster:MusicConfig.poster+'default.jpg'" class="poster-img">
    </div>
    <div class="radio-text">
      <div class="text-title">{{personalRadio.title}}</div>
      <div class="text-described">{{personalRadio.described}}</div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: 'personalRadio',
    computed: mapGetters({
      personalRadio: 'personalRadio',
      MusicConfig: 'MusicConfig'
    }),
    mounted () {
      this.$store.dispatch('initRadio', {callback: null})
    },
    methods: {
      playPersonalRadio () {
        let option = {
          from: 'radio'
        }
        this.$store.dispatch('playerSet', {option})
      }
    }
  }
</script>
<style>

</style>
