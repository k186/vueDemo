<template>
  <transition name="fullScreen">
    <div v-show="PlayerComp.fullScreen" class="full-screen">
      <div class="full-screen-box">
        <transition name="fullMask">
          <div v-if="PlayerComp.fullScreen" class="full-screen-poster-blur-box">
            <transition-group name="blurChange" tag="div">
              <img :key="PlayerComp.currentPlay.uid" :style="background"
                   class="full-screen-poster-blur">
            </transition-group>
            <div class="blur-mask"></div>
          </div>
        </transition>
        <div class="full-screen-dish-stage">
          <transition name="bounceTop">
            <div v-if="PlayerComp.fullScreen" class="dish-artist-stage">
              <div class="dish-artist">&nbsp;&nbsp;{{PlayerComp.currentPlay.artist}}&nbsp;&nbsp;</div>
              <div class="dish-quality">
                <div class="dish-quality-btn"><span class="btn-text">标准</span><i class="icon">&#xe9a0;</i></div>
                <div class="dish-quality-btn"><span class="btn-text">MV</span></div>
                <div class="dish-quality-btn"><span class="btn-text">音效</span></div>
              </div>
            </div>
          </transition>
          <transition name="dish">
            <div v-show="PlayerComp.fullScreen" class="dish-body-stage" @touchstart.stop="touchStarFun($event)" id="poster">
              <transition-group name="blurChange">
                <div class="dish-box" :key="PlayerComp.currentPlay.uid">
                  <img :src="PlayerComp.currentPlay.poster!=''? MusicConfig.poster+PlayerComp.currentPlay.poster:MusicConfig.poster+'default.jpg'"
                       :class="PlayerComp.playStatus==1&&PlayerComp.fullScreen==true?'circleLoop':'circleLoopPause'"
                       class="dish-img">
                </div>
              </transition-group>
              <div v-if="PlayerComp.fullScreen" class="dish-stage-other">
                <div class="dish-lyric">歌词歌词歌词</div>
                <div class="dish-point">
                  <ul class="point-ul">
                    <li class="point-li "></li>
                    <li class="point-li active"></li>
                    <li class="point-li "></li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
          <transition name="bounceBottom">
            <div v-show="PlayerComp.fullScreen" class="dish-control">
              <div class="dish-process-bar-box">
                <div class="process-time">{{playedTime}}</div>
                <div class="process-bar">
                  <div class="process-bar-box"></div>
                  <div class="process-bar-buffered"
                       :style="bufferedProcess">
                  </div>
                  <div class="process-bar-played"
                       :style="playedProcess">

                  </div>
                  <div class="process-bar-current"
                       :style="point"
                       id="processBox"
                       @touchstart="processEvt($event)">
                  </div>
                </div>
                <div class="process-time">{{finalTime}}</div>
              </div>
              <div class="dish-control-box">
                <div class="dish-control-other">
                                    <span class="icon"
                                          @click.stop="toggleType({})"
                                          v-html="PlayerComp.playType==1?'&#xe60c;':''||PlayerComp.playType==2?'&#xe630;':''||PlayerComp.playType==3?'&#xe99e;':''">
                                    </span>
                </div>
                <div class="dish-control-main">
                        <span @click.stop="playerPrevious"
                              class="icon">&#xe631;</span>
                  <span class="icon play"
                        @click.stop="play"
                        v-if="PlayerComp.playStatus==0">&#xe675;</span>
                  <span class="icon play"
                        @click.stop="pause"
                        v-if="PlayerComp.playStatus==1">&#xe6ab;</span>
                  <span @click.stop="playerNext({})"
                        class="icon">&#xe9a1;</span>
                </div>
                <div class="dish-control-other">
                  <span class="icon">&#xe841;</span>
                </div>
              </div>
              <div class="dish-icon-other">
                    <span class="icon"
                          :class="isLikeFilter({uid:PlayerComp.currentPlay.uid})==true?'like':''"
                          @click="isLike({uid:PlayerComp.currentPlay.uid})"
                          v-html="isLikeFilter({uid:PlayerComp.currentPlay.uid})==true?'&#xe99f;':'&#xe613;'">
                    </span>
                <span class="icon">&#xe60e;</span>
                <span class="icon">&#xe6a1;</span>
                <span class="icon">&#xe658;</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default{
    name: 'fullScreen',
    data () {
      return {
        playedTime: '00:00',
        playedProcess: {width: 0},
        point: {left: 0},
        setPlay: false,
        finger: {}
      }
    },
    computed: {
      ...mapGetters({
        PlayerComp: 'PlayerComp',
        MusicConfig: 'MusicConfig'
      }),
      background () {
        let url = this.PlayerComp.currentPlay.poster !== '' ? this.MusicConfig.poster + this.PlayerComp.currentPlay.poster : this.MusicConfig.poster + 'default.jpg'
        return {backgroundImage: 'url(' + url + ')'}
      },
      finalTime () {
        let min = Math.floor(this.PlayerComp.currentPlay.duration / 60)
        min = min < 10 ? '0' + min : min
        let time = min + ':' + (this.PlayerComp.currentPlay.duration % 60 / 100).toFixed(2).slice(-2)
        return time
      },
      bufferedProcess () {
        let width = this.PlayerComp.currentPlay.buffered * 100
        return {width: width + '%'}
      }
    },
    methods: {
      ...mapActions({
        isLikeFilter: 'isLikeFilter',
        isLike: 'updateFilter',
        play: 'playerPlay',
        pause: 'playerPause',
        playerNext: 'playerNext',
        playerPrevious: 'playerPrevious',
        setProcess: 'setProcess',
        toggleType: 'playerTogglePlayType',
        toggleFullScreen: 'toggleFullScreen'
      }),
      processEvt (e) {
        if (this.PlayerComp.currentPlay.url) {
          let that = this
          let El = document.getElementById('processBox')
          El.addEventListener('touchmove', that.processTouchMove, false)
          El.addEventListener('touchend', that.processTouchEnd, false)
          let finger = e.changedTouches[0]
          that.finger.pageX = finger.pageX
        }
        e.preventDefault()
      },
      processTouchMove (e) {
        this.setPlay = true
        let that = this
        let finger = e.changedTouches[0]
        that.finger.pageX = finger.pageX
        let process = 0
        if (that.PlayerComp.currentPlay.duration > 0) {
          process = (finger.pageX / window.document.body.clientWidth)
        } else {
          process = 0
        }
        if (process > 1) {
          process = 1
        }
        if (process < 0) {
          process = 0
        }
        that.finger.process = process
        that.updateProcess(process)
        e.preventDefault()
      },
      processTouchEnd (e) {
        let that = this
        let El = document.getElementById('processBox')
        El.removeEventListener('touchmove', that.playerTouchMove, false)
        El.removeEventListener('touchend', that.playerTouchEnd, false)
        that.setProcess({
          process: that.finger.process,
          callback: function () {
            that.setPlay = false
          }
        })
        e.preventDefault()
      },
      updateProcess (process) {
        let Played = this.PlayerComp.currentPlay.duration * process
        let min = Math.floor(Played / 60)
        min = min < 10 ? '0' + min : min
        this.playedTime = min + ':' + (Played % 60 / 100).toFixed(2).slice(-2)
        let width = process * 100
        this.playedProcess = {
          width: width + '%'
        }
        if (width > 95) {
          this.point = {right: 0}
        } else {
          this.point = {left: width + '%'}
        }
      },
      touchStarFun (e) {
        let that = this
        let El = document.getElementById('poster')
        El.addEventListener('touchmove', that.posterMove, false)
        El.addEventListener('touchend', that.posterEnd, false)
        let finger = e.changedTouches[0]
        that.finger.pageY = finger.pageY
        that.finger.posterTime = Date.now()
        e.preventDefault()
      },
      posterMove (e) {
        let that = this
        let finger = e.changedTouches[0]
        that.finger.LastpageY = finger.pageY
        e.preventDefault()
      },
      posterEnd (e) {
        let that = this
        let El = document.getElementById('poster')
        El.removeEventListener('touchmove', that.posterMove, false)
        El.removeEventListener('touchend', that.posterEnd, false)
        let now = Date.now()
        if (that.finger.LastpageY - that.finger.pageY > 100 && now - that.finger.posterTime < 300) {
          that.toggleFullScreen()
        }
        e.preventDefault()
      }
    },
    watch: {
      'PlayerComp.currentPlay.process': function (val, oldVal) {
        if (!this.setPlay) {
          this.updateProcess(val)
        }
      }
    }
  }
</script>
