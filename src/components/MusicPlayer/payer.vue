<template>
    <div class="player-box">
        <div class="player-box-bg">
            <transition-group class="player-box-currentPlay" tag="div" :name="swipeChange">
                <div class="player-box-currentPlay-box" :key="PlayerComp.currentPlay.poster" @touchstart="playerTouch($event)" id="playerTouch">
                    <div class="player-box-poster" >
                        <img :class="circleLoop" v-if="PlayerComp.currentPlay.poster!=''" :src="PlayerComp.currentPlay.poster" alt="海报" class="player-box-poster-img">
                        <img :class="circleLoop" v-if="PlayerComp.currentPlay.poster==''" src="../../../static/imgs/poster/defalut.png" alt="海报" class="player-box-poster-img">
                    </div>
                    <div class="player-box-text">
                        <div v-show="PlayerComp.currentPlay.title==''" class="player-box-text-title">QQ音乐</div>
                        <div v-show="PlayerComp.currentPlay.title!=''" class="player-box-text-title">{{bufferedPercent}}{{PlayerComp.currentPlay.title}}</div>
                        <div class="player-box-text-lyric"></div>
                    </div>
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
                swipeChange:'',
                bufferedPercent:0,
                touchData:{
                    startTimeStamp:0,
                    startPointX:0,
                    endPointX:0,
                    endTimeStamp:0
                },
                circleLoop:''
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
                    this.getBuffered();
                    this.circleLoop='circleLoop';
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
                    this.circleLoop='circleLoopPause';
                }
            },
            next(){
                /*is loop*/
                if(this.PlayerComp.playType!=3){
                    this.currentIndex += 1;
                    if (this.currentIndex > this.playOrder.length - 1) {
                        this.currentIndex = 0
                    }
                    this.swipeChange='right2left';
                    this.getUid();
                }
                this.$nextTick(function () {
                    this.play();
                });
            },
            previous(){
                this.currentIndex -= 1;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.playOrder.length - 1;
                }
                this.swipeChange='left2right';
                this.getUid();
                this.$nextTick(function () {
                    this.play();
                });
            },
            getUid(){
                let uid = this.playOrder[this.currentIndex];
                let PlayerComp = {
                    currentPlay: {
                        audio: this.PlayerComp.currentPlay.audio,
                        duration: 0,
                        currentTime: 0,
                    }
                };
                this.$store.dispatch('playerPlay', {PlayerComp});
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
                        let duration = that.PlayerComp.currentPlay.audio.duration;
                        //todo get buffer set download process
                        let PlayerComp = {
                            currentPlay: {
                                process: currentTime / duration,
                                duration:duration
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
            },
            /*滑动手势*/
            //todo  set custom directive todo
            playerTouch(e){
                let that=this;
                let El=document.getElementById('playerTouch');
                El.addEventListener('touchmove',that.playerTouchMove,false);
                El.addEventListener('touchend',that.playerTouchEnd,false);
                let finger=e.changedTouches[0];
                that.touchData.startPointX=finger.pageX;
                that.touchData.startTimeStamp=Date.now();
                e.preventDefault();
            },
            playerTouchMove(e){
                let that=this;
                let finger=e.changedTouches[0];
                that.touchData.endPointX=finger.pageX;
                that.touchData.endTimeStamp=Date.now();
                e.preventDefault();
            },
            playerTouchEnd(e){
                let that=this;
                let El=document.getElementById('playerTouch');
                let finger=e.changedTouches[0];
                that.touchData.endPointX=finger.pageX;
                that.touchData.endTimeStamp=Date.now();
                let time=that.touchData.endTimeStamp-that.touchData.startTimeStamp;
                let distance=that.touchData.endPointX-that.touchData.startPointX;
                let direction=true;/*true to right(next) false to left*/
                direction=distance>0;
                if(time<300){
                    if(Math.abs(distance)>=150){
                        if(direction){
                            that.$nextTick(function () {
                                that.pause();
                                that.previous();
                            })
                        }else {
                            that.$nextTick(function () {
                                that.pause();
                                that.next();
                            })
                        }
                    }
                }
                e.preventDefault();
                El.removeEventListener('touchemove',that.playerTouchMove);
                El.removeEventListener('touchend',that.playerTouchEnd);
            },
            getBuffered(){
                let that=this;
                let bufferedTime=0;
                let loop=setInterval(function () {
                    let buffered= that.PlayerComp.currentPlay.audio.buffered;
                    if(buffered.length!=0){
                        bufferedTime=buffered.end(buffered.length-1);
                        that.bufferedPercent=bufferedTime/that.PlayerComp.currentPlay.audio.duration;
                    }else {
                        that.bufferedPercent=0;
                    }
                    if(that.bufferedPercent==1){
                        clearInterval(loop);
                    }
                },1000)
            }
        }
    }
</script>