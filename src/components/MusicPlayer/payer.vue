<template>
    <div class="player-box">
        <div class="player-box-bg">
            <transition-group class="player-box-currentPlay" tag="div" :name="swipeChange">
                <div class="player-box-poster" :key="PlayerComp.currentPlay.poster">
                    <img v-if="PlayerComp.currentPlay.poster!=''" :src="PlayerComp.currentPlay.poster" alt="海报" class="player-box-poster-img">
                    <img v-if="PlayerComp.currentPlay.poster==''" src="../../../static/imgs/poster/defalut.png" alt="海报" class="player-box-poster-img">
                </div>
                <div class="player-box-text" :key="PlayerComp.currentPlay.poster">
                    <div v-show="PlayerComp.currentPlay.title==''" class="player-box-text-title">QQ音乐</div>
                    <div v-show="PlayerComp.currentPlay.title!=''" class="player-box-text-title">{{PlayerComp.currentPlay.title}}</div>
                    <div class="player-box-text-lyric"></div>
                </div>
            </transition-group>
            <div class="player-box-btn">
                <i v-if="PlayerComp.playStatus==0" class="player-box-btn-play icon" @click="play">&#xe675;</i>
                <i v-if="PlayerComp.playStatus==1" class="player-box-btn-play icon" @click="pause">&#xe6ab;</i>
                <i class="player-box-btn-playList icon">&#xe841;</i>
            </div>
        </div>
        <audio id="audio" :src="PlayerComp.currentPlay.url"></audio>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    export default{
        name: 'player',
        data(){
            return {
                playOrder: [],
                currentIndex: 0,
                swipeChange:''
            }
        },
        computed: mapGetters({
            PlayerComp: 'PlayerComp'
        }),
        mounted(){
            this.PlayerComp.currentPlay.audio = document.getElementById('audio');
            let PlayerComp = null;
            this.$store.dispatch('playerInit', {PlayerComp});
            this.initPlayOrder();
        },
        methods: {
            play(){
                if (this.PlayerComp.currentPlay.url != '') {
                    this.PlayerComp.currentPlay.audio.currentTime = this.PlayerComp.currentPlay.currentTime;
                    this.PlayerComp.currentPlay.audio.play();
                    let PlayerComp = {
                        currentPlay: {
                            audio: this.PlayerComp.currentPlay.audio,
                            duration: this.PlayerComp.currentPlay.audio.duration,
                            currentTime: this.PlayerComp.currentPlay.currentTime,
                        }
                    };
                    this.$store.dispatch('playerPlay', {PlayerComp});
                    this.isPlayEnd('start');
                }
            },
            pause(){
                if (this.PlayerComp.currentPlay.url != '') {
                    this.PlayerComp.currentPlay.audio.pause();
                    let PlayerComp = {
                        currentPlay: {
                            audio: this.PlayerComp.currentPlay.audio,
                            duration: this.PlayerComp.currentPlay.audio.duration,
                            currentTime: this.PlayerComp.currentPlay.audio.currentTime,
                        }
                    };
                    this.$store.dispatch('playerPause', {PlayerComp});
                    this.isPlayEnd('pause');
                }
            },
            next(){
                this.currentIndex += 1;
                if (this.currentIndex > this.playOrder.length - 1) {
                    this.currentIndex = 0
                }
                this.swipeChange='right2left';
                this.getUid();
                //todo when load to play
            },
            previous(){
                this.currentIndex -= 1;
                if (this.currentIndex < 0) {
                    this.currentIndex = 0
                }
                this.swipeChange='left2right';
                this.getUid();
                //todo when load to play
            },
            getUid(){
                let uid = this.playOrder[this.currentIndex];
                this.$store.dispatch('playerNext', {uid})
            },
            initPlayOrder(){
                let uidArr = [];
                let DataArr = this.PlayerComp.playList.list;
                for (let i = 0; i < DataArr.length; i++) {
                    uidArr[i] = DataArr[i].song.uid;
                }
                /*set playOrder list*/
                if (this.PlayerComp.playType == 1) {
                    /*random*/
                    uidArr.sort(function () {
                        return 0.5 - Math.random()
                    });
                    this.playOrder = uidArr;
                } else if (this.PlayerComp.playType == 2 || this.PlayerComp.playType == 3) {
                    /*order*/
                    this.playOrder = uidArr;
                }
            },
            isPlayEnd(type){
                if (type == 'start') {
                    let that = this;
                    let loop = setInterval(function () {
                        let currentTime = that.PlayerComp.currentPlay.audio.currentTime;
                        let duration = that.PlayerComp.currentPlay.duration;
                        let PlayerComp = {
                            currentPlay: {
                                process: currentTime / duration
                            }
                        };
                        that.$store.dispatch('playerProcess', {PlayerComp});
                        /*auto end*/
                        if (currentTime == duration) {
                            that.isPlayEnd('pause');
                            that.pause();
                            let PlayerComp = {
                                currentPlay: {
                                    audio: that.PlayerComp.currentPlay.audio,
                                    duration: 0,
                                    currentTime: 0,
                                }
                            };
                            that.$store.dispatch('playerPause', {PlayerComp});
                            that.next();
                            clearInterval(loop);
                        }
                        /*press pause*/
                        if (that.PlayerComp.playStatus == 0) {
                            clearInterval(loop);
                        }
                    }, 1000)
                }
            }
        }
    }
</script>