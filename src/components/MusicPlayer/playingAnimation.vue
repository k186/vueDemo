<template>
  <div class="wave-box" :class="isPlay?'':'wave-pause'">
    <div class="wave1"></div>
    <div class="wave2"></div>
    <div class="wave3"></div>
    <div class="wave4"></div>
  </div>
</template>
<script>
  export default{
    name: 'playingAnimation',
    props: {
      isPlay: {
        required: true
      }
    }
  }
</script>
